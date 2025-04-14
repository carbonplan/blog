---
version: 1.0.0
title: New accounting rules blur the line between decarbonization and carbon dioxide removal
authors:
  - Tyler Kukla
  - Freya Chay
date: 04-15-2025
summary: Isometric’s new protocol for wastewater alkalinity enhancement risks counting decarbonization as carbon dioxide removal. The rules could reshape how carbon removal is defined in other pathways, as well.
components:
  - name: AccountingGraph
    src: ./accounting-graph.js
---

Carbon removal registry, Isometric, recently published a new [protocol](https://registry.isometric.com/protocol/wastewater-alkalinity-enhancement/) for carbon dioxide removal (CDR) crediting via wastewater alkalinity enhancement. Their protocol tries to navigate a tricky carbon accounting problem: if a project achieves some mix of decarbonization and carbon removal, what portion of these climate benefits should be eligible to earn removal credits?

Isometric’s answer surprised us. Their new protocol effectively creates a path to earning removal credits for activities that decarbonize a pre-existing removal pathway. Instead of requiring projects to increase the amount of carbon removed relative to the counterfactual, this protocol would allow some projects to earn CDR credits solely by reducing emissions. This outcome exists because, in certain circumstances, the project is allowed to ignore the counterfactual scenario entirely. As far as we know, this is the first CDR protocol that explicitly allows removal crediting for activities that do _not_ increase the gross carbon removal flux above the counterfactual.

As we’ve written about [previously](https://carbonplan.org/research/cdr-counterfactual-accounting), labeling decarbonization benefits as CDR undercuts the prevailing market assumption that avoided emissions and carbon removal are distinct credit types. For now, Isometric’s new protocol only applies to a sliver of the overall market. But if this precedent was adopted more broadly, it could have implications far beyond wastewater alkalinity enhancement.

## Why the counterfactual matters

Wastewater alkalinity enhancement projects seek CDR credits by dosing water with alkalinity before it’s discharged from a treatment facility, increasing the amount of CO₂ the wastewater can store. To understand how Isometric’s accounting rules would work, consider a hypothetical project where adding alkalinity results in 10 tCO₂ of storage, but emits five tCO₂ in the production, transportation, and application of the alkalinity (Figure 1, purple bars).

At first glance, this project appears to deliver five tCO₂ of net carbon removal. But that’s only true if we ignore the counterfactual — what would happen without the project intervention. Many wastewater treatment plants already use alkalinity as part of their normal operations. To separate removals from avoided emissions, we have to compare the alkalinity treatment of the project to that of the counterfactual.

Let’s imagine that, in the counterfactual scenario, the plant would apply the _same_ amount of alkalinity as the project and achieve the _same_ amount of gross carbon storage — 10 tCO₂. But the counterfactual would have involved using a more emissions-intensive type of alkalinity, resulting in 20 tCO₂ of emissions to produce, transport, and apply it, making it net emitting (Figure 1, gray bars). In other words, the climate benefit achieved by the project comes from decreasing the alkalinity’s embodied emissions — not by increasing the gross carbon removal flux.

<Figure>
  <AccountingGraph />
  <FigureCaption number={1}>
    Emissions and removals for a hypothetical counterfactual scenario (gray
    bars) and wastewater alkalinity enhancement project (purple bars). The
    climate benefit comes from decreasing emissions — the removal flux does not
    change. But the project could still be eligible for removal credits under
    Isometric’s new protocol.
  </FigureCaption>
</Figure>

But our reading of Isometric’s new protocol suggests this hypothetical project would earn five removal credits, because it could ignore the counterfactual. According to [section 8.3](https://registry.isometric.com/protocol/wastewater-alkalinity-enhancement#calculation-of-coe) of the protocol, counterfactual removals can be excluded from the calculation of net CDR if the counterfactual practice is net emitting.

Isometric’s protocol does [require](https://registry.isometric.com/protocol/wastewater-alkalinity-enhancement#net-cdr-calculation) consideration of the counterfactual — but only in cases where that counterfactual is already net removing or close to it. If that was true in our hypothetical, then the project would not be eligible for carbon removal credits. This bifurcated ruleset introduces a potential non-linearity that could lead to inconsistent crediting outcomes. A marginal increase in counterfactual emissions could lead to a disproportionately large increase in the number of credits awarded if it enables the project to ignore counterfactual removals.

In other words, Isometric’s protocol separates removals and avoided emissions in some cases, but not in others. As we explained in our [previous piece](https://carbonplan.org/research/cdr-counterfactual-accounting), any accounting approach aiming to separate removals and avoided emissions must consider counterfactual removals. By only doing this conditionally, Isometric’s protocol makes it possible for certain decarbonization activities to be credited as carbon removal.

## Uncertain implications

Drawing sharp boundaries around what “counts” as CDR [remains challenging](https://carbonplan.org/research/defining-good-cdr), and crediting protocols are, by nature, full of judgement calls. However, we think it’s important to clarify how Isometric’s rules blur the line between carbon removal and avoided emission credits.

Notably, the new rules conflict with established ways of defining and understanding CDR. Isometric’s own enhanced weathering protocol ([v1.1](https://registry.isometric.com/protocol/enhanced-weathering-agriculture/1.1)), for example, handles the same accounting question differently. In those rules, enhanced rock weathering projects must always account for counterfactual removals, even if the counterfactual practice is net emitting. If that protocol were to adopt the new set of rules, enhanced weathering projects could earn removal credits for decarbonizing the process of sourcing, grinding, and transporting rock that is already applied to agricultural fields — a substantial shift from how enhanced weathering credits are understood today. The rules could also apply to projects that decarbonize other processes that include removal fluxes, such as the production of cement and certain mining and industrial wastes.

Unpacking the full implications of these rules is challenging as some aspects of the protocol remain vague. For example, the threshold for ignoring counterfactual removals is not defined. The protocol [indicates](https://registry.isometric.com/protocol/wastewater-alkalinity-enhancement#calculation-of-coe) that this rule kicks in when counterfactual emissions are “significantly greater” than the counterfactual removal potential. But that the exact threshold will be decided “on a case-by-case basis in consultation with Isometric.” This makes it hard to predict what effects the precedent set by Isometric’s new protocol will have — within wastewater alkalinity enhancement or beyond.

In short, Isometric’s rules may apply narrowly (and with some uncertainty) for now, but we think the reasoning behind them could open the door for an entire class of decarbonizing activities to be eligible for removal crediting. That may be a good outcome if you think the goal of CDR funding is primarily to support projects that are good for the climate today. But if you think CDR credits should identify and reward projects that are establishing or enhancing new carbon removal fluxes, it raises some big questions around the market’s direction of travel.
