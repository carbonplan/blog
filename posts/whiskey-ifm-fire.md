---
version: 1.0.0
title: Another forest offset project is burning — if you know where to look
authors:
  - Grayson Badgley
date: 07-17-2024
summary: 'The Shelly Fire in Northern California highlights two problems with the offsets market: carbon losses from wildfire and disclosure of project boundaries.'
card: whiskey-ifm-fire
---

Another large forest offset project is burning, marking the second project to burn in the 2024 wildfire season. Thanks to the sharp eyes of Zeke Lunder, who runs [The Lookout](https://the-lookout.org/) where he dispenses invaluable and timely analysis of wildfires across the American West, we know that the [Shelly Fire](https://app.watchduty.org/#/i/24191) is currently burning through the “Scott River Whiskey IFM [improved forest management] Project” ([ACR733](https://carbonplan.org/research/offsets-db/projects/ACR733)), a voluntary offset project located in Northern California. Zeke first mentioned the project’s intersection with the Shelly Fire over a week ago during his [July 7 livestream](https://youtu.be/szD6M2sQpwY?t=1245).

After tracking down the exact project mentioned by Zeke, I wanted to know how many acres of the project had burned. It’s a natural question that proved harder to answer than it should have been.

That’s because the Whiskey IFM project has not disclosed its official project boundaries in a machine readable format. Many offset projects do not provide their official boundaries, a practice we’ve [commented on before](https://carbonplan.org/blog/bigcoast-project-boundary). When developers choose to not publish boundary data, they impede third-party monitoring and overall market transparency.

This lack of transparency shows why people like Zeke are so important — and why they shouldn’t be. Zeke has the right combination of expertise and interest in the ownership and management of California’s forests. Without him, it’s hard to imagine how anyone — apart from the owner of Whiskey IFM — would have noticed this project burning. But we should not have to rely on the good fortune of a Zeke looking in the right place at the right time. That isn’t what robust market oversight looks like.

Frustrated, I decided to just make my own boundary data using the paperwork from the Whiskey IFM project. I started by “georeferencing” a PDF map of the project that was submitted to the American Carbon Registry. This process allowed me to assign each point within the otherwise geographically naive PDF map to a known latitude and longitude. Georeferencing meant I could then display and work with the map using digital mapping tools. From there, I simply traced the outline of the project and saved the resulting boundary. Now, I could figure out how much of the project had burned.

I calculate that over 6,000 acres of the Whiskey IFM project have burned, which is 34 percent of the project’s total area. At this point, we can really only talk about the amount of area burned. We need information about the severity of the fire before we can reliably estimate the carbon and credit losses from the fire. That said, the sheer extent of burned project area likely means that the American Carbon Registry buffer pool will need to compensate for carbon losses from the Shelly Fire. To my knowledge, this would be the first use of the program’s buffer pool to compensate for a wildfire burning a voluntary IFM project in its nearly 13 years of operation.

In the meantime, I’m already georeferencing and tracing the Scott River Shackleford IFM Project ([ACR732](https://carbonplan.org/research/offsets-db/projects/ACR732)), which abuts the Whiskey IFM project to the north and could burn if the Shelly Fire continues to grow. No machine readable geographic data is available for that project, either.
