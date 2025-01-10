---
version: 1.0.0
title: Updates to the CDR Verification Framework
authors:
  - Freya Chay
  - name: Zeke Hausfather
    src: https://images.carbonplan.org/authors/zeke-hausfather.png
  - Kata Martin
  - Raphael Hagen
date: 04-10-2023
summary: We added new pathways (direct ocean removal, alkaline waste mineralization, and biochar), modified existing pathways, and upgraded the tool with improved versioning, additional documentation, and the ability to see how components are shared across pathways.
components:
  - name: VCLChart
    src: ./vcl-chart.js
  - name: BeforeAfter
    src: ./before-after.js
---

Last September, CarbonPlan and Stripe collaborated to release a [CDR Verification Framework](https://carbonplan.org/research/cdr-verification) that maps out the key uncertainties associated with quantifying net carbon removal and storage durability for different carbon dioxide removal pathways. The framework summarizes our uncertainty mapping for each pathway with a metric called the Verification Confidence Level (VCL), which represents our confidence that carbon removal outcomes can be accurately quantified using the best scientific understanding, measurement, and modeling approaches available today.

The Verification Framework was designed as a regularly updating resource intended to improve and expand over time. This quarter, we are making updates in three areas: pathway additions, pathway modifications, and tool improvements. You can read about these updates in detail below.

## Pathway additions

With this round of Verification Framework updates, we are adding three new pathways: biochar, alkaline waste mineralization, and direct ocean removal.

<Figure>
  <VCLChart />
  <FigureCaption number={1}>
    The Verification Confidence Level (VCL) metric represents our confidence
    that carbon removal and storage durability outcomes can be accurately
    quantified using the best scientific understanding, measurement, and
    modeling approaches available today. Each CDR pathway is associated with a
    range of VCLs, which captures differences between potential approaches
    within each pathway and the associated quantification uncertainties. This
    figure highlights pathways added in this round of updates.
  </FigureCaption>
</Figure>

It’s important to note that our choice to focus on the uncertainties associated with storing carbon for 1000+ years uniquely affects our consideration of biochar. For context, biochar is produced by using pyrolysis to transform biomass into a form that degrades more slowly, resulting in longer-term storage of the embodied carbon. In our assessment, we specifically consider biochar that is applied to agricultural fields as a soil amendment. The degradation of biochar in soils is contingent on its physical and chemical characteristics and the environment in which it is applied, and in general, we cannot predict biochar degradation over long time scales with confidence. This means that estimates of how much carbon remains stored for 1000+ years are highly uncertain. Those interested in biochar for shorter duration carbon storage may find it appropriate to adjust these uncertainties.

Thanks to the scientific experts and CDR companies who gave feedback and input on these three pathways: Dr. Alex Gagnon (University of Washington / Banyu Carbon), Dr. Becca Neumann (University of Washington), Liam Bullock (Geosciences Barcelona), Dr. Matt Long (NCAR / [C]Worthy), Dr. Santanu Bakshi (Iowa State University), Dr. Sophie Gill (Exponential), Dr. Vikram Rao (Research Triangle Energy Consortium), Captura, Arca, Carba, Climate Robotics, Takachar, Travertine, and SeaO2. Any remaining mistakes or mischaracterizations are our sole responsibility.

## Pathway modifications

In addition to adding new pathways to the Verification Framework, we made several updates to existing pathways based on feedback from scientists and practitioners.

First, we updated the mineral ocean alkalinity enhancement (OAE) pathway to reflect a broader understanding of the potential forms mineral additions could take and their associated uncertainties. In the initial release, we assessed the mineral OAE based on the approach of adding alkalinity to the ocean in the form of larger rock particles. With this approach, there is significant uncertainty associated with the dissolution of the rocks, the rate of alkalinity introduction, and the risk of secondary precipitation. However, we received feedback from scientists and practitioners pointing out that there are approaches to mineral OAE that involve more controlled introduction of alkalinity, such as using a finely ground solid hydroxide. Reflecting these approaches in the mineral OAE uncertainty mapping changes the upper confidence bound from VCL 2 to VCL 3, meaning that current quantification capacity can establish permanent carbon removal occurred, but significant uncertainties remain.

Second, we made changes to ensure that no uncertainties are double counted in the VCL metric. At a high level, each pathway is composed of components that determine net carbon removal and storage durability outcomes. We classify each component as informing carbon drawdown, project emissions, or storage durability, and analyze the associated uncertainty given the best available quantification approaches. The VCL metric is determined by counting the number of components with a medium, high, or very high uncertainty. In some cases, multiple components may reflect the same underlying uncertainty — for example, long-term leakage of CO₂ from a storage reservoir could be understood as a drawdown uncertainty or a durability uncertainty. In such cases, we have updated the tool to ensure all uncertainties are reflected in drawdown components, and calculate the VCL metric excluding durability components. This change does not affect the final VCL metric for any of the CDR pathways currently in the tool.

<Figure>
  <BeforeAfter />
  <FigureCaption number={2}>
    The ocean biomass sinking pathway diagram as initially released (before) and
    as updated to include the component ‘Outgassing’ (after). Since ‘Outgassing’
    captures the same underlying uncertainty as ‘Deepwater recirculation’, the
    latter is excluded from the calculation of the overall VCL. You can explore
    this example in more detail in the [interactive
    tool](https://carbonplan.org/research/cdr-verification/ocean-biomass-sinking-no-harvest).
  </FigureCaption>
</Figure>

Third, we updated text throughout the tool to ensure components that are shared across pathways are described consistently. A full accounting of these changes can be found on [GitHub](https://github.com/carbonplan/cdr-verification).

## Tool improvements

The content changes described above are accompanied by improvements to the tool itself and the infrastructure behind it.

Each pathway in the Verification Framework now has dedicated documentation, which includes the pathway’s version history and acknowledgement of scientific experts, CDR companies, and other actors who have given input. The pathway version history is maintained using a form of [semantic versioning](https://semver.org/). A major version change is used to signify that a pathway has been updated in a way that affects the VCL rating — for example, the updates to mineral OAE described above which changed the [pathway version](https://carbonplan.org/research/cdr-verification/docs/pathways/ocean-alkalinity-enhancement-mineral) from 1.0 to 2.0. A minor version change is used to reflect conceptual changes to a pathway that do not affect the VCL — for example, the updates made this spring to the enhanced weathering pathway which changed the [pathway version](https://carbonplan.org/research/cdr-verification/docs/pathways/enhanced-weathering) from 1.0 to 1.1. The tool also supports viewing previous versions of each pathway.

In addition, we built out documentation for each component that allows users to see the associated revision history and explore how components are [shared across pathways](https://carbonplan.org/research/cdr-verification/docs/components/asg). Insofar as all pathways are built out of components that represent different interactions with the carbon cycle, we hope this update will make it easier to track how new and emerging pathways share components with existing ones.

Together, these changes should lay a stronger foundation for the continued maintenance and evolution of the tool.

## Next steps

With the goal of making the Verification Framework as useful and accurate as possible, we plan to establish more predictable processes for adding and updating pathways. In that spirit, we intend to revisit all pathways that rely on terrestrial biomass in Q3 of this year. If you would like to provide input on the framework’s treatment of these pathways, please feel free to send us an email at hello@carbonplan.org.
