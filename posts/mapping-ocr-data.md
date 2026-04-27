---
version: 1.0.0
title: Designing web maps for our highest-resolution dataset yet
authors:
  - Shane Loeffler
  - Kata Martin
date: 04-27-2026
summary: We reached for open source tools and cloud-native formats to make climate risk data easily accessible on the web.
components:
  - name: OcrMap
    src: ./ocr-map.js
---

Our Open Climate Risk project [produced](/blog/producing-ocr-data) the highest-resolution dataset we’ve ever released in a [map tool](https://carbonplan.org/research/climate-risk). To make the map flexible and performant from the continent to building scale, we reached for a new stack of cloud-native formats and open source mapping tools.

<Figure>
  <OcrMap />
  <FigureCaption number={1}>
    Map showing all layers from the Open Climate Risk map including building
    polygons, overview building points, and raw data raster (toggle). Colors map
    to risk scores. See our
    [explainer](https://carbonplan.org/research/climate-risk-explainer) for more
    information on the underlying data.
  </FigureCaption>
</Figure>

## MapLibre

We used the `@carbonplan/maps` library to build most of our previous web tools, which often focused on coarser-scale, gridded data. That library was coupled with an old version of Mapbox GL JS, which is no longer actively maintained with open licensing. Open source and open science go hand in hand, so moving to an actively maintained, open source alternative like MapLibre made a lot of sense. It also has great support for emerging formats like PMTiles (more on that below), robust styling support, and the ability to render data in a globe projection view.

## PMTiles

Our first concern was to find a format for the building footprint data that would be easy to build with and cheap to maintain. This led us to [Protomaps](https://protomaps.com/), a relatively new ecosystem for creating, storing, and styling map tiles. A `.pmtiles` archive is a single file that can be uploaded to a cloud storage platform like S3, allowing simple integration with no server maintenance or third-party data subscriptions. Each file contains map tiles and some metadata, which can be fetched by client applications using `byte-range` requests.

In the final step of our [data processing pipeline](https://open-climate-risk.readthedocs.io/en/latest/how-to/data-pipeline.html), we generate PMTiles from our core [GeoParquet output](https://open-climate-risk.readthedocs.io/en/latest/reference/data-schema.html#vector-polygon-datasets). It was easy to extend this pattern to support additional features like a points-based view for low zoom levels and regional risk summaries across geographies like counties and census blocks. The Protomaps ecosystem also has great tooling to support the creation of themed basemap tilesets from OpenStreetMap data, which allowed us to create a customized, darkmode basemap with ease.

## zarr-layer

The raster dataset that underlies the building-level dataset for Open Climate Risk is the highest-resolution Zarr store we’ve ever visualized. We had been exploring an [updated way](https://carbonplan.org/blog/zarr-layer-maps) to render Zarr on web maps through `zarr-layer`, and Open Climate Risk was our first chance to use it in production. Using `zarr-layer` solved two key problems in this project, both stemming from its ability to reproject data on the fly. First, client-side reprojection freed us of the need to reproject our science outputs to Web Mercator for web visualization, which was proving expensive for our high-resolution dataset. Second, comparisons between our raster dataset and our vector building dataset require that the raster data maintain their original grid so that the exact pixel boundaries used to assign scores to buildings can be visualized. Handling arbitrary projections and resolutions in `zarr-layer` makes this possible.

## DuckDB

We also wanted to make it easy to download building-level data over specific regions of interest. Instead of subsetting and saving copies of the dataset for every county, census tract, and census block, [we compute these on-demand](https://github.com/carbonplan/ocr-web/pull/155). Using DuckDB-WASM in the browser, we directly query the [GeoParquet output](https://open-climate-risk.readthedocs.io/en/latest/reference/data-schema.html#vector-polygon-datasets) and package it up for download for the user. This means no server maintenance for these dynamic downloads, just GeoParquet files in an S3 bucket.

## Looking forward

This cloud-native open source stack covers all of our visualization needs, without running any custom servers. The flexibility and modularity of the tools mean that they can be used in future projects, both big and small. We’re grateful to be a part of this collaborative ecosystem and hope our experiences putting together the Open Climate Risk tool will help other projects adopt open tooling.

All of the code that powers the Open Climate Risk tool is available on [GitHub](https://github.com/carbonplan/ocr-web). If you have questions or suggestions about our usage of any of these tools, please [reach out](https://github.com/carbonplan/ocr-web/issues).
