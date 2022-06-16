---
version: 1.0.0
title: Monitoring forest carbon offsets for the 2022 fire season
authors:
  - Grayson Badgley
  - Jeremy Freeman
  - Joe Hamman
date: 06-16-2022
summary: We have updated our wildfire monitoring tool in preparation for the 2022 fire season.
card: offsets-fires-update
components:
  - name: CreditingTable
    src: ./crediting-table.js
---

With the onset of the summer fire season, we’ve dusted off and revamped our tool for monitoring wildfires in forest carbon offset projects. In addition to a few visual tweaks, we’ve made a number of behind-the-scenes technical improvements that will allow us to better respond if fire burns through one of California’s forest carbon offset projects. Last year we identified and tracked fires across nine projects that burned over 158,000 acres.

Our monitoring tool tracks actively burning wildfires that intersect with forest offset projects enrolled in California’s offsets program. Since last year we have expanded the number of projects we’re tracking from 74 to 119, in locations across the continental United States and coastal Alaska. We also moved the fire monitoring tool to a [standalone website](https://carbonplan.org/research/forest-offsets-fires), separating it from the [offsets mapping tool](https://carbonplan.org/research/forest-offsets-crediting) we released as part of [our analysis](https://carbonplan.org/research/forest-offsets-explainer) of [crediting errors](https://doi.org/10.1111/gcb.15943) in California’s forest offsets protocol. This allowed us to preserve the original crediting error analysis, while making it possible to add new features to the fire monitoring tool, like increasing the number of offset projects we’re tracking and adding the ability to directly link to map coordinates.

Ongoing monitoring of wildfire across California’s forest offsets projects is especially important given the program’s [vulnerability to fire](https://grist.org/burning-issue/how-wildfires-could-unravel-californias-climate-progress/) and [other disturbance risks](https://www.nationalgeographic.com/environment/article/forests-as-carbon-offsets-climate-change-has-other-plans). We recently released an academic study demonstrating that [wildfires have already burned through the buffer pool credits](https://www.biorxiv.org/content/10.1101/2022.04.27.488938v2) that California has set aside to insure against carbon losses from wildfires for the next 100 years. Although the buffer pool still contains millions of credits, there is mounting evidence that the program has significantly underestimated the risks to forest carbon permanence.

The precarious state of California’s buffer pool makes every fire season a high-stakes affair. The stakes are especially high this year as much of the American West remains deep in the throes of [exceptional](https://doi.org/10.1038/s41558-022-01290-z) [drought](https://droughtmonitor.unl.edu/). The ongoing drought means heightened fire risk across large swathes of the West and, more specifically, above-normal wildfire risk for individual forest carbon offsets projects.

To get a sense of what that risk might look like, we overlaid offset project locations with the National Interagency Fire Center predictive services’ [seasonal fire potential outlooks](https://www.nifc.gov/nicc/predictive/outlooks/outlooks.htm) (Table 1). For each month, we summed the number of offset credits issued to projects with “above normal” wildfire risk.

<Figure>
  <CreditingTable
    data={[
      ['June', '35.85'],
      ['July', '20.15'],
      ['August', '20.15'],
      ['September', '27.11'],
    ]}
  />
  <TableCaption number={1}>
    The number of carbon offset credits exposed to “above normal” fire risk over
    the summer months. Each credit represents 1 tCO₂. Fire risk values come for
    the National Interagency Fire Center predictive services’ fire potential
    outlooks.
  </TableCaption>
</Figure>

Between now and September, there will be at least 20 million offset credits classified at “above normal” risk each month. The month of June (before the arrival of summer monsoon rains) is an especially risky time for the three large projects in Arizona and New Mexico, which have collectively received nearly 16 million credits. Earlier this month, the Cienegita fire [ignited on the edge of CAR1183](https://carbonplan.org/research/forest-offsets-fires?center=-105.61474546544508,33.169056871856554&zoom=8.721984645558438), but was rapidly contained. As the fire season progresses, projects scattered throughout northern California, southern Oregon, and eastern Washington become the primary concern.

We’ll post any relevant updates on [Twitter](https://twitter.com/carbonplanorg) and this blog. In the meantime, you’re welcome to [read more about our data sources](https://carbonplan.org/research/forest-offsets-fires?methods=true) or look at the code underlying [the analysis](https://github.com/carbonplan/forest-offsets-fires) and the [web map](https://github.com/carbonplan/forest-offsets-web).
