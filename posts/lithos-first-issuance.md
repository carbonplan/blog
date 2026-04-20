---
version: 1.0.0
title: Questions about Lithos’ first ERW credit issuance
authors:
  - Tyler Kukla
  - Freya Chay
  - name: Kate Maher
    src: https://images.carbonplan.org/authors/kate-maher.png
date: 4-20-2026
summary: We were surprised by the high removal rates claimed in a recent credit issuance to the ERW company Lithos. This post explains what questions the issuance raised for us, and what needs to change to get to the bottom of them.
components:
  - name: Roughness
    src: ./roughness.js
  - name: Alkalinity
    src: ./alk.js
---

In December 2025, the enhanced rock weathering (ERW) startup [Lithos](https://www.lithoscarbon.com/) received its first credit issuances from the registry [Puro.earth](https://puro.earth/). One project — the [Lithos Mid-West Facility](https://registry.puro.earth/projects/606367) — received credits based on a claimed gross removal flux of 8.3 tCO₂ per hectare per year. This number is surprisingly high, and we think it deserves scrutiny.

To put it in context: based on an ongoing ERW literature review that we’re contributing to, this removal rate exceeds ~90 percent of rates reported across published experiments — including experiments specifically designed to maximize removal under idealized conditions. It’s also approximately three times higher than rates reported for a well-documented deployment in the same region, using a similar basalt application rate at a comparable or finer grain size ([Beerling et al., 2024](https://doi.org/10.1073/pnas.2319436121)).

The total credits issued to this project (2,362 CO₂ Removal Certificates, each of which is equivalent to 1 tCO₂) are a drop in the bucket. But the claimed removal rate matters. If rates like this are genuinely achievable in the Midwest, the ERW field needs to understand why, and we need evidence in the public record to support it. If they’re not, this is a case of early overissuance that should be corrected — for the buyers of these credits, and for the broader credibility of ERW as a carbon removal pathway.

Ideally, we could look at the actual data and modeling assumptions underpinning the issuance, and try to replicate the calculation in order to pinpoint where our understanding of what’s possible diverges from the claimed outcome. Unfortunately, the public documentation provided by Lithos and Puro does not provide sufficient information to do so. But by making a few assumptions, we can ask a more limited question: what would need to be true about the physical system to achieve the claimed removal rate of 8.3 tCO₂ per hectare per year?

As we explain below, this exercise raised more questions than answers. We’re calling on Lithos and Puro to share more information. Help us understand what we’re missing by augmenting the public record, or correct the calculations.

## The facts of the issuance

According to the [verification report](https://puro.earth/documents/content/GmA-e4rASteUvTUJP7GC7Qo2982?download=0) filed with Puro, the Lithos Mid-West Facility began applying basalt dust to agricultural fields in Wisconsin and Michigan in June 2024. The project applied 15,676.06 tonnes of basalt to 361.38 hectares, and claims it achieved 2,990.6 tCO₂ of gross carbon removal over a one-year monitoring period ([Table 8](https://puro.earth/documents/content/GmA-e4rASteUvTUJP7GC7Qo2982?download=0)). After subtracting lifecycle emissions and downstream losses to calculate net carbon removal, that resulted in an issuance of 2,362 credits for the first year of operation and monitoring.

This works out to an application rate of 43.4 tonnes of basalt per hectare, and a claimed gross removal rate of 8.3 tCO₂ per hectare per year — the number we focus on here.

## Probing the claimed gross removal rate

Lithos hasn’t disclosed the monitoring data or modeling assumptions needed to fully replicate its gross removal claim of 8.3 tCO₂ per hectare per year. But we can try to make some informed guesses about the missing information, and use them to ask what would have to be true about the physical system to achieve this amount of gross removal. You can find our analysis [here](https://github.com/carbonplan/lithos-issuance).

We approached this by thinking about two physical “speed limits” on what’s achievable in an ERW system. First, how quickly basalt weathers and, second, how the resulting carbon and alkalinity is exported from the soil. In both cases, we have just enough information for some back-of-the-envelope calculations. And, in both cases, we had to invoke some unrealistic assumptions about physical processes to reproduce the claimed carbon removal flux.

### 01 — Weathering rates

To achieve the claimed gross removal rate, we looked at how much rock dust needs to weather and the surface area the dust would need to have to weather fast enough. These are two subtly different questions. Weathering rates are usually expressed as the amount of rock that dissolves per surface area per time. Since more surface area typically makes a given mass of rock weather faster, you could weather the same amount of rock with either a slower rate and a lot of surface area or a higher rate and less surface area.

First, reaching the claimed carbon removal flux appears to require an exceptionally high fraction of the applied rock to weather within a single year. We know Lithos spread ground basalt, but we don’t know the basalt’s composition. The composition matters here because it sets the upper bound on how many tonnes of CO₂ could potentially be removed for each tonne of dissolved rock. If we assume the basalt could remove 0.3 tCO₂ per tonne of rock, consistent with literature estimates and the project’s claimed removal potential per hectare ([Table A1](https://puro.earth/documents/content/FL9msA_5QsKmBgZH5SffHAo2984?download=0)) divided by our calculated application rate, we estimate that about 64 percent of applied rock would need to have weathered within the first year of deployment to achieve 8.3 tCO₂ gross removal per hectare.

Even for very fast weathering rates, we find that weathering 64 percent of the feedstock would require an unusually high rock surface area. The project description indicates that 90 percent of the applied rock grains have a diameter smaller than 990 _μm_ ([Table 3.1](https://puro.earth/documents/content/FL9msA_5QsKmBgZH5SffHAo2984?download=0)). For a given weathering rate, we can then solve for the “roughness factor” — how much extra surface area is required to achieve the claimed removal rate compared to a sphere of the same diameter (Figure 1). Roughness factors for fresh mineral surfaces are generally less than 10, meaning their surface area is less than 10 times higher than that of an equivalent sphere (e.g., [Anbeek, 1992](<https://doi.org/10.1016/0016-7037(92)90216-6>); [White and Peterson, 1990](https://doi.org/10.1021/bk-1990-0416.ch035); [White et al., 2003](https://doi.org/10.1016/j.chemgeo.2003.03.001); [Rimstidt et al., 2012](https://doi.org/10.1016/j.gca.2012.09.019); “expected range” in Figure 1). We estimate that Lithos’ basalt would need a roughness factor of ~100-100,000 to achieve gross removals of 8.3 tCO₂ per hectare per year. For those who think in terms of specific surface area, that equates to about ~2-200 m² per gram (see our [notebook](https://github.com/carbonplan/lithos-issuance/blob/main/surface-area.ipynb)). In either context, these values are 1-4 orders of magnitude higher than we would expect for fresh, unweathered mineral surfaces.

<Figure>
  <Roughness />
  <FigureCaption number={1}>
    Roughness factors required to achieve a gross removal rate of 8.3 tCO₂ per
    hectare per year for a range of dissolution rates. These estimates are
    conservative (erring toward low roughness factors) because they assume
    constant dissolution with waters far from equilibrium with the rock. They
    also assume that the total rock surface area stays constant with time
    (despite 64 percent of the rock dissolving) and that carbon is removed with
    perfect efficiency. Lines show three different grain sizes — Lithos reports
    that 90 percent of their grains have diameters smaller than 990 _μm_.
    Dissolution rate ranges at the top of the figure include an estimate for
    basalts ([Strefler et al., 2018](https://doi.org/10.1088/1748-9326/aaa9c4))
    and some of the fastest reacting minerals in a basalt ([Oelkers et al.,
    2018](https://doi.org/10.1016/j.chemgeo.2018.10.008); [Renforth et al.,
    2015](https://doi.org/10.1016/j.apgeochem.2015.05.016)).
  </FigureCaption>
</Figure>

### 02 — Carbon export from the soil

Weathering products have to be exported from the soil system via porewater drainage. Achieving 8.3 tCO₂ gross removal per hectare per year indicates soil porewater would need to export an exceptionally high quantity of carbon and alkalinity.

The key variable determining just how much carbon and alkalinity the porewater must hold is how fast the water is moving through the soil. With more water moving through the soil (faster infiltration) the water itself doesn’t need to carry as much carbon and alkalinity, but with slower infiltration, the water needs to carry much more to achieve the same amount of export. We don’t have Lithos’ site-specific infiltration data, but meteorological data and irrigation estimates indicate it’s likely below 500 mm per year ([Kanamitsu et al., 2002](https://doi.org/10.1175/BAMS-83-11-1631); [Kim & Jackson, 2012](https://doi.org/10.2136/vzj2011.0021RA)). Within that range of infiltration, removing 8.3 tCO₂ per hectare per year would require extremely high concentrations of dissolved inorganic carbon — ~30-120 mM. This range is at least 5 times higher than what we’d expect for more concentrated agricultural runoff (1-6 mM; e.g., [Hamilton et al., 2007](https://doi.org/10.1029/2006GB002738)), and even exceeds the high concentrations observed in some subsurface geologic carbon storage (GCS) sites (7-30mM; e.g., [Oelkers et al., 2026](https://doi.org/10.1038/s41586-026-10130-5)).

<Figure>
  <Alkalinity />
  <FigureCaption number={2}>
    Porewater dissolved inorganic carbon (DIC) concentrations required to remove
    8.3 tCO₂ per hectare per year. For reference, ranges are shown for DIC
    concentrations associated with geologic carbon storage (GCS) sites ([Oelkers
    et al., 2026](https://doi.org/10.1038/s41586-026-10130-5)), and the expected
    range, based on runoff from fields treated with crushed carbonate rock
    (i.e., “limed” fields; [Hamilton et al.,
    2007](https://doi.org/10.1029/2006GB002738)). Across a range of infiltration
    rates, required DIC concentrations are ~5-30 times higher than the expected
    range.
  </FigureCaption>
</Figure>

Reaching such high rates of carbon export is further complicated by another bottleneck in the soil — the surface proton reservoir. Before alkalinity generated by weathering can be exported from the soil and contribute to carbon removal, it must first overcome pH-dependent buffering reactions that consume alkalinity and release protons from mineral and organic surfaces. Think of it as a debt that has to be paid before carbon removal can occur — and in the Midwest, that debt can be substantial. One recent study found that, in Wisconsin, these buffering reactions can negate nearly all potential carbon removal in the first few years of a deployment ([Kanzaki et al., 2025](https://doi.org/10.1088/1748-9326/ade0d5)), making Lithos’ year-one claims all the more surprising.

## What we’re asking for

This exercise left us with more questions than we started with. Removing 8.3 tCO₂ per hectare per year appears to require rock surface areas and porewater DIC concentrations that are unreasonably high, given what public evidence indicates is possible. But our calculations are ultimately limited by the available data. It’s possible we’re missing something that the privately held data could clear up — a methodological choice, a site-specific factor, or modeling assumptions that change the picture.

Either way, it’s clear there is something the ERW community needs to learn here. For years, the [dominant narrative](https://cascadeclimate.org/blog/foundations-for-carbon-removal-quantification-in-erw-deployments) has been that early deployments would generate data to reduce scientific uncertainty — but that promise depends on deployments being transparent enough to learn from. A claimed removal rate three times higher than comparable published work, without sufficient documentation to evaluate it, is precisely the kind of result that undermines the learning promise and erodes trust in ERW as a carbon removal pathway.

Ideally, all data underpinning carbon removal claims in nascent fields like ERW would be publicly available ([Reinhard & Planavsky, 2026](https://doi.org/10.1038/s44168-025-00324-4)). That’s not the norm in ERW, and it may never be. But a useful first step would be for Lithos and Puro to at least make public the data needed to constrain the carbon removal potential — meteorology, feedstock characterization, and initial soil and porewater measurements. It’s a small step, and it won’t answer every question. But it would help the field calibrate expectations and process surprising claims.

If the data supports the 8.3 tCO₂ per hectare per year claim, we want to understand why — and that understanding belongs in the public record. If it doesn’t, this is a case of overissuance that should be corrected.
