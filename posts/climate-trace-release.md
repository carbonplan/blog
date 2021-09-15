import Figure from './climate-trace-release/figure'

export const meta = {
  version: '1.0.0',
  title: 'Climate TRACE 1.0 released',
  authors: ['Oriana Chegwidden', 'Cindy Chiao', 'Joe Hamman'],
  date: '09-16-2021',
  summary: 'Our contributions to the initial Climate TRACE data release, and what’s coming next.',
}

In early 2020, CarbonPlan joined the [Climate TRACE](https://www.climatetrace.org) coalition. The coalition’s goal is to produce an independent dataset which uses remote sensing data to timely track greenhouse gas emissions. Today, the coalition includes twelve organizations, each focusing on one or more sectors. We were responsible for estimating emissions arising from the loss of biomass in forests, exclusive of fire-related emissions. To accompany the release of Climate TRACE’s initial [platform](https://beta.climatetrace.org/), this post explains our contribution and documents our work.

## Our role

For the initial release of the Climate TRACE platform we used established methods to estimate gross emissions from stand-replacing forest disturbances. Our work reproduced the approach of [Zarin et al. (2016)](https://doi.org/10.1111/gcb.13153) and is similar to that of the recent [Harris et al. (2021)](https://doi.org/10.1038/s41558-020-00976-6) paper whose results are hosted by the [Global Forest Watch](https://www.globalforestwatch.org/) platform. Our analysis created a data product of annual emissions for each 30 m x 30 m forest pixel across the globe from 2001 through 2020. The primary differences between our implementation for the Climate TRACE platform and the original data from Zarin et al. (2016) are an extension through 2020 and the complete coverage of all global forested areas.

<Figure/>

Our complete methods are documented in detail [here](https://docs.google.com/document/d/e/2PACX-1vSVPWE8BOOqu_G9_bdioMquhoIOTnJ4UOYeJeCpEr9RMBrazStaIxQIJtrt8DzVBMZb4waxA9fLyyqr/pub) and all of our source code is available on [GitHub](https://github.com/carbonplan/trace). The full data product is visible via an interactive [webmap](https://carbonplan.org/research/forest-emissions). Interested users can also check out a sample [jupyter notebook](https://mybinder.org/v2/gh/carbonplan/trace/main?filepath=notebooks%2Fblogpost_sample_notebook.ipynb) to inspect the resulting publicly-available, cloud-based emissions archive at the 30 m scale and visualize the data like the map in this blog post. We also created a coarser 3 km resolution (1/40 degree) [raster](s3://carbonplan-climatetrace/v0.4/global/3000m/) for users interested in broader-scale analyses. 

Only a subset of our comprehensive forest emissions dataset is now hosted on the Climate TRACE website. Another coalition member, [Blue Sky Analytics](https://blueskyhq.in/), estimated fire-related emissions for all biomass (forest, savanna, shrubland, and cropland), so we partitioned our data to exclude fire emissions. As a result, while our full dataset includes emissions from all stand-replacing forest disturbances, we disaggregated these totals by subtracting emissions attributable to fire to create a “forest-clearing” (e.g. deforestation, harvest) subset. We then aggregated forest-clearing emissions into annual country-level estimates for 2015-2020 for the Climate TRACE website. 

We’re particularly proud of our [open source](https://github.com/carbonplan/trace), cloud-based pipeline, which streamlines the process and facilitates low-cost annual updates. The resulting data product is [openly accessible](https://github.com/carbonplan/trace/tree/main/carbonplan_trace/v0/data) on AWS. 

The Climate TRACE platform aggregates data across sectors from many organizations — aligning, for example, our forest clearing emissions with sectors as disparate as those from oil and gas production, transportation, and mining. We focused our validation efforts on ensuring our dataset aligned with Zarin et al (2016). We were not involved in the validation of other sectors’ underlying datasets, the cross-sectoral synthesis, or the communication via the Climate TRACE website. 

## Important caveats

We also want to highlight a number of important caveats about the release and its portrayal on the Climate TRACE platform. 

The first and likely most limiting caveat is that the dataset here reports only gross emissions from forest loss. In contrast, most established emissions inventories, such as the UNFCCC and Global Carbon Project, report net emissions from the forestry sector, inclusive of carbon sequestration. As a result, this initial dataset is not easily compared to other inventories. In the weeks ahead we plan to release a novel approach to calculating net forest sector emissions, based on a different set of methods that allow for direct observation of both emissions and sequestration.

Second, our method looks at only a subset of forest carbon losses. We labeled the non-fire product we delivered to the Climate TRACE platform “forest clearing,” but this is an overly broad description of all non-fire disturbances. Further, the estimates ignore any emissions due to forest degradation, which can be [substantial](https://doi.org/10.1186/s13021-017-0072-2). The values in the platform also do not currently include emissions from other forest-related carbon pools (e.g. belowground biomass), as were addressed by Harris et al (2021). Our next data release moves to address these concerns (see “What’s next” below) and we hope future iterations of the Climate TRACE platform will include it. 

Finally, Climate TRACE’s vision centers the power of transparency to improve and legitimate emissions monitoring. We were proud to be strong proponents of these principles within the Climate TRACE coalition. In the end, however, some members opted to only share write-ups of their methods, as opposed to open-sourcing their code and data. We believe that openness can bolster the reach of any experimental project and support a more community-driven effort with rapid cycles of feedback and improvement. We also hope that future validation efforts within the Climate TRACE project will adopt open science principles to better leverage the deep expertise of the broader emissions monitoring community (e.g. the Global Carbon Project, Carbon Monitor, and interested researchers). Adopting this open science approach could support trust and legitimacy in the emissions monitoring community and complement self-reported emissions inventories. We hope the coalition will continue to work towards the vision of transparency.

## What’s next

The limitations associated with the forest emissions dataset we describe here inspired us to begin a collaboration with Dr. Jon Wang, a forest carbon expert at the University of California, Irvine who had published a [recent paper](https://doi.org/10.1038/s41558-021-01027-4) on biomass estimation in the boreal forest of North America. His method, which built on the work of [Baccini et al (2017)](https://doi.org/10.1126/science.aam5962), created annual maps of aboveground biomass that include not only emissions due to forest losses, but also changes to the carbon sink due to forest growth. Through our collaboration we have extended the Wang/Baccini approach globally for the period 2013-2020, as well as adding an estimation of other carbon pools (e.g. belowground biomass). We are currently evaluating the utility of the biomass (both aboveground and belowground) estimates for creating a global net emissions product. We anticipate a public release of a fully public and open data product in late fall 2021. Meanwhile, you can watch the active software development in our [public repo](https://github.com/carbonplan/trace/tree/main/carbonplan_trace/v1) for a sneak peak.
