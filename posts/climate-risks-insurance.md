---
version: 1.0.0
title: Which states' insurance markets are most exposed to climate risks?
authors:
  - Oriana Chegwidden
  - Sadie Frank
date: 12-20-2022
summary: We analyze different ways the Federal Insurance Office could identify the most climate-vulnerable states.
fileId: 1zcsvClWeNMJIcnbTHg0eGcXISb9aftyvdUNJgbPHaKI
card: climate-risks-insurance
components:
  - name: States
    src: ./states.js
  - name: HatchedCircle
    src: ./hatched-circle.js
  - name: BlueCircle
    src: ./blue-circle.js
---

The Federal Insurance Office (FIO) recently [proposed to solicit information](https://www.govinfo.gov/content/pkg/FR-2022-10-21/pdf/2022-22880.pdf) from insurance companies about how climate risks may impact the affordability and availability of homeowners insurance policies. We submitted a [comment supporting the call](https://files.carbonplan.org/FIO-Climate-Related-Financial-Risk-12-20-2022.pdf) where we emphasized the importance of nationwide data collection efforts and encouraged FIO to release its data publically. We also conducted analyses to support some potential modifications to the data solicitation, which we describe below.

The FIO proposal would involve collecting information nationwide from companies writing more than $100 million in policies. Additionally, in 10 states that they identified as the most “climate vulnerable” they will solicit additional information so as to cover at least 80% of the state insurance market. FIO identified these states using FEMA’s [National Risk Index (NRI)](https://hazards.fema.gov/nri/) product. With enough resources, soliciting information to meet that 80% threshold nation-wide would of course be preferable, but as an initial step, we were pleased to see the targeted requests in regions that have been most heavily impacted by climate disasters to date.

Assessing the climate vulnerability of states, however, depends on the choice of metrics included in the analysis. The NRI captures expected annual losses (EAL) from agriculture, buildings, and human life, as well as the summed total of all three sectors. These losses are then determined separately for 18 hazards. In its proposed approach, the FIO ranked states according to the summed total expected annual loss for a subset of 15 climate hazards. As Figure 1 demonstrates through an interactive tool, changing the type of loss, or choosing a different subset of hazards, can change the ranking of most vulnerable states and result in a different set of top 10 most vulnerable states than the ones FIO identified. See our [GitHub repository](https://github.com/carbonplan/climate-risks-insurance) for more details on the analysis.

<Figure>
  <States />
  <FigureCaption number={1}>
    The FIO selected a subset of hazards from the National Risk Index and ranked
    states according to total expected annual losses (EAL) from those hazards.
    They propose to focus efforts on the top ten from that selection,
    highlighted with hatching <HatchedCircle />. A different set of states will
    highlight in blue <BlueCircle /> by selecting different hazards (the default
    selection by the FIO, climate sensitive hazards according to the Fourth
    National Climate Assessment, or a custom selection by expanding the list).
    Modify which types of losses (e.g. buildings, agriculture, and population)
    you want to include in your ranking. The underlying data on population
    losses assume a value of statistical life of $7.6 million per death and
    $760k per injury. The bar chart shows the losses from each state ranked with
    the slider allowing a selection of more (or fewer) states. The values denote
    the losses captured by the selected states as well as the total for that set
    of hazards.{' '}
  </FigureCaption>
</Figure>

In our comments to FIO, we suggest they focus their initial selection of 10 states to reflect only losses to buildings, and to only include hazards that are likely to worsen with climate change. We make this recommendation because the data collection proposal targets homeowners insurance losses from physical climate risks, as opposed to population or agricultural losses or natural disasters more broadly. We hope that the interactive figure above, combined with our recommendations, can help FIO and others interested in FIO’s data request see how historical damages vary across states and use that information to better understand how analytical choices affect the selection of the most climate-vulnerable states.
