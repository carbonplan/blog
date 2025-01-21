---
version: 1.0.0
title: Who is using which offsets in California?
authors:
  - Freya Chay
  - Jeremy Freeman
  - Danny Cullenward
date: 01-05-2022
summary: A new tool for tracking the use of carbon offsets for compliance in California's cap-and-trade program.
---

In California’s cap-and-trade program, polluters can use offset credits to satisfy a portion of their compliance obligation. For accountability purposes, we think it’s important to be able to connect the dots between offset projects and the emissions they enable.

We’ve had a couple of chances to work with the [cap-and-trade program data](https://ww2.arb.ca.gov/our-work/programs/cap-and-trade-program/cap-and-trade-program-data) that characterizes offset use, primarily to support [investigative reporting](https://www.latimes.com/politics/story/2021-09-08/what-is-the-california-climate-credit-does-it-cut-pollution) on who has used credits from problematic offset projects. We expect these questions will continue to be of public interest, so we decided to better document our analytical process and build a [simple web tool](https://carbonplan.org/research/compliance-users) that makes answers easier to find.

Our analysis weaves together three public data sources published as excel spreadsheets by the California Air Resources Board (CARB). These data establish connections between offset projects, companies who use the offset credits to comply with cap-and-trade (whom we call compliance “users” throughout the tool), and emitting facilities associated with those companies. Our analysis builds a harmonized data structure that connects the contents of these tables, and our [web tool](https://carbonplan.org/research/compliance-users) lets you explore the data through a simple interface. You can search by an offset project, a compliance user, or facility, and in each case see the linked results.

Note that while both offset projects and emitting facilities can be linked to compliance users, the data from CARB does not allow them to be directly connected with each other. In other words, you can link a set of facilities to a set of offsets credits turned in by a compliance user for a particular period, but you cannot link specific offset credits to specific emitting facilities. That’s neither a limit of our approach nor of the public data, but rather a consequence of how the cap-and-trade program works — climate pollution liabilities come due at the compliance user level, so there’s a layer of indirection inherent in the underlying accounting.

Check out the [GitHub repository](https://github.com/carbonplan/compliance-users) for the code and data-processing scripts underlying the web tool, and feel free to reach out if you have any questions about how the tool works or how to use it!
