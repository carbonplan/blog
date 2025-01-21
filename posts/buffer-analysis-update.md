---
version: 1.0.0
title: California forest carbon buffer pool update
authors:
  - Grayson Badgley
  - Danny Cullenward
date: 12-01-2022
summary: Offset projects hit by recent wildfires report larger carbon losses than we had projected.
data:
  ACR255:
    slag:
      max: 82.69
      current: 73.24
      termination: 62.84
components:
  - name: ReversalsTable
    src: ./reversals-table.js
---

Earlier this year we published a study documenting [how wildfire and forest disease threaten the environmental integrity of California’s forest offsets program](http://dx.doi.org/10.3389/ffgc.2022.930426). Our calculations show that the program’s self-insurance buffer pool is effectively insolvent. Notably, we estimate that the 2020 and 2021 wildfire seasons caused losses that are likely to fully deplete the credits set aside to protect against fire-related losses — burning through protections meant to last a century in less than a decade.

New documents posted by two of the projects we examined give us a sense of actual program outcomes relative to our estimates of wildfire-caused carbon losses. As a reminder, our study used [satellite-based estimates of burn severity](https://burnseverity.cr.usgs.gov/ravg/) from the U.S. Forest Service, rather than project paperwork, because projects in California’s program have several years to conduct post-fire surveys and release public data. In the last few months, however, two of the projects we looked at posted official estimates of their carbon losses ([CAR1102 Montesol](https://thereserve2.apx.com/mymodule/reg/TabDocuments.asp?r=111&ad=Prpt&act=update&type=PRO&aProj=pub&tablename=doc&id1=1102) and [ACR255 Colville](https://acr2.apx.com/mymodule/reg/TabDocuments.asp?r=111&ad=Prpt&act=update&type=PRO&aProj=pub&tablename=doc&id1=255)).

<Figure>
  <ReversalsTable />
  <TableCaption number={1}>
    Magnitude of reported reversals, from preliminary project paperwork. ACR255
    reported two separate reversal events and therefore appears twice in the
    table. Our analysis only examined the project’s sixth reporting period.
    Reversal estimates denominated in million tCO₂.
  </TableCaption>
</Figure>

The new data report a total reversal of 3.95 million tCO₂, including losses from a handful of smaller fires that weren’t part of our study (like the Williams Flat fire that burned ACR255 in 2019). For comparison, our estimated carbon losses for CAR1102 were about 7% to 28% higher than reported outcomes, with an absolute error of about 14,000 to 59,000 tCO₂. In contrast, our projections for ACR255 were about 25% to 43% lower than what the project reported, with an absolute error of about 791,000 to almost 1.4 million tCO₂.

One reason that may explain why ACR255’s reported losses are substantially higher than our estimates is that we only projected wildfire carbon losses, whereas projects report losses inclusive of harvest and other causes of tree mortality. In this case, we understand that ACR255 experienced exceptionally strong winds in 2021 that not only fueled the growth of wildfires, but also blew down trees across the project area — leading to higher overall carbon losses.

Together, these new data show that our analysis is substantially more conservative than reported losses. Our earlier calculations intentionally erred on the side of underestimating carbon losses, yet still found that the program’s buffer pool is severely undercapitalized. That two projects have now reported substantially higher numbers only reinforces the concerns we raised about the buffer pool’s design and ongoing solvency.

For additional context, the California Air Resources Board previously retired 1.12 million tCO₂ from the buffer pool to account for two previously verified wildfire reversals. Although the newer reversals from ACR255 and CAR1102 are still under final review, they should bring verified wildfire losses to over 5 million tCO₂. As we showed in our previous analysis, the buffer pool has around 6 million tCO₂ explicitly set aside to handle fire losses for the next 100 years, meaning that reported losses from ACR255 and CAR1102 will deplete over 80 percent of the fire component of the buffer pool.

Program-wide wildfire losses will inevitably grow when official data become available for the Lionshead and Bootleg fires, which burned a pair of projects in Oregon ([ACR260 Warm Springs](https://acr2.apx.com/mymodule/reg/prjView.asp?id1=260) and [ACR273 Klamath East](https://acr2.apx.com/mymodule/reg/prjView.asp?id1=273)). We estimated those losses to be a minimum of 1.38 and 1.15 million tCO₂, respectively, which would bring total wildfire reversals to about 7.60 million tCO₂ — more than fully depleting the number of buffer pool credits set aside to manage wildfire risks over the next 100 years.

One important caveat is in order. By design all buffer pool credits are cross-fungible, meaning that credits contributed for any one risk factor can be used to cover losses due to another risk factor. As a result, our core finding that actual wildfire losses have depleted the contributions set aside for wildfire protections doesn’t mean that the buffer pool is about to collapse. Instead, it indicates that California policymakers fundamentally underestimated the risk of wildfire such that the program is unprepared for a warmer, drier future.

Although the disconnect between projected and actual wildfire risks is striking enough on its own, the magnitude of carbon losses experienced by ACR255 raises additional concerns that could threaten nearly half of the buffer pool. Under California’s rules, forest offset projects are automatically terminated when their carbon stocks fall below baseline levels. Termination, in turn, requires the buffer pool to retire as many credits as the project has earned in total.

ACR255 is a very large project that is surprisingly close to termination. Recent wildfires caused standing live above ground carbon stocks to fall from about {data.ACR255.slag.max} to {data.ACR255.slag.current} tCO₂ per acre. The project’s minimum baseline level is {data.ACR255.slag.termination} tCO₂ per acre. Thus, if ACR255 were to experience future carbon losses of a similar magnitude to those reported in the latest batch of project documents, it will be automatically terminated. Termination of ACR255 would require the California Air Resources Board to retire buffer pool credits equal to the total number of credits issued to the project — about 15.2 million tCO₂ to date, or about half of the current buffer pool.

Taken together, these new data add to the mounting evidence that California’s forest offsets program is unprepared to handle the magnitude and severity of climate change-fueled wildfires. We are encouraged that CARB recently [signaled their openness](https://ww2.arb.ca.gov/resources/documents/us-forest-offset-workshop-presentations-november-2022) to reviewing and revising the risk factors underlying the forest carbon buffer pool.
