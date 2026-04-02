---
version: 1.0.0
title: Flexible Zarr visualization for web maps
authors:
  - Shane Loeffler
  - Raphael Hagen
date: 04-02-2026
summary: We’ve made mapping Zarr on the web easier with the release of two new open source packages.
components:
  - name: Table
    src: '@carbonplan/components'
  - name: TopozarrDiagram
    src: ./topozarr-diagram.js
---

We build and distribute many of our climate datasets in cloud-native formats like [Zarr](https://zarr.dev/), which make scientific data easier to share and analyze. To visualize Zarr on the web, we previously built `@carbonplan/maps`. The library took advantage of the flexibility of the Zarr format, allowing us to create interactive web maps that combine variables, handle time and other non-spatial dimensions, and query numeric values on the fly.

`@carbonplan/maps` had a downside, however. Its efficiency is a result of formatting Zarr very specifically for web visualization by conforming to “[slippy map](https://en.wikipedia.org/wiki/Tiled_web_map)” tile conventions. To create a web tool for any new dataset we released using `@carbonplan/maps`, we also needed to create a separate visualization copy that matched these conventions. This meant duplicate storage, expensive rechunking operations, and distortions introduced by resampling to Web Mercator. These constraints became especially troublesome when working with datasets at higher spatial resolutions.

We built a new stack as a first step towards removing these constraints in service of the ultimate goal: visualizing scientific analysis outputs directly, without creating a visualization copy or running a server to do so on the fly.

## What we made

The new stack consists of two new open source packages. Below, we walk through the five features we think make this stack a major improvement compared to our previous workflows.

<Table
  columns={[4]}
  start={[[1], [1, 2, 2, 2]]}
  width={[[1], [4, 3, 3, 3]]}
  data={[
    [
      <Link href='https://github.com/carbonplan/zarr-layer'>
        <code style={{ fontSize: '1.1em' }}>zarr&#8209;layer</code>
      </Link>,
      'A Typescript library for fetching and rendering Zarr as a custom layer in MapLibre or Mapbox maps.',
    ],
    [
      <Link href='https://github.com/carbonplan/topozarr'>
        <code style={{ fontSize: '1.1em' }}>topozarr</code>
      </Link>,
      <span>
        A lightweight Python library for generating Zarr pyramids that conform
        to the Zarr{' '}
        <Link href='https://github.com/zarr-conventions/multiscales'>
          multiscales
        </Link>{' '}
        and{' '}
        <Link href='https://github.com/zarr-developers/geozarr-spec'>
          GeoZarr
        </Link>{' '}
        specifications.
      </span>,
    ],
  ]}
  index={false}
/>

### Feature 01 — Dynamic fetching based on chunk shape

Zarr is made of chunks, and chunks are a lot like map tiles. Chunks are individually requestable pieces of array data we can fetch or not fetch based on the current view of a map. `@carbonplan/maps` leverages this similarity by using a pyramid of chunks shaped precisely like any other map service — perfectly aligned to a Web Mercator grid with chunk keys corresponding to x and y coordinates. This guarantees performant and straightforward data chunk requests, but creates a strict formatting requirement, which does not have clear applications outside of visualization and therefore results in data duplication.

Instead of relying on a particular chunking scheme, `zarr-layer` determines which chunks intersect the map viewport, given a dataset of _any_ resolution or projection. The library then fetches, decodes, and composites the visible chunks, reprojecting on the GPU if needed based on the native or rendered projections. This means that many Zarr datasets can be visualized as they are (though performance will vary with chunk sizing decisions).

### Feature 02 — Reprojection

Borrowing from recent developments in client-side reprojection developed by Kyle Barron in [`deck.gl-raster`](https://developmentseed.org/deck.gl-raster/), `zarr-layer` can efficiently reproject data on the fly using a [mesh-based GPU approach](https://developmentseed.org/deck.gl-raster/api/raster-reproject/). We’ve tested this reprojection across a variety of source projections ranging from UTM to polar, and found that it works well for interactive use.

Contrasting with the regridding requirement of visualization data created for use with `@carbonplan/maps`, this approach also preserves more accuracy since native pixel resolution and boundaries are preserved and then warped client-side. This is essential when comparing with other datasets at pixel scale. For example, our recent [Open Climate Risk](https://carbonplan.org/research/climate-risk) project samples wildfire risk for individual building polygons from a 30 m resolution raster product. Preserving the native resolution and pixel shapes in our visualization is essential in this case and would not be possible in the previous paradigm of resampling to a Web Mercator grid at specific tile-defined resolutions.

### Feature 03 — Support for simple multiscale overviews

While it’s exciting that `zarr-layer` can readily visualize a broad range of data that hasn’t been optimized for the web, multiscales are still a key part of making higher resolution data performant. By coupling chunk-based loading with the [emerging multiscales specification](https://github.com/zarr-conventions/multiscales), we have achieved performance that is qualitatively comparable to what we’ve seen using the stricter, tile-conforming pyramids described above. This means that relatively simple additions of coarsened multiscales and a bit of metadata can greatly improve the visualization performance for Zarr stores of any resolution.

Relative to the regridding and resampling required to adhere to slippy map conventions, the creation of multiscales is significantly less compute intensive. We created `topozarr` to streamline the creation of coarsened multiscale levels, adherence to recommended chunk and shard sizing, and inclusion of metadata to match the GeoZarr specification.

<Figure>
  <TopozarrDiagram />
</Figure>

### Feature 04 — Framework and map library flexibility

`@carbonplan/maps` relied on React to drive its interactivity and came bundled with Mapbox for basemap functionality. `zarr-layer` drops these requirements. Its simplified API works with any frontend framework (or none!) and it integrates with both MapLibre and Mapbox maps as a native custom layer.

### Feature 05 — Compatibility with virtual stores

With tools like [VirtualiZarr](https://virtualizarr.readthedocs.io/en/stable/) and [Icechunk](https://icechunk.io/en/stable/), what counts as a Zarr dataset is rapidly expanding. As a result, the footprint of datasets compatible with `zarr-layer` is also growing. We’ve tested a small sliver of what might be possible here. To start, [we’ve successfully rendered](https://zarr-layer.demo.carbonplan.org/?dataset=icechunk_prec) NetCDF with multiscale overviews stored in a single Icechunk store using [`icechunk-js`](https://github.com/EarthyScience/icechunk-js).

We expect some codec issues as we test virtual stores that are further afield, but we’re getting close to a world where our legacy input datasets, our novel science analysis outputs, and bespoke visualizations can all rely on the same visualization stack.

## Try it!

We’re excited about the possibility of truly harmonizing analysis and visualization data. To get there, we’ll need to hone recommendations for how to best write Zarr — juggling tradeoffs between shard size, chunk size, and handling non-spatial dimensions. We’re also excited about the possibilities this opens up for visualizing virtualized stores of wider variety. But of course, we’re not the only users, and these tools will only be made better through community input.

You can see `zarr-layer` in production in our [Open Climate Risk explorer](https://carbonplan.org/research/climate-risk) by toggling on the “Raw data” layer. For a broader tour, check out the `zarr-layer` [demo](https://zarr-layer.demo.carbonplan.org/), which includes example Zarr stores of various shapes, including single-image stores, high-resolution data leveraging multiscales, and Icechunk-backed virtual datasets. Please give these tools a try and report any issues, pain points, or missing features you run into on [GitHub](https://github.com/carbonplan/zarr-layer).
