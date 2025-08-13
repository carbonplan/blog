---
version: 1.0.0
title: Building CDRXIV in the open
authors:
  - Kata Martin
  - name: Andy Byers
    src: https://images.carbonplan.org/authors/andy-byers.png
  - Shane Loeffler
  - Anderson Banihirwe
date: 08-13-2025
summary: How we built our platform for research in carbon dioxide removal using open source tools.
---

[Earlier this year](https://carbonplan.org/blog/cdrxiv-launch-announcement), we launched [CDRXIV](https://cdrxiv.org/) (pronounced “see-dee-archive”), a preprint server and data repository for research on carbon dioxide removal (CDR). It’s designed to be a central place for academic and non-academic researchers to share work across the many fields that span CDR. When it came to building the CDRXIV website, we were also guided by our commitment to open science and the practical benefits of building on top of open source tools.

We are a small team of developers, and we knew from the start that we would need to maintain CDRXIV alongside supporting ongoing research at CarbonPlan. In early conversations with maintainers of other preprint servers, [Janeway](https://janeway.systems/) quickly emerged as an appealing technical partner. Janeway is an open source scholarly publishing platform that powers preprint servers and academic journals, including ones we had used ourselves, such as [EarthArXiv](https://eartharxiv.org/). The platform’s maturity, configurability, and [open source development model](https://github.com/openlibhums/janeway) convinced us that relying on Janeway would both help us get CDRXIV off the ground more quickly, and continue to benefit CDRXIV during its maintenance.

We also wanted to make CDRXIV recognizable as a conventional, academic-style preprint server, while still establishing a distinctive look and feel. To create a new brand and design system, we enlisted the help of [The Office of Ordinary Things](https://ot.studio/), who we also worked with on the design of the CarbonPlan website. The final design for CDRXIV references the visual language of the early internet and pen-and-paper research. These nostalgic references align with the open-access and community-built nature of preprint servers, while creating room to incorporate design flair that distinguishes the brand.

Our design demanded custom front-end development, which was not a use case that Janeway had previously supported. Luckily, as we were getting started, Janeway was developing a REST API to support another institution’s need for programmatic access to their preprint server and journal. The Janeway API allowed us to fully control and customize the end-user experience, while leaning on Janeway’s foundational models, platform management system, screening process tools, and end-to-end hosting capabilities. This paradigm also gave us the flexibility to use the front-end tools we typically use in our other work, such as `React`, `Next.js`, and `theme-ui`, and allowed us to seamlessly incorporate [Zenodo’s REST API](https://developers.zenodo.org/) as an additional service to support data-hosting.

We worked closely with Janeway to figure out a couple of key details to make their API access pattern work end-to-end, including new endpoints for registration, authentication, and submission management. Because the code for both Janeway and CDRXIV are open source, these solutions can now be reused by other groups building a customized preprint server. We're delighted that the implementation of CDRXIV itself demonstrates the benefits of working in the open.

If you’re curious to learn more about our software, check out our [code on GitHub](https://github.com/cdrxiv/cdrxiv.org). Or if you’d like to get involved with the CDRXIV project, reach out at [hello@cdrxiv.org](mailto:hello@cdrxiv.org).
