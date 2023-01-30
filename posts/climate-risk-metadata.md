---
version: 1.0.0
title: What metadata are necessary for interpreting a climate risk assessment?
authors:
  - Oriana Chegwidden
  - Sadie Frank
date: 01-30-2023
summary: Highlighting scientific factors that can influence climate risk products.
card: climate-risk-metadata
---

Until recently, physical climate risk assessments were conducted largely in academic contexts, where detailed methods descriptions are the norm. In that setting, researchers can evaluate and trust scientific analyses because they can review the methodological details, which increasingly means having access to the underlying data and code.

As more and more non-academic stakeholders rely on physical climate information for decision-making — often in private — quality control remains essential. But sharing fully open code and data is often inconsistent with the business models of companies that provide climate risk information. In the absence of full transparency, many crucial choices underlying a climate risk assessment can still be usefully captured in the “metadata,” or auxiliary information, associated with climate data and modeling. With sufficient metadata, a well-informed consumer can evaluate model assumptions and the conditions under which a risk assessment appropriately applies; without enough metadata, these judgments can become challenging, creating the potential for misapplication or misinterpretation.

In this post, we describe four categories of metadata that we think will be important for any robust disclosure of climate risk assessments, such as what [a draft SEC rule would require from publicly traded companies](https://carbonplan.org/research/data-financial-risk). Our framing is inspired, in part, by a set of “Dos and Don’ts” for using climate information in water resource planning ([Vano et al, 2018](https://doi.org/10.1016/j.cliser.2018.07.002)).

## 01 — Source, accessibility, and documentation

The first category of metadata includes the identity of the party that created the risk assessment, how accessible that assessment is, and what documentation is available. Knowing who created a climate risk assessment and the category of institution (e.g., academic, private) can provide important information about potential biases or reputational indicators. Assessments that are based on highly transparent methods, such as open source models with freely available input and output datasets, more readily support due diligence and reproducibility. Some assessments might also have documentation (e.g., websites, white papers, or peer-reviewed publications) with detailed descriptions of the methods and shortcomings of the assessment.

## 02 — Variables, domain, and resolution

The second category concerns the scope, variables (e.g., hazards), and spatiotemporal resolution of the climate risk assessment. These pieces of metadata inform the comprehensiveness and level of detail of the assessment, and facilitate comparison among assessments. For example, metadata can help indicate whether an assessment was based only on historical information, as opposed to future projections, or whether it only considered a subset of risks, such as fire but not flooding. Further, details about the locations and scope of risks can inform applicability, both in obvious ways (does it cover the relevant spatial region or time horizon?) and in ways that are more nuanced (is the spatial resolution sufficient to distinguish risks across nearby regions or capture extreme events that occur at finer temporal resolutions than the assessment captures?).

## 03 — Model and dataset identification

The third category identifies the assessment’s underlying models and datasets. Robust descriptions of the models and datasets used at every stage of the process can help a user interpret a risk assessment. Different models, configurations, or input datasets can result in different final risk estimates, and every step of the analytical process involves an influential choice. Most risk assessments begin with a future climate projection, which varies depending on the choice of emissions scenario, global climate model ([Tebaldi et al. 2021](https://esd.copernicus.org/articles/12/253/2021/)), subset or ensemble of Global Circulation Models (GCMs) ([McSweeney and Jones, 2016](https://www.sciencedirect.com/science/article/pii/S2405880715300170)), and even which iteration of a run from a single GCM is selected ([Kay et al. 2015](https://doi.org/10.1175/BAMS-D-13-00255.1)). These details are important because it is common to report only the results of one model, even though an ensemble is likely to be more robust ([Saxe et al. 2020](https://doi.org/10.5194/hess-25-1529-2021)). If the assessment includes a [downscaling step](https://carbonplan.org/research/cmp6-downscaling-explainer), the choice of downscaling algorithm matters ([Wilby et al. 1998](https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1029/98WR02577)). Finally, following downscaling, different impact models yield different results, so they should be identified.

## 04 — Model specifications

The fourth category describes how models were implemented, not just identifying which ones were used. When downscaling, implementation details such as the parameterization of input variables, choice of resolution, and handling of extremes can strongly affect the final results. For example, using different input variables can influence whether precipitation is projected to increase or decrease ([Gutmann et al 2022](https://doi.org/10.1175/JHM-D-21-0142.1)) and using a higher-resolution meteorological product for downscaling can predict extreme precipitation and flooding that might otherwise be missed ([Bador et al. 2020](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2019JD032184)).
With an impact model, the parameterization, choice of training data, and post-processing all affect results. For example, the way you parameterize a hydrologic model influences its projection of drought
([Chegwidden et al. 2019](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2018EF001047)) and the choice of meteorological training data and training period can affect projections of precipitation, especially in areas with complex terrain ([Henn et al. 2018](https://www.sciencedirect.com/science/article/abs/pii/S0022169417301452)).

## Transparency allows due diligence

While we consider these four categories of metadata critical to evaluating a risk assessment, they are neither fixed nor exhaustive. And although we focused on climate risk assessments, these considerations apply to climate information products more broadly. Some forms of metadata might be more or less relevant depending on the application, and evaluating a risk assessment will likely always require expert judgment.

Comprehensive metadata is the minimum amount of information required to understand the quality of a climate risk assessment. Ideally, a risk assessment would include complete methods and open code and data to support due diligence and intercomparison by reviewers and consumers. But standard disclosure of the metadata described here is a critical place to start.
