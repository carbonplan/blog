import { Link } from '@carbonplan/components'
import Figure from './climate-trace-release/figure'
import FigureCaption from '../components/figure-caption'

export const meta = {
  version: '1.0.0',
  title: 'Climate TRACE release',
  authors: ['Oriana Chegwidden', 'Cindy Chiao', 'Joe Hamman'],
  date: '09-16-2021',
  summary:
    'Our contributions to the initial Climate TRACE data release, and what’s coming next.',
  card: 'climate-trace-release',
}

In early 2020, CarbonPlan joined the [Climate TRACE](https://www.climatetrace.org) coalition. The coalition’s goal is to produce an independent dataset which uses remote sensing data to track greenhouse gas emissions on a timely basis. Today, the coalition includes twelve organizations, each focusing on one or more sectors. We were responsible for estimating emissions arising from the loss of forest biomass due to non-fire disturbances. To accompany the release of Climate TRACE’s initial [platform](https://climatetrace.org/), this post explains our contribution and documents our work.

## Our contribution

For the initial release of the Climate TRACE platform we used established methods to estimate gross emissions from stand-replacing forest disturbances. Our work closely followed the approach of [Zarin et al. (2016)](https://doi.org/10.1111/gcb.13153) and is similar to that of the recent [Harris et al. (2021)](https://doi.org/10.1038/s41558-020-00976-6) paper, the results of which are hosted by the [Global Forest Watch](https://www.globalforestwatch.org/) platform. Our analysis created a data product of annual emissions for each 30 m x 30 m forest pixel across the globe from 2001 through 2020. The primary differences between our implementation for the Climate TRACE platform and the original data from Zarin et al. (2016) are an extension through 2020 and the complete coverage of all global forested areas.

<Figure />
<FigureCaption>
  Cumulative emissions from forests (2001 - 2020). Pixels are 1º x 1º. Open the{' '}
  <Link
    sx={{
      color: 'secondary',
      '@media (hover: hover) and (pointer: fine)': {
        '&:hover': {
          color: 'primary',
        },
      },
    }}
    href='/research/forest-carbon'
  >
    interactive
  </Link>{' '}
  version to explore more.
</FigureCaption>

Our complete methods are documented in detail [here](https://docs.google.com/document/d/e/2PACX-1vSVPWE8BOOqu_G9_bdioMquhoIOTnJ4UOYeJeCpEr9RMBrazStaIxQIJtrt8DzVBMZb4waxA9fLyyqr/pub) and all of our source code is available on [GitHub](https://github.com/carbonplan/trace). The full data product is visible via an interactive [webmap](https://carbonplan.org/research/forest-carbon). Interested users can also check out a sample [jupyter notebook](https://aws-uswest2-binder.pangeo.io/v2/gh/carbonplan/trace/HEAD?urlpath=lab/tree/notebooks%2Fblogpost_sample_notebook.ipynb) to inspect the resulting publicly-available, cloud-based emissions archive at the 30 m scale and visualize the data like the map above.

Only a subset of our comprehensive forest emissions dataset is now hosted on the Climate TRACE website. Another coalition member, [Blue Sky Analytics](https://blueskyhq.in/), estimated fire-related emissions for all biomass (forest, savanna, shrubland, and cropland), so we partitioned our data to exclude fire emissions. As a result, while our full dataset includes emissions from all stand-replacing forest disturbances (including fire), we disaggregated these totals by subtracting emissions attributable to fire to create a “forest-clearing” (e.g. deforestation, harvest) subset. We then aggregated forest-clearing emissions into annual country-level estimates for 2015-2020 for the Climate TRACE website.

We’re particularly proud of our [open source](https://github.com/carbonplan/trace), cloud-based pipeline, which streamlines the process and facilitates low-cost annual updates. The resulting data product is [openly accessible](https://github.com/carbonplan/trace/tree/main/carbonplan_trace/v0/data) on AWS.

The Climate TRACE platform aggregates data across sectors from many organizations — aligning, for example, our forest clearing emissions with disparate sectors such as oil and gas production, transportation, and mining. We focused our validation efforts on ensuring our dataset aligned with Zarin et al. (2016). We were not involved in the validation of other sectors’ underlying datasets, the cross-sectoral synthesis, or the communication of results via the Climate TRACE website.

## Important caveats

We also want to highlight a number of important caveats about the release and its portrayal on the Climate TRACE platform.

The first and likely most limiting caveat is that the dataset here reports only gross emissions from forest biomass loss. In contrast, most established emissions inventories, such as the UNFCCC and Global Carbon Project, report net emissions from the forestry sector, inclusive of carbon sequestration. As a result, this initial dataset is not easily compared to other inventories. In the weeks ahead we plan to release results from a second approach which calculates net forest sector emissions, based on a different set of methods that allow for direct observation of both emissions and sequestration.

Additionally, our approach makes a few generalizations about forest carbon losses. First, we interpret all biomass loss as carbon leaving the land surface as “committed emissions” which will eventually enter the atmosphere. Second, we use the term “forest clearing” to describe all of the non-fire related emissions, but we stress that it is a simplified term to encompass a variety of underlying processes (e.g. deforestation, harvest). Further, the method ignores any emissions due to forest degradation, which can be [substantial](https://doi.org/10.1186/s13021-017-0072-2). The values also do not currently include emissions from other forest-related carbon pools (e.g. belowground biomass) that were included in Harris et al. (2021). Our next data release will take steps to address these concerns (see “What’s next” below) and we hope that future iterations of the Climate TRACE platform will include it.

Finally, Climate TRACE’s vision centers the power of transparency to improve and legitimate emissions monitoring. We were proud to be strong proponents of these principles within the Climate TRACE coalition. We released our full data and code as open source products and hope that this will become the norm across the coalition. We also hope that the Climate TRACE project will continue to seek community input to leverage the deep expertise of the broader emissions monitoring community (e.g. the Global Carbon Project, Carbon Monitor, and interested researchers). An open science approach could strengthen trust and legitimacy in the emissions monitoring community and complement self-reported emissions inventories.

## What’s next

The limitations associated with the forest emissions dataset we described above inspired us to begin a collaboration with [Dr. Jon Wang](https://www.jonwangetal.com/), a forest carbon expert at the University of California, Irvine who recently published a [paper](https://doi.org/10.1038/s41558-021-01027-4) on biomass estimation in the boreal forest of North America. His method, which built on the work of [Baccini et al. (2017)](https://doi.org/10.1126/science.aam5962), created annual maps of aboveground biomass that include not only emissions due to forest losses, but also changes to the carbon sink due to forest growth. Through our collaboration we have extended their approach globally for the period 2014-2020 and added an estimation of other carbon pools (e.g. belowground biomass). We are currently evaluating the utility of the biomass estimates (both aboveground and belowground) for creating a global net emissions product. We anticipate a public release of a fully public and open data product later this year. Meanwhile, you can watch the active software development in our [public repository](https://github.com/carbonplan/trace/tree/main/carbonplan_trace/v1) for a sneak peak.

## Thanks

CarbonPlan received grant support from Watttime to participate in Climate TRACE. [2i2c](https://2i2c.org/) provided a managed [Pangeo Cloud](https://pangeo.io/cloud.html) computing environment on AWS where all our analysis was performed. The [University of Maryland](https://storage.googleapis.com/earthenginepartners-hansen/GFC-2020-v1.8/download.html), [World Resource Institute’s Global Forest Watch](https://globalforestwatch.org/), and [NASA](https://firms.modaps.eosdis.nasa.gov/) each provided freely accessible open data that made this work possible.
