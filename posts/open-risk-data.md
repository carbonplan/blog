---
version: 1.0.0
title: Climate change happens in public. Risk assessments should, too.
authors:
  - Oriana Chegwidden
date: 09-05-2023
summary: Announcing the release of a new extreme heat dataset, and reflecting on why it’s important to do this kind of work in the open.
card: open-risk-data
---

Searches on Google for the term “heatwave” fluctuate throughout the year, typically peaking in July and bottoming out in December. But for the past two decades searches have been steadily rising — even in the winter. Now, more people seek information about extreme heat when it’s cold than they did when it was hot 20 years ago. It’s hard to imagine this trend is unrelated to climate change. And I think it demonstrates that one of the ways people are responding to climate risks is by trying to learn more about them.

What happens, though, if that information isn’t accessible? Right now, it's common that only corporations have easy access to risk assessment data. If you can get your hands on the data yourself, you likely need years of training to interpret it. And, if you don’t call yourself a climate expert, regardless of whether you’re an everyday person or a massive corporation, you’ll likely have trouble trusting those numbers.

Fully public climate data is one potential antidote. As a recent example, a [government website launched last year](https://www.heat.gov/pages/tools-information) to consolidate several different publicly-supported tools on the dangers of extreme heat. This kind of information about climate change helps people adapt, allowing them to do things like advocate for investment in neighborhood cooling centers, plan for installation of air conditioning, or take [action to mitigate urban heat](https://www.epa.gov/heatislands/heat-island-community-actions-database). People need to be able to access and interpret climate change information. And they need to be able to trust it.

Unfortunately, climate analytics are [increasingly done in private](https://prospect.org/economy/2023-04-12-rise-climate-rating-agencies/). Although most foundational climate datasets still come from academic and government labs, a nascent industry is forming of private climate analytics companies that develop and sell climate data to corporations and municipalities. The latter is rarely open, as the profit incentive is to keep methods secret inside a “black box.”

Currently, there is a [dearth of robust systems](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4396826) for ensuring the availability, accessibility, and quality of climate data. In our own work, we have documented the [importance of climate data in financial risk assessments](https://carbonplan.org/research/data-financial-risk), as well as [how complicated](https://carbonplan.org/research/climate-risk-assessments) the risk assessment process can be. And we previously developed a [climate downscaling dataset](https://carbonplan.org/research/cmip6-downscaling-explainer) with fully public methods and code, which we built to provide a foundation for future efforts by us and others.

Now, we’re releasing a new dataset estimating extreme heat, using downscaled, high-resolution climate data, developed as part of a [collaborative project with _The Washington Post_](TK). Our dataset describes trends in extreme heat historically, and then projects those trends into the future through 2060. Building on the work of others, our modeling approach captures how humidity and sunlight make heat even more dangerous. And, compared to many other global studies, we were able to better capture “[urban heat islands](https://www.epa.gov/heatislands)," the process by which human activity and infrastructure traps heat in cities. A [story released today by _The Post_](TK) explores what this data tells us about extreme heat impacts in Pakistan.

We have tried to make all aspects of our modeling [open](https://github.com/carbonplan/extreme-heat): the code, the input datasets, and the results. All of the strengths, assumptions, and approximations are available for public scrutiny. Working in the open helps ensure that the results are vetted as thoroughly as possible, and that anyone can access them.

So far, some of the private companies that provide climate analytics do adopt the [language](https://www.jupiterintel.com/products) of [transparency](https://firststreet.org/mission/), but to our awareness none of them has yet open-sourced the code underlying their approach.
I hope that our work might set a better example for doing climate analytics in the open. As a scientist, I’m excited by the idea of others reading the code and experimenting with improvements. And as a person increasingly concerned about climate change, I’m glad this dataset can now be in the hands of as many people as possible.
