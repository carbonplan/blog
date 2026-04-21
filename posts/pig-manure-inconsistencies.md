---
version: 1.0.0
title: Offset project paperwork should be internally consistent. It’s not.
authors:
  - Grayson Badgley
  - Freya Chay
date: 04-21-2026
summary: Internal inconsistencies in offset project paperwork highlight the often lax standards of the carbon market.
components:
  - name: Reporting
    src: ./reporting.js
---

There are roughly a billion domesticated pigs in the world — [half of which live in China](https://ourworldindata.org/meat-production). And about 10 percent of China’s pigs — that’s roughly five percent of all the pigs in the world — play a role in the global carbon market. Recently, we’ve spent a lot of time looking at the paperwork associated with the carbon offset projects that generate offset credits by capturing methane from pig manure. But the more we looked, the more we found ourselves wondering: is any of this stuff real?

We dug into this paperwork as part of an analysis focused on Chinese pig manure offset projects. Our study asked a narrow question: do these projects properly account for the energy savings produced by burning methane captured from manure management practices? We found significant inconsistencies in how projects account for these savings, which indicate that nearly a third of the associated credits are likely non-additional — the emission reductions would have happened even without selling carbon offsets. If you want to learn more, we encourage you to give our [preprint](https://files.carbonplan.org/Pig-Manure-Additionality-Preprint-04-21-2026.pdf) a read. Along the way, we also found more basic inconsistencies _within_ project paperwork, raising serious questions about both the reliability of the data and the quality-control processes run by registries and third-party verifiers.

For example, one way offset projects establish their additionality involves what’s known as a financial additionality test: a prescribed set of rules used to show that offset revenue is necessary to make the greenhouse gas management activities financially viable. In the projects we looked at, there are two places in the paperwork where this financial need had to be demonstrated: (1) the cash flow data, where projects show that offset revenue pushes their internal rate of return over a benchmark threshold; and (2) the sensitivity analysis, where projects estimate how much the price of fertilizer would have to increase in order for their manure management activities to make economic sense without offset revenue. In theory, both methods should point to the same number — the extra money needed to justify the project. In practice, this was rarely the case (Figure 1).

Instead, we found a number of inconsistencies in the way some projects reported their additionality metrics. Projects with fully consistent paperwork should have matching outcomes for cash flow data and sensitivity analysis (Figure 1, dotted grey line), neatly forming a straight line when plotted. Small differences — say plus or minus 15 percent — would be fine and maybe even expected, perhaps due to rounding or small differences in some underlying assumption across the two tests. But we found differences of 30, 50 … even 100 percent. We cannot tell you _how_ this happened. But we can safely say it shouldn’t.

<Figure>
  <Reporting />
  <FigureCaption number={1}>
    We analyzed 74 pig manure projects developed in China. Projects (blue dots)
    should fall near the grey line, which would indicate a project reported its
    additionality metrics consistently in different parts of its paperwork.
    Instead, 63 percent of projects had internal inconsistencies in reported
    values of more than 15 percent.
  </FigureCaption>
</Figure>

We also found projects that simply reported different numbers for the same additionality test in different parts of their paperwork. For example, many projects report their cash flow information in two places: the project design document and an accompanying spreadsheet that can ostensibly be used to reproduce the design document’s calculations. In both documents, project cashflow data is reported as part of calculating an estimated internal rate of return (IRR). In some cases, the IRRs in both documents matched, but the underlying cash flow numbers did not. In other words, these projects reported the same outcome, supposedly from the same calculation, but apparently based on different input data. That means something is wrong in at least one of the documents — either with the data, the calculation, or both.

In theory, registries and third-party verifiers have implemented controls — audits, verifications, and the like — that ensure carbon credits reflect real-world outcomes. Catching basic inconsistencies within project paperwork should be the minimum bar for any verification process, but even that low bar isn’t being cleared. What’s more, these inconsistencies can’t be blamed on old projects with outdated quality controls. Most were developed after 2022, a fact which points to ongoing problems. Each individual inconsistency could be a simple clerical error. But when the majority of projects developed under a single protocol involve such errors, it raises concerns about how registries and third-party verifiers are doing their jobs. This conclusion is consistent with recent research showing that third-party verifiers — at least, the ones chosen and paid by the people they’re auditing — are [prone to producing results favorable to their employers’ interests](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5345783).

The solution here is probably more than just technical. Some registries are beginning to experiment with systems where the registry manages a structured data schema, projects submit raw data, and crediting calculations happen on the backend. That approach could make it easier to run automatic checks and catch these kinds of internal inconsistencies before credits are issued — but it doesn’t get at the deeper concern. After spending months poring over these documents, we’re still honestly not sure where the numbers come from. The kinds of inconsistencies on display here represent a risk that project paperwork isn’t reflecting reality. No amount of double-checking will help if the inputs aren’t trustworthy to begin with.
