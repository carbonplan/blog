---
version: 1.0.0
title: Building open source downscaling pipelines for the cloud
authors:
  - Raphael Hagen
  - Anderson Banihirwe
  - Oriana Chegwidden
  - Joe Hamman
date: 09-02-2022
summary: We describe our experiences building cloud-based data analysis pipelines for climate model downscaling, including specific challenges we faced and lessons we learned.
components:
  - name: PipelineDiagram
    src: ./pipeline-diagram.js
  - name: ArrayDiagram
    src: ./array-diagram.js
---

We recently completed a [global climate model downscaling project](https://carbonplan.org/research/cmip6-downscaling-explainer), for which we processed hundreds of terabytes of climate data entirely using cloud infrastructure. We chose to use the cloud for [several reasons](https://doi.org/10.1029/2020AV000354): scalability, reproducibility, and the ability to access large volumes of data in cloud storage directly, rather than downloading to local machines.

Working in the cloud on a project at this scale also posed several challenges. In this post, we explain how we approached the problem, and then highlight what worked well and where we struggled. We hope the lessons learned might be useful to others working on related efforts.

## Design and motivation

We designed this project around an open-source [package](https://github.com/carbonplan/cmip6-downscaling) that allows users to run multiple downscaling algorithms composed of common utilities using shared infrastructure. We also started by ensuring that the primary datasets — observational training data and the CMIP6 data archive — were available in the [Analysis Ready Cloud Optimized (ARCO)](https://ieeexplore.ieee.org/abstract/document/9354557) [Zarr](https://zarr.dev/) format.

This approach has several benefits. First, it saves compute resources by separating the steps of downscaling that are common across multi-GCM ensembles (e.g. creating temporal summaries of a reference dataset) or across multiple downscaling methods (e.g. creating the same regridded intermediate product). Especially combined with caching (see below), this makes it possible for repeated analyses to share intermediate datasets, which saves on computation. Second, by using pipelines that run in cloud infrastructure and access public data, we ensure that our approach will be usable and reproducible by others. In particular, this implementation should serve as a reference to help lower the barrier for a broader community to do this kind of work in the cloud. Third, implementing multiple methods in a common pipeline framework with shared utilities makes it easier to understand how methods differ, in most cases just by directly reading the code. This supports knowledge transfer and future methods development whether by us or by others.

## High-level architecture

The specific analysis pipeline we implemented consisted of a workflow with shared data pre-processing tasks, downscaling algorithm-specific tasks, and optional data post-processing tasks such as creating multi-scale pyramids.

<Figure>
  <PipelineDiagram />
  <FigureCaption number={1}>
    A simplified diagram showing how a dataset flows through our analysis
    pipeline.
  </FigureCaption>
</Figure>

We used [Prefect](https://www.prefect.io/), a Python-based workflow management tool, to run these tasks. Prefect is Python native and decomposes orchestration pipelines into `Flows` and `Tasks`. Adapting existing Python functions into Prefect tasks only requires adding a [decorator](https://realpython.com/primer-on-python-decorators/). Using Prefect provided several useful features, including the ability to add notifications — logging, retries, caching, failure, etc. — to our pipelines, and [relatively smooth integration with Dask](https://docs-v1.prefect.io/core/advanced_tutorials/dask-cluster.html) for running our workflows at scale both in parallel and distributed settings.

In the sections that follow, we’ll delve deeper into some specific technological choices we made, their challenges, and the lessons we learned.

## Prefect orchestration and caching

In complex processing pipelines, which tend to occasionally fail, caching data between processing steps makes it possible to restart a task upon failure without restarting the pipeline from scratch.
While prefect has some [built-in caching](https://docs-v1.prefect.io/core/concepts/persistence.html#input-caching) support, it lacks (at version 0.15.13) caching of Xarray datasets. Because of this limitation, we explored alternative solutions, each of which had strengths and weaknesses.

### Caching via the xpersist package

We initially worked around Prefect's lack of caching support for Xarray objects by using [xpersist](https://xpersist.readthedocs.io/en/latest/how-to/use-xpersist-with-prefect.html), a Python package that extends prefect’s caching functionality with Zarr support, using code similar to the following example:

```python theme=sunrise
from xpersist import XpersistResult
from prefect import task
import xarray as xr

@task(
    target="bar.zarr",
    result=XpersistResult(
        store,
        serializer="xarray.zarr",
        serializer_dump_kwargs={"mode": "w"}
    ),
)
def compute_expensive_result(ds):
    return ds.groupby("time.month").mean()
```

In the above example, Prefect caches the results of the expensive operation the first time it runs. Any subsequent steps that use results from a cached task are retrieved from the cache instead of being recomputed. We were able to enable caching within our pipeline easily with xpersist. However, we ultimately abandoned this approach due to several limitations.
Most importantly, we had tasks that produced multiple outputs and Prefect caching only works for tasks that return a single output (see [this discussion](https://github.com/PrefectHQ/prefect/discussions/5201) for more details). In addition, there was no support for sharing cached objects across flows, and it was difficult to
turn caching on or off between tasks and to inspect cached objects.

### Caching via a custom solution

After experimenting with xpersist, we resolved our caching issues using a simple, custom approach. First, we hashed the relevant input arguments at the beginning of a cached task, and used this hash as our cached Zarr store key. Then, we checked for the existence of a consolidated metadata file in the Zarr store cache key. This consolidated metadata file (`.zmetadata`) served as a proxy for the integrity of the cached result. In the event that the consolidated metadata file existed, we assumed that the cache was valid and returned immediately. If not, we computed the rest of our task, cached the result, and returned the target path.

The pseudocode below shows how this custom caching mechanism worked:

```python theme=sunrise
@task
def compute_expensive_result(input_path):

    key = str_to_hash(input_path)
    target = f"WORKDIR/{key}"

    if zmetadata_exists(target):
        print(f"found existing target: {target}")
        return target

    ds = xr.open_zarr(input_path)

    data = ds.groupby("time.month").mean()
    data.to_zarr(
        target,
        mode="w",
        consolidated=True
    )
    return target
```

While this solution worked, it was ad-hoc, and it required adding boilerplate code to almost all of our tasks. More importantly, we realized that we couldn’t rely entirely on the consolidated metadata file in a Zarr store to guarantee the integrity of written data, which we’ll now discuss in more detail.

## Verifying the integrity of Zarr stores

Verifying the integrity of Zarr stores was a significant challenge. For context, Zarr stores are collections of chunks, and every chunk is written to a separate file. Chunks can be written or read in parallel, providing excellent integration with parallel or distributed frameworks such as Dask. The downside, however, is that it may not be obvious whether a chunk is missing from the store. In our processing pipeline, network issues occasionally resulted in write failures. This led to missing chunks in the Zarr store and subsequent problems in the pipeline.

As a method for confirming whether we were missing chunks, we first considered checking whether the `.zmetadata` file had been written. While this reliably indicates if the store exists, it does not guarantee that all chunks have been written. To add an additional layer of validation, we developed a mechanism to check for discrepancies between Zarr's initialized chunks and the chunks written to disk. The function for this validation is shown below.

```python theme=sunrise
def validate_zarr_store(target, raise_on_error=True):
    """Validate a Zarr store.
    Parameters
    ----------
    target : str
        Path to zarr store.
    raise_on_error : bool
        Flag to turn on/off raising when
        the store is not valid. If `False`,
        the function will return `True`
        when the store is valid (complete)
        and `False` when the store is not valid.
    Returns
    -------
    valid : bool
    """
    import zarr

    errors = []

    try:
        store = zarr.open_consolidated(target)
    except:
        errors.append("error opening Zarr store")

    if not errors:
        groups = list(store.groups())
        # if groups is empty (not a datatree)
        if not groups:
            groups = [("root", store["/"])]

        for key, group in groups:
            data_group = group

            variables = list(data_group.keys())
            for variable in variables:
                variable_array = data_group[variable]
                if variable_array.nchunks_initialized !=
                    variable_array.nchunks:
                    count = variable_array.nchunks -
                        variable_array.nchunks_initialized
                    errors.append(
                        f"{variable} has {count}
                        uninitialized chunks"
                    )

    if errors:
        if raise_on_error:
            raise ValueError(
                f"Found {len(errors)} errors: {errors}"
            )
        return False
    return True
```

By using this function, we were able to check whether a Zarr store had been written correctly. Additionally, we created the [xarray-schema](https://github.com/xarray-contrib/xarray-schema) Python package to verify if the Xarray object loaded from disk matched the expected schema.
These workarounds allowed us to feel more confident with each step, but are not a panacea for checking data integrity in Zarr. The following GitHub issues discuss Zarr data integrity checks: [Issue #912](https://github.com/zarr-developers/zarr-Python/issues/912), [Issue #587](https://github.com/zarr-developers/zarr-Python/issues/587), [Issue #392](https://github.com/zarr-developers/zarr-Python/issues/392).
At the time of writing, the [Zarr v3.0 spec](https://github.com/zarr-developers/zarr-specs/pull/149) is still in development. Perhaps methods for checking store integrity will be included in this release.

## Parallel Computing with Dask

Dask is a widely used Python framework for parallel computing. It integrates with Xarray and Prefect to support lazy operations across chunked, n-dimensional datasets. While Dask allowed us to scale out our computations across multiple machines, we ran into several challenges, each discussed in more detail below.

### Integration with non Python packages

Our downscaling pipeline required regridding certain datasets at different spatial resolutions. We turned to [xESMF](https://pangeo-xesmf.readthedocs.io/en/latest/), which is a Python wrapper for the Fortran-based [ESMF](https://earthsystemmodeling.org/docs/release/ESMF_5_2_0/ESMF_refdoc/node2.html). While this library worked for our purposes, we encountered issues when combined with Dask’s parallelism. Specifically, using xESMF in a multi-threaded setting resulted in an intermittent, opaque error:

```python theme=sunrise
ValueError: ESMC_GridCreateNoPeriDim() failed with rc = 545.
Please check the log files (named "*ESMF_LogFile").
```

We observed this behavior while using Dask’s threaded and distributed schedulers. Details of our struggle can be found in this [GitHub issue](https://github.com/pangeo-data/xESMF/issues/141). This is a difficult error to debug, as it appears to be caused by the underlying Fortran library, but only manifests in the xESMF Python wrapper. A full solution would likely require a deeper understanding of Fortran ESMF — a package containing nearly one million lines of code.
Unfortunately, dropping down to a single-threaded context was not possible with the data processing volumes in our pipeline. Eventually, we worked around the problem by combining caching and retries on failure. Hopefully in the future we will see this issue resolved, or perhaps find a Python regridding library that does not depend on ESMF.

### Getting chunking schemes right

A core concept in Dask is that a dataset can be loaded and processed in chunks when it does not fit into memory. Although chunking can help with memory management, it can also cause bottlenecks in computation depending on the chunking scheme. For example, in our pipeline some tasks required inputs to be chunked in space, while others required inputs to be chunked in time. The example below shows the same dataset chunked along either spatial dimensions or temporal dimensions.

<Figure>
  <ArrayDiagram chunking='space' />
  <FigureCaption number={2}>Dask array chunked in space</FigureCaption>
</Figure>

<Figure>
  <ArrayDiagram chunking='time' />
  <FigureCaption number={3}>Dask array chunked in time</FigureCaption>
</Figure>

In this example, chunking the dataset in space results in more than a million chunks, which can result in millions of tasks and substantial memory utilization due to the large task graph generated by Dask. To avoid such bottlenecks, we frequently had to “rechunk” our data either along the time or space axis. To avoid the expensive method of rechunking data on the fly, we used [rechunker](https://rechunker.readthedocs.io/en/latest/), a Python package that performs efficient on-disk rechunking of Zarr stores. It assesses the original chunking schema of a Zarr store, a target schema, and a defined memory constraint. The package then finds a computationally efficient intermediate chunking scheme that will allow the rechunking operation to complete within memory.
While highly effective, rechunker does produce many intermediate Zarr stores, which can grow in size on large jobs, and thus requires diligent clean up in order to avoid excessive cloud storage costs.

### Memory leaks and poor performance due to large task graphs

In spite of our best efforts to properly chunk our input datasets, and to use Dask clusters with enough workers and memory, some of our computations resulted in complex task graphs, memory leaks, poor performance, and occasionally failing Dask workers, all of which were difficult to diagnose. We tried to carefully tune the number of workers, chunk sizes, and memory limits to prevent these issues but we could only set these resource limits on the Prefect flow level, so we had to find settings that worked for all downscaling tasks. While we ultimately landed on a reasonable resource compromise, it took a lot of monitoring via the Dask dashboard and quite a bit of trial and error. We’re excited about the recent release of [flox](https://flox.readthedocs.io/en/latest/) and the increased adoption of [xarray-beam](https://github.com/google/xarray-beam), both of which may improve graph optimization when using Dask with Xarray.

## Final thoughts

While developing cloud-based downscaling pipelines we encountered many challenges, ranging from creating durable workflows to fixing issues in existing scientific Python packages. We hope this post helps others that might encounter similar issues, and also perhaps motivates further ecosystem improvements.

In the process of our work, we relied extensively on open-source software, and appreciated the chance to work with the developers of some of the tools we used. In turn, by making our pipeline available on GitHub and our data accessible in the cloud, we hope to improve access to downscaled datasets and the tools used to create them. The modular implementation of our pipelines, in particular, should make it possible for us and others to continue to iterate and evolve downscaling algorithms. We’re excited to see how others build on this work, so please reach out with any comments or questions.
