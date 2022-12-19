---
version: 1.0.0
title: Updating Enhanced Weathering in the CDR Verification Framework
authors:
  - Freya Chay
  - name: Zeke Hausfather
    src: https://images.carbonplan.org/authors/zeke-hausfather.png
date: 12-19-2022
summary: Updating our representation of Enhanced Weathering in the CDR Verification Framework in response to helpful feedback.
card: enhanced-weathering-update
components:
  - name: BeforeAfter
    src: ./before-after.js
---

Last September, we released a [CDR Verification Framework](https://carbonplan.org/research/cdr-verification) that maps out the key uncertainties associated with quantifying net carbon removal and storage durability for different carbon dioxide removal pathways. The framework summarizes our uncertainty mapping for each pathway with a metric called the Verification Confidence Level (VCL), which represents our confidence that carbon removal outcomes can be accurately quantified using the best scientific understanding, measurement, and modeling approaches available today.

In response to helpful feedback from scientists and practitioners following the initial release of the tool, we are now updating the Verification Framework’s Enhanced Weathering pathway. These updates do not change our assessment of the VCL of Enhanced Weathering, but they do reflect important conceptual shifts that we wanted to document and explain in this blog post.

<Figure>
  <BeforeAfter />
  <FigureCaption number={1}>The Enhanced Weathering pathway diagram as initially released (before) and as updated to reflect the changes described in this blog post (after). You can explore the updated diagram in more detail in the [interactive tool](https://carbonplan.org/research/cdr-verification/enhanced-weathering). </FigureCaption>
</Figure>

In the initial release, we framed our analysis of Enhanced Weathering around an understanding that the additional flux of dissolved inorganic carbon (DIC) from the site of rock application represented captured CO₂. This was a somewhat limited view, however, and the feedback we received encouraged us to instead think about Enhanced Weathering as causing an overall shift in CO₂ fluxes as a result of the alkalinity introduced by rock weathering. We think this framing more accurately captures the reality and complexity of Enhanced Weathering as a carbon cycle intervention, and we have adopted it in the updated framework.

This change most notably affects our treatment of weathering that is facilitated by non-carbonic acids. Previously, we considered these reactions to result in “lost alkalinity” — in other words, rock weathering that didn’t lead to the formation of additional DIC at the site of rock application. With the updated framing, we acknowledge that some non-carbonic acids could drive CO₂ outgassing elsewhere in the broader biogeochemical system if not neutralized via rock weathering. Accordingly, it may be appropriate to account for this avoided outgassing depending on how confidently the counterfactual can be characterized and how quickly the outgassing would have otherwise occurred. Practically, this means that some weathering facilitated by non-carbonic acid may contribute to net carbon storage and could be accounted for as such.

In addition to the conceptual shift described above, this update includes three smaller changes.

First, we have included a more explicit representation of marine carbonate precipitation in the framework. Eventually, the formation and burial of carbonate minerals will release CO₂ stored by mineral weathering. This process undoes most or all of the carbon storage associated with carbonate rock weathering, and around half of the storage associated with silicate rock weathering. The carbonate precipitation process occurs slowly and is unlikely to have a significant impact on estimates of carbon storage on decadal to millennial timescales. On geologic timescales, however, it is an important process to characterize.

Second, we changed the calculation of total carbon removal to begin with observed mineral weathering (component 2) rather than mineral application (component 1). While demonstrating mineral application is clearly an important component of MRV, carbon removal is a function of mineral weathering — not mineral application.

Third, we corrected a few instances where we described carbonic acid system reactions incorrectly and renamed some components for clarity. A full accounting of the changes can be found on [GitHub](https://github.com/carbonplan/cdr-verification).

Overall, these changes do not affect our classification of the Enhanced Weathering pathway as VCL 3, meaning that current quantification capacity can establish permanent carbon removal occurred, but significant uncertainties remain.

We look forward to continued engagement with the broader community to make the Verification Framework as useful and accurate a tool as possible. Many thanks to those who engaged to give us feedback on the initial release of the Enhanced Weathering pathway, including Dr. Becca Neumann (University of Washington), Dr. Chris Reinhard (Georgia Tech, Lithos), Dr. Kate Maher (Stanford University), Dr. Laura Lammers (Travertine), and Dr. Noah Planavsky (Yale, Lithos). Any remaining mistakes or mischaracterizations are our sole responsibility.
