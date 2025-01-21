---
version: 1.0.0
title: How we’re making it easier to work with open climate data
authors:
  - Raphael Hagen
  - Max Jones
  - Oriana Chegwidden
date: 12-15-2023
summary: The open source Python library Kerchunk can speed up climate research.
components:
  - name: Table
    src: '@carbonplan/components'
---

Several of our projects at CarbonPlan have relied on terabyte-scale public climate datasets. Working with data at this scale presents challenges related to data storage and computing resources. We believe that [Kerchunk](https://fsspec.github.io/kerchunk/) — an open source Python library in the [Pangeo](https://pangeo.io/) ecosystem — can address some of these challenges. It’s designed to make working with large archival datasets faster and easier by creating reusable reference files. We started using and contributing to this library and have found that creating and sharing Kerchunk references of public datasets in a data commons can help speed up open science workflows.

As a concrete example, we had success exploring the use of Kerchunk to speed up workflows in our [recent extreme heat analysis](https://carbonplan.org/research/extreme-heat-explainer). Below, we briefly summarize different approaches to working with large scientific data, explain why Kerchunk is an advance, and describe how we used it.

### Migrating to the cloud

Large climate datasets are often stored in physical data centers. Using them might require downloading data to a local university's server or downloading one small piece of data at a time to a laptop. Some systems even require you to wait while a robot arm retrieves and reads data from a tape archive. This approach requires spending lots of time transferring and processing, uses lots of storage space for duplicate data, and is hard to reproduce.

As an alternative, it’s possible to avoid ever downloading data by instead hosting both data and computing resources in the cloud. This approach, sometimes called “data-proximate” computing, reduces data transfer costs and makes it easy to scale workflows up and down. This approach works especially well when data are in an analysis-ready cloud-optimized (ARCO) format, such as [Zarr](https://zarr.readthedocs.io/en/stable/spec/v2.html), [GeoTIFF](https://www.ogc.org/standard/geotiff/), or [Parquet](https://parquet.apache.org/). With these formats, users can access small parts of the data or read multiple parts in parallel without loading the entire dataset, which can speed up processing.

### Why use Kerchunk

Analyzing data in the cloud works well when data are already in an ARCO format. But often that won’t be the case. Many datasets are in older, archival formats, which are not as amenable to cloud-based access. It might be necessary, however, to use such archival formats for compliance reasons, or it might be prohibitively costly to process and store an ARCO copy of a large archival dataset.

The key innovation of Kerchunk is to create a reusable reference file from an archival dataset so that it can be read as if it were an ARCO data format such as Zarr. When a software tool tries to read the data, the reference file essentially tells the tool what portion of the original file to access, without ever creating a copy of the data. When using Kerchunk, we can also combine many individual archival files to create a “virtual reference dataset.” For example, we might use Kerchunk to combine thousands of “daily” files into a single reference dataset containing 80+ years of climate data. These aggregations are both faster to work with and easy to open with modern tools.

Kerchunk thus offers the best of both worlds: stable, well-maintained and updated datasets stored in a conventional format and cloud-optimized access patterns. As an additional benefit, Kerchunk reference files are small in size and easy to share, better supporting open science and reproducibility.

### Real-world analysis using Kerchunk

As part of our recent work on [extreme heat](https://github.com/carbonplan/extreme-heat), we created a global dataset of wet bulb globe temperature (WBGT) for multiple climate models and emissions scenarios. To calculate WBGT, we used the NEX-GDDP-CMIP6 dataset, which is a spatially downscaled version of the CMIP6 archive. This dataset is nearly 33 terabytes in size and is composed of more than 7000 NetCDF files — roughly the same as the storage capacity as 33 MacBook Pros.

Instead of creating an ARCO copy of the NEX-GDDP-CMIP6 dataset, we created a virtual reference dataset using Kerchunk in an [open source pipeline](https://github.com/carbonplan/kerchunk-NEX-GDDP-CMIP6), which allowed us to speed up our WBGT calculations. We used [Dask](https://docs.dask.org/en/stable/) and the [Coiled platform](https://www.coiled.io/) to parallelize the [generation on NetCDF references](https://github.com/carbonplan/kerchunk-NEX-GDDP-CMIP6/blob/main/generation/parallel_reference_generation.ipynb) over 500 individual machines. With our distributed approach, it took about 30 minutes to create Kerchunk reference files for the entire dataset. The resulting references are only 290 megabytes in size. After creating them once, these references can be used by anyone to read the NEX-GDDP-CMIP6 dataset as if it were an ARCO dataset.

To validate the performance improvement, we compared workflows for calculating WBGT with and without Kerchunk.

<Figure>
  <Table
    columns={6}
    start={[[1], [1, 3, 3, 3], [4, 5, 5, 5]]}
    width={[
      [6, 2, 2, 2],
      [3, 2, 2, 2],
      [3, 2, 2, 2],
    ]}
    data={[
      ['Method', 'Archival dataset', 'Cloud-optimized reference dataset'],
      ['# of Input Datasets', '20', '20'],
      ['Temporal Extent', '365 days', '365 days'],
      ['# of Workers', '10', '10'],
      ['Worker Instance ', 'm7i.xlarge ', 'm7i.xlarge '],
      ['Time', '20 min 24 seconds', '2 min 49 seconds'],
    ]}
  />
</Figure>

As the table above shows, the ARCO/Kerchunk method took under three minutes, compared to the 20 minutes that would be required to download the data. And these times are based on processing just a small subset of the data — for the entire dataset, the use of Kerchunk can reduce processing time from weeks to days.

### Try it yourself!

We hope that the example above shows the utility of Kerchunk for large-scale analysis of Earth Science data. The Kerchunk reference we made can be freely used or redistributed, and the source NEX-GDDP-CMIP6 dataset used to create the reference is licensed under Creative Commons Zero license (CC0) and the underlying CMIP6 datasets are licensed under Creative Commons - Attribution 4.0 (CC4). More examples of using Kerchunk can be found on the [official docs](https://fsspec.github.io/kerchunk/) as well as the [Project Pythia cookbook](https://projectpythia.org/kerchunk-cookbook/README.html).

The Kerchunk project is under active development, so you might find some sharp edges and breaking changes. At the time of writing, Kerchunk supports NetCDF 3 and 4, GRIB2, TIFF/GeoTIFF and FITS; other archival formats are not yet supported. Additionally, if your use case requires a different chunking schema than the underlying file chunking, you will want to look to ETL tools such as [pangeo-forge-recipes](https://pangeo-forge.readthedocs.io/en/latest/) and [xarray-beam](https://xarray-beam.readthedocs.io/en/latest/).

## Thanks

Thanks to Martin Durant for building the Kerchunk library and Tom Nicholas for building Xarray-Datatree, both of which made this work possible. Thanks also to Jim Bednar, Martin Durant, and Andrew Huang for feedback on the workflows. This work was funded by NASA under award number 80NSSC21M0065.
