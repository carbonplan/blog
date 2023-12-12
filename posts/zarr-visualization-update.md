---
version: 1.0.0
title: Making our open source mapping toolkit more flexible
authors:
  - Kata Martin
  - Max Jones
  - Anderson Banihirwe
date: 12-12-2023
summary: We’ve relaxed the data pre-processing requirements that limit the flexibility of our mapping toolkit. Here’s how we did it.
card: zarr-visualization-update
---

{

new Date() < new Date(Date.UTC(2023, 11, 15, 8)) ?

<p>
  <Secondary as='em'>
    We’ll be co-presenting with our Development Seed collaborators on <Link href='https://agu.confex.com/agu/fm23/meetingapp.cgi/Paper/1303670' sx={{color: 'secondary', '&:hover': {color: 'primary'}}}>Next Gen Zarr web map visualization at AGU on December 14th</Link> – come check it out if you’re attending the conference!
  </Secondary>
</p>
: null}

We often build web maps to make our research on climate impacts and solutions more accessible, and we’ve [developed a toolkit](https://carbonplan.org/blog/maps-library-release) specifically for making data-driven maps. While that toolkit has worked well for us, it has some limitations that have kept it from being broadly adopted. In particular, our toolkit requires data to be stored in a specific way, which can be burdensome if someone wants to store their data differently due to costs or other constraints. We’ve now taken steps to relax those requirements, with changes that should make our toolkit more flexible and cheaper to adopt.

Our mapping library is built around [Zarr](https://zarr.dev/), a cloud-optimized format for the kinds of gridded data common in the earth sciences. Historically, we have required that any Zarr data for map rendering conform to several requirements: the data must include layers of progressively lower-resolution copies, constituting a “pyramid” of data that spans the full globe; the chunk sizes must be small, meaning that the blocks of compressed data are ~1-2 MB; and the data must be projected into the Web Mercator map projection. These requirements contrast with current best practices for analysis-ready, cloud-optimized datasets, which typically use larger chunk sizes and more flexible coordinate reference systems. We wanted to see if it was possible to loosen these requirements and still have a high-quality web map experience.

First, we explored whether the next version of the Zarr specification (V3) and the [“sharding” extension](https://zarr.dev/zeps/accepted/ZEP0002.html) could allow the same dataset to be accessed via large outer chunks (or “shards”) for analysis and smaller inner chunks for visualization. We implemented support for reading Zarr V3 data in our [`@carbonplan/maps`](https://github.com/carbonplan/maps) library, via our [`zarr-js`](https://github.com/freeman-lab/zarr-js) JavaScript client library. We built a [web application](http://prototype-maps.demo.carbonplan.org/) to provide a unified interface for rendering data stored in different configurations and produced datasets conforming to the Zarr V2 and V3 specifications. We also developed a [Python library](https://github.com/carbonplan/benchmark-maps) for reproducible benchmarking of these approaches. We were glad to confirm similar performance for data stored using Zarr V3 (non-sharded) compared to Zarr V2, though this was expected because without sharding the two storage formats are generally similar. We found slightly slower performance (~14%) for sharded V3 data relative to non-sharded V3 data, but we believe that future performance improvements could close this gap.

Second, we implemented support for “on-the-fly” projection of data stored with latitude/longitude coordinates in the [`@carbonplan/maps`](https://github.com/carbonplan/maps) Javascript library. In our testing, we found slower performance (~30%) with this coordinate system relative to Web Mercator, particularly at higher zoom levels. This feature is a major step towards dynamically rendering analysis-ready datasets because many Earth science data products are stored in this coordinate system, so we expect many users will be willing to tolerate the performance difference. But the results are also a reminder that removing some pre-processing steps may come at the cost of visualization performance.

You can check out the [Zarr visualization report](https://nasa-impact.github.io/zarr-visualization-report/) for more details on our approach, benchmarking results, and recommendations. Our collaborators at Development Seed, an engineering and product company that specializes in Earth data, have built a tile server approach to Zarr visualization, in which a server dynamically generates visualization-ready Zarr data from a different data source. That differs in several ways to the “serverless” approach described above, and has both advantages and disadvantages. The Zarr Visualization Report provides more information on the tile server approach.

Alongside this progress, we’re excited about several directions for further improvement. On the front-end side, we hope to further loosen the pre-processing requirements to support non-global pyramids or eliminate the need for pyramids altogether. While this flexibility will be useful, our work also showed that reducing pre-processing requirements can make it slower to render maps. Our collaborators at Development Seed showed that providing pyramids is particularly important for high-performance web map rendering. Therefore, on the data pre-processing side, we are working to make the pyramid-generation requirement less onerous by generalizing and optimizing the [`ndpyramid`](https://github.com/carbonplan/ndpyramid) library and integrating `ndpyramid` with [Pangeo-Forge recipes](https://github.com/pangeo-forge/pangeo-forge-recipes). Finally, we’ve been engaging with the Zarr Implementation Council and Zarr refactor working group to support the finalization and implementation of the Zarr V3 spec in Python.

We’re always excited to hear from others interested in building accessible research products and visualization tools — if you’re working on these problems, please [reach out to us](mailto:hello@carbonplan.org).
