---
version: 1.0.0
title: Expanding the ways the CDR Verification Framework looks at biomass
authors:
  - Freya Chay
color: yellow
date: 04-01-2024
summary: We updated the Verification Framework tool to include more detail and a broader representation of biomass-based CDR pathways. We added two new pathways and updated three others.
card: vcl-update-v2024.04.0
components:
  - name: VCLChart
    src: ./vcl-chart.js
---

The [CDR Verification Framework](https://carbonplan.org/research/cdr-verification) is an interactive tool that maps out the key uncertainties associated with calculating net carbon removal for different CDR pathways. In collaboration with Frontier, we have now updated the tool to improve the representation of approaches that rely on terrestrial biomass.

With the addition of two new pathways, the framework now includes five biomass-based pathways: biomaterial injection, biomass burial, biomass sinking, biochar applied to soils, and bioenergy with carbon capture and storage (BECCS). All of these pathways rely on photosynthesis to remove carbon from the atmosphere, and share a set of upstream uncertainties associated with the choice of biomass feedstock. However, each pathway takes a unique approach to storing the biomass carbon. Our evaluation reflects how confident we are that the approach can store carbon for at least 1000 years.

<Figure>
  <VCLChart />
  <FigureCaption number={1}>
    The Verification Framework summarizes the uncertainties associated with each
    CDR pathway using a metric called the Verification Confidence Level (VCL),
    which represents our confidence that carbon removal outcomes can be
    accurately quantified using the best scientific understanding, measurement,
    and modeling approaches available today. Each pathway is associated with a
    VCL range, which captures differences in implementation within a given
    pathway. This figure highlights the VCL ratings for the five terrestrial
    biomass-based pathways. For more information on the VCL metric, read our
    [original
    explainer](https://carbonplan.org/research/cdr-verification-explainer).
  </FigureCaption>
</Figure>

As you interact with these updates, please keep in mind that the Verification Framework should be seen as a starting point for understanding biomass-based carbon removal, not a complete framework for evaluating if and when it’s a good idea. The tool focuses on project-level quantification of net carbon removal and storage durability, which is the primary lens of carbon markets and [emerging policy mechanisms](https://www.energy.gov/fecm/carbon-dioxide-removal-purchase-pilot-prize). However, biomass is a [limited global resource](https://doi.org/10.1073/pnas.0704243104) and choosing to use it for CDR will require system-level thinking — including around alternative biomass uses, the incentives created for adjacent industries like forestry and agriculture, and the resulting impacts on ecosystems and communities. Project-level MRV is necessary, but insufficient, to address these larger questions.

Below, we explain two important choices we made when deciding how to represent biomass-based pathways in the Verification Framework. A full accounting of changes can be found on [GitHub](https://github.com/carbonplan/cdr-verification) and the tool’s [online documentation](https://carbonplan.org/research/cdr-verification/docs/pathways/biomaterial-injection).

## We included projects that don’t grow their own biomass

In mapping uncertainty for each biomass-based pathway, we considered both the possibility that projects grow their own biomass and the possibility that they source existing biomass — for example, from agriculture, forestry, or municipal waste streams. If a project grows biomass and stores the captured carbon, it is clearly and directly responsible for removing carbon from the atmosphere. In contrast, projects that store biomass carbon they weren’t responsible for growing are, from a [narrow perspective](https://carbonplan.org/research/carbon-removal-mechanisms), avoiding emissions. If not for the project’s actions, some or most of the carbon contained in that biomass would eventually be emitted to the atmosphere via decomposition.

But there are reasonable arguments for thinking about these projects as carbon removal, even though they don’t grow their own biomass. First, if successful, these projects do transfer carbon from the fast carbon cycle to the slow carbon cycle and result in a net reduction of atmospheric CO₂. That makes them different from other forms of avoided emissions that displace fossil fuel use or capture and store fossil CO₂ emissions. Second, there is no difference from the standpoint of the atmosphere between preventing the decomposition of biomass and letting the biomass decompose only to recapture that carbon through new biomass growth. Finally, requiring CDR projects to use only purpose-grown biomass could introduce [counterproductive](https://files.wri.org/d8/s3fs-public/2023-07/the-global-land-squeeze-report.pdf?VersionId=edANDGIvq_NhCGbDVfte6diBdJswo7e9) land-use incentives. We find these arguments compelling, but the classification of such projects remains an ongoing topic of conversation in the broader CDR and carbon accounting communities.

Any biomass-based project must grapple with upstream uncertainties, such as understanding how using biomass for CDR [affects](https://carbonplan.org/research/cdr-verification/docs/components/market-effects) broader land use and land management decisions. However, quantifying net carbon removal for projects that don’t grow their own biomass introduces several additional upstream considerations. First, we must ask [what would have happened to the biomass](https://carbonplan.org/research/cdr-verification/docs/components/baseline-carbon-stored) if not for the CDR project. If the biomass carbon would have otherwise been kept out of the atmosphere (e.g., in a slow degrading environment like a landfill), storing it does not affect the atmosphere until the counterfactual biomass decomposition would have otherwise occurred. Second, we must consider if the feedstock [currently serves a function](https://carbonplan.org/research/cdr-verification/docs/components/feedstock-use-counterfactual) that will need to be replaced if the feedstock is instead used for CDR. For example, if corn stover is currently left on fields to add nitrogen, phosphorus, and potassium to soils, then using that biomass for CDR could result in additional demand for fertilizer and drive new agricultural emissions. We indicate in the component text where an uncertainty applies specifically to projects that do not grow their own biomass.

In practice, quantifying these upstream uncertainties will require establishing counterfactuals that are specific to a project’s particular feedstock and context. These uncertainties may also change radically as we consider projects at a larger and larger scale.

## We treat avoided emissions as a co-benefit

Some approaches to biomass-based carbon removal could potentially result in avoided emissions. For example, a primary goal of bioenergy with carbon capture and storage (BECCS) is producing an energy product like electricity or heat, which ideally displaces the use of fossil fuels. As another example, diverting biomass from a landfill could avoid methane emissions associated with anaerobic decomposition.

Characterizing avoided emissions is useful for understanding the overall impact of a CDR project. But to understand the role for these projects in a net-zero world, we should consider the carbon removal component separately. In the Verification Framework, we therefore indicate where a biomass-based CDR approach might be expected to generate avoided emissions co-benefits, but recommend that these avoided emissions be excluded from the calculation of net carbon removal.

## Acknowledgements

Thanks to the Frontier team — including Joanna Klitzke, Hannah Bebbington, Zeke Hausfather, Frauke Kracke, Judy Savitskaya, and Scott Litzelman — for collaborating on this round of updates.

Thanks also to the scientific experts and CDR companies who gave feedback and input: Anne Ware (NREL), Corinne Scown (LBNL), Erica Belmont (Carbon Direct), Florentino de la Cruz (University of North Florida), Kodama, Matt Gammans (Isometric), Morgan Raven (UC Santa Barbara), Rewind, Sarah Nordahl (LBNL), Sinéad Crotty (Carbon Containment Lab), Vaulted, Yimin Zhang (NREL). Any remaining mistakes or mischaracterizations are our sole responsibility.

Sarah Baker (LLNL) helped coordinate input from members of the national labs. The participation of scientists at Lawrence Livermore National Laboratory (LBNL), Lawrence Berkeley National Laboratory (LBNL), and the National Renewable Energy Lab (NREL) was [supported](https://www.energy.gov/technologytransitions/articles/doe-selects-four-national-laboratory-led-teams-accelerate) by the DOE Office of Technology Transitions in collaboration with the Office of Fossil Energy and Carbon Management (FECM) and the Office of Clean Energy Demonstrations (OCED).
