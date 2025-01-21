---
version: 1.0.0
title: To know if an offset project is burning, first you have to find it
authors:
  - Grayson Badgley
date: 10-02-2023
summary: Figuring out the location of an offset project shouldn't involve a scavenger hunt.
components:
  - name: Map
    src: ./map.js
  - name: Screenshot
    src: ./screenshot.js
  - name: BreakAll
    src: ./break-all.js
---

Wildfires across Canada have [burned millions of acres this year](https://en.wikipedia.org/wiki/2023_Canadian_wildfires). As the fire season started, I sat down to see if any Canadian forest offset projects were burning. Forests release carbon when they burn, which can undo the carbon storage promised by forest carbon offset projects. CarbonPlan has been [tracking US-based offset projects](https://carbonplan.org/research/forest-offsets-fires) threatened or destroyed by wildfires for several years now and I wanted to see if we could do the same for Canadian projects.

But it was nearly impossible to figure out if any of Canada's offset projects were on fire. That’s because the rules governing the global carbon market don't always require a project to divulge its exact borders. Often only the province or country is documented. In other words, no one knows the precise locations of all the world’s active offset projects, a startling reality that prevents systematic oversight of the growing voluntary carbon market.

One way to find out what’s on fire is to call up offset developers and ask. [That’s what reporters from Bloomberg did](https://www.bloomberg.com/news/articles/2023-06-26/canada-wildfire-season-burns-forest-set-aside-for-carbon-offsets) this spring to confirm that part of BigCoast, a forest offset project in British Columbia, was burning. In an ideal world, you shouldn't need to get someone on the phone to figure this out. And that made me curious – could I replicate what those reporters discovered using only publicly available data?

It seemed straightforward at first. BigCoast's project documentation includes a few static, PDF maps of the project area. Unfortunately, those turned out to be such low-resolution that it was all but impossible to compare them to fire data.

My next step was to visit [the official BigCoast project page at the Verra offset registry](https://registry.verra.org/app/projectDetail/VCS/3018), where there's a clearly labeled boundary file named `ProjectArea_BigCoast.kml`. But as soon as I loaded the data, it was clear I had a problem. Rather than delineating specific bits of forest protected by the project, the data indicated that BigCoast encompassed an area of over 50 million acres – nearly 20 percent of the total land area of British Columbia. The posted boundary even included large areas of the Pacific Ocean, a place that certainly doesn't have any forest protection going on. After digging deeper on the Internet, I convinced myself that this posted boundary data has nothing to do with the BigCoast project, but is instead the boundary of [the British Columbia Coastal Fire Centre](https://www2.gov.bc.ca/gov/content/safety/wildfire-status/about-bcws/fire-centres), a provincial administrative district used for managing wildfires.

<Figure>
  <Map />
  <FigureCaption number={1}>
    The uploaded boundary of the BigCoast offset project, provided by the Verra
    offset registry. The boundary's overlap with the Pacific ocean suggests the
    data does not depict the actual areas of forest protected by the project.
  </FigureCaption>
</Figure>

Back at the drawing board, I next found a document entitled <BreakAll>`VCS_Joint_Prjct_Description_Monitoring_Report_BigCoast.pdf`</BreakAll> that contained an appendix labeled “Project area polygon location.” I was hoping this appendix would be the jackpot. Instead, it turned out to be one the most baffling pieces of paperwork I've ever seen.

Rather than post machine-readable boundary data – an ESRI shapefile, KML, or GeoJSON – the project developer elected to provide more than 70,000 latitude/longitude coordinate pairs in table form, spread across 688 pages of a PDF. I can’t imagine a less user-friendly format. But, somewhat perversely, the sheer absurdity of the whole thing became a challenge – I felt [compelled](https://xkcd.com/356/) to figure out if I could make something sensible of it.

<Figure>
  <Screenshot />
  <FigureCaption number={2}>
    Screenshot of the first page of the “Project area polygon location”
    appendix. The appendix includes an additional 687 pages with data, which we
    used to infer the boundary of the BigCoast offset project.
  </FigureCaption>
</Figure>

Transforming the data into something useful required some experimentation. Coordinates alone aren't sufficient to recreate complex geometries. You also need to know how coordinates relate to each other. Typically, you’d lay out connected points in “rings,” starting with a single point and moving clockwise until you come back to where you started. This strategy allows you to draw even the most complicated shapes. But it gets trickier when the shape you're describing has more than one ring, because you also need to know where one ring ends and the next begins. Needless to say, these sorts of subtle details didn't come across in PDF format.

Ultimately, I appealed to brute force. Rather than treating each point as a coordinate, I just drew a 100x100 meter square around each point, an approach known as buffering. From there, you _just_ need to take the intersection of the tens of thousands of squares to create a single geometry.

If you squint and tilt your head, our reconstructed boundary looks sort of similar to the various, blurry static maps included in BigCoast's project documents. Our effort is at least more credible than the boundary uploaded to Verra. As further validation, our reconstruction has an area of 106,567 acres, which is remarkably close to 108,780 acres, the project's official acreage as listed in BigCoast's project documentation. And when I overlaid the inferred boundary against [ British Columbia's wildfire dataset](https://catalogue.data.gov.bc.ca/dataset/fire-perimeters-current), I calculated that about 276 acres – or 112 hectares – of the project burned in the [Cameron Bluffs Fire](https://wildfiresituation.nrs.gov.bc.ca/incidents?fireYear=2023&incidentNumber=V70600). That's pretty close to the “[a]bout 100 hectares” of burned forest the owner of the project told Bloomberg about. The time it took me to figure this out: upwards of 5 hours.

<Figure>
  <Map showZoom showInferred />
  <FigureCaption number={3}>
    Our reconstructed boundary of the BigCoast offset project (light green)
    overlaid against the much larger and inaccurate boundary data uploaded to
    the Verra offset registry (green). Toggle the `+` in the upper left of the
    figure to zoom in for more detail.
  </FigureCaption>
</Figure>

It shouldn’t be this way and it doesn’t have to be. Some offset protocols, like the Climate Action Reserve’s [Mexico Forest Protocol](https://www.climateactionreserve.org/how/protocols/ncs/mexico-forest/) already require projects to share machine-readable boundary data. California’s forest offset program [does the same](https://webmaps.arb.ca.gov/ARBOCIssuanceMap/). It's exactly these data that have allowed us to track [the](https://carbonplan.org/research/offset-project-fire) [many](https://www.frontiersin.org/articles/10.3389/ffgc.2022.930426/full) [wildfires](https://carbonplan.org/blog/buffer-update-two) that have burned projects enrolled in California's offset program. Figuring out if an offset project is burning – or doing [any other analysis](https://www.nature.com/articles/s43247-023-00984-2) that requires exact borders – shouldn't involve phone calls or sifting through PDFs. All offset registries, offset rating agencies, and offset quality initiatives, like the Integrity Council for the Voluntary Carbon Market, should explicitly require that projects disclose analysis-ready boundary data. If these offset programs are operating as intended, there shouldn't be anything to hide.

In the meantime, we've [open sourced](https://github.com/carbonplan/bigcoast-project-boundary) our version of the BigCoast project boundary and the code we used to generate it. We'd love to hear from other folks who have struggled working with offset project boundary data – drop us a line at [hello@carbonplan.org](mailto:hello@carbonplan.org).
