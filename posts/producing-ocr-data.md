---
version: 1.0.0
title: Designing a data pipeline for our highest-resolution dataset yet
authors:
  - Raphael Hagen
  - Anderson Banihirwe
date: 04-22-2026
summary: We reached for new tools to build a flexible and scalable data pipeline.
components:
  - name: Overview
    src: ./overview.js
  - name: Retry
    src: ./retry.js
---

For our [Open Climate Risk](https://carbonplan.org/research/climate-risk) project, we produced a high-resolution 30 meter raster dataset of wildfire risk across the contiguous United States.
We expected our science methodology to evolve in complexity throughout the project, and we needed a data processing pipeline that could scale with it. We wanted to be able to tweak model parameters, rerun the pipeline, and see these changes reflected in the web tool at the push of a button.
Working with data at this scale comes with challenges, so we reached for newer tools and took an unconventional approach to writing Zarr stores.

## Splitting up the problem

The first challenge was scaling. When processing large datasets with Xarray and Dask, it is easy to overwhelm the Dask scheduler by giving it too many tasks. This can be a common stumbling block in the ecosystem, and because we weren't sure how complicated our science pipeline would get, we wanted to avoid this issue from the start.

To address the scaling issue, we used a somewhat unconventional approach to writing our Zarr store. Instead of a single `big_dataset.to_zarr()` call, we split the dataset into individual spatial regions and inserted them region-by-region into an empty Zarr template. This approach isn’t new — in fact, it was used in the [Pangeo Forge project](https://pangeo-forge.org/) and is shown in this [Earthmover demo](https://icechunk.io/en/stable/guides/ingestion/glad-ingest). It adds a bit of complexity, but as you'll see, it opens the door to some powerful parallel scaling.

First, we strategically define spatial regions, where each region maps directly to a Zarr chunk boundary derived from the chunk structure of our source dataset. Second, we commit a template dataset before dispatching any workers. This template is the full pre-shaped array, but no real data is written, just the array metadata and shape. Xarray's `region='auto'` machinery does the heavy lifting of figuring out where in the template each region needs to be placed.

The result is that each region is its own independent unit of work. That way, each region can be processed by its own small virtual machine (VM) in the cloud, and since the jobs are independent, we can use cheap preemptible Spot Instances. If we run into resource limitations, it is easy to grab a larger VM.

<Figure>
  <Overview />
</Figure>

## Keeping track of the chunks

The second challenge was dealing with missing chunks. In previous work, like our [CMIP6 downscaling project](https://carbonplan.org/blog/cloud-downscaling-pipelines), we ran into missing chunks in our Zarr stores due to network issues and failed workers. Zarr itself provides no chunk manifest or completeness guarantee, so there is no built-in way to know which chunks actually finished writing. Since we are also using Spot Instances, which can be terminated at any time, we wanted to be extra careful.

We could have maintained an external database to track completed regions, but that felt like a lot of overhead. Instead we turned to [Icechunk](https://icechunk.io/en/stable/), an open source project that brings `git`-like transactions to Zarr, where data is committed just like `git` commits code, and a full history of every modification to the dataset is recorded.

We found that this commit history had exactly the properties we needed. Each worker, after successfully writing its region, commits to the Icechunk store with its region ID, thereby logging its own completion. The commit history becomes something like a chunk manifest that lives inside the dataset itself, with no external infrastructure required.

A neat side effect of each region's status being recorded in the Icechunk commit history was that we had access to idempotent writes, meaning we could re-run our pipeline and only regions that were missing would get reprocessed. Network issues or Spot Instances terminated mid-job? Just rerun and only the missing regions get processed. No duplicating data, overwriting, or manual bookkeeping required!

<Figure>
  <Retry />
</Figure>

## Optimistic concurrency

When multiple workers commit to the same data store simultaneously, conflicts are inevitable. Icechunk's commit history is linear, similar to `git` where each commit has exactly one parent. If a worker commits while a second one is still writing, the second worker's session becomes stale and Icechunk rejects it to preserve the linear history.

We handled this with the _*uncooperative distributed write*_ pattern described in [Icechunk's documentation](https://icechunk.io/en/stable/understanding/parallel/#uncooperative-distributed-writes). The special sauce is: `rebase_with=icechunk.ConflictDetector()`. This ensures that when a commit is rejected, Icechunk rebases rather than erroring. Since each region writes to a unique, non-overlapping spatial slice, there is never a real conflict and the commit goes through automatically.

```python theme="sunrise"
while True:
   try:
       subset_ds.to_zarr(session.store, region='auto', consolidated=False)
       session.commit(
           f'wrote region_id',
           rebase_with=icechunk.ConflictDetector()
       )
       break
```

## Reusing this pattern

This pipeline wasn't exactly simple and we don't think this approach is meant for every problem, but if you are working on complex data production pipelines in the Pangeo ecosystem, this pattern is a very nice way to ensure that your pipeline can scale and no chunks are lost along the way. If you are writing a simple dataset, maybe just stick with `to_zarr`.

All of our [code](https://github.com/carbonplan/ocr) for this project is open source. Feel free to adapt it or raise an issue if you have questions.
