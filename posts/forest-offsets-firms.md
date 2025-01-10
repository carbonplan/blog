---
version: 1.0.0
title: Adding near real-time fire data to the forest carbon offsets monitoring tool
authors:
  - Max Jones
  - Kata Martin
  - Raphael Hagen
date: 08-31-2023
summary: We added near real-time satellite data to our fire and offset project monitoring tool to highlight active and changing portions of fires.
---

Over the past three fire seasons, we have [monitored wildfires](https://carbonplan.org/blog/offsets-fires-update) that burn within forest carbon offsets projects enrolled under California’s offsets program. To continue to improve our ability to monitor rapidly changing fires and highlight active burn areas, we have now added near real-time satellite data to our [monitoring tool](https://carbonplan.org/research/forest-offsets-fires).

Previously, our approach relied solely on fire perimeter data from the [National Interagency Fire Center](https://data-nifc.opendata.arcgis.com/) (NIFC). However, NIFC perimeters are derived partially from airborne measurements and on-the-ground reports which delays updates and hinders monitoring of early-stage or rapidly changing fires. Adding near real-time satellite data to our monitoring tool will allow us to identify threatened offset projects earlier and report more accurately on rapidly changing fire conditions.

We created an [open source pipeline](https://github.com/carbonplan/forest-offsets-fires) for generating a cloud-optimized version of the near real-time thermal anomaly data from the NASA-sponsored [Fire Information for Resource Management System](https://firms.modaps.eosdis.nasa.gov/) (FIRMS). Specifically, we use a composite of thermal anomaly data from the Visible Infrared Imaging Radiometer Suite (VIIRS) aboard Suomi-NPP and NOAA-20 and the Moderate Resolution Imaging Spectroradiometer (MODIS) aboard Terra and Aqua. We filter out low confidence data and subset to only include thermal anomalies within the United States. We use the opacity of the data in the monitoring tool to highlight the fire radiative power, which is a useful proxy of fire intensity.

The near real-time data will allow more rapid identification of immediate risks to offset projects, which is especially important considering the [tenuous solvency](https://carbonplan.org/blog/buffer-update-two) of California’s forest carbon buffer pool. You can [read more about our data sources](https://carbonplan.org/research/forest-offsets-fires?methods=true) or check out the underlying code for the [data pipeline](https://github.com/carbonplan/forest-offsets-fires) and [web map](https://github.com/carbonplan/forest-offsets-web).

## Thanks

CarbonPlan received grant support from [ESIP Lab](https://www.esipfed.org/lab) for this project, which receives support from NASA, NOAA, and the USGS.
