---
version: 1.0.0
title: When carbon offsets and zombie forests collide
authors:
  - Grayson Badgley
date: 03-21-2023
summary: A new paper about declining habitat suitability for conifers in California's Sierra Nevada demonstrates the shaky scientific foundations of California's forest offsets program.
components:
  - name: Table
    src: '@carbonplan/components'
---

A few weeks ago, a group of researchers at Stanford University published a study about [the “zombie forests” of the Sierra Nevada](https://doi.org/10.1093/pnasnexus/pgad004), documenting how much of the region's low-elevation conifer forests are no longer in equilibrium with current and future climate conditions. Although the trees are still alive, they're mismatched with prevailing climate conditions and especially vulnerable to catastrophic disturbances, like wildfire and drought. Upon their all-but-inevitable demise, these forests will likely be replaced by entirely different ecosystems. It's a fascinating study, with a little something for everyone: global environmental change, creatures from the grave, ecological niche modeling, future climate projections, and even a century-old forest survey.

We wondered whether any of these zombie forests are enrolled in California's forest offsets program. Given that these forests are already "[cheating death](https://www.youtube.com/watch?v=aGoe9lULUvo)," using them to make offsetting claims intended to last 100 years would raise concerns. Helpfully, [the authors have released their data under a CC-BY-SA license](https://github.com/avephill/sierra-nevada-VCM), meaning we can easily determine the magnitude of the problem we might be looking at.

We identified at least four improved forest management projects ([CAR1381](https://thereserve2.apx.com/mymodule/reg/TabDocuments.asp?r=111&ad=Prpt&act=update&type=PRO&aProj=pub&tablename=doc&id1=1381), [CAR1382](https://thereserve2.apx.com/mymodule/reg/TabDocuments.asp?r=111&ad=Prpt&act=update&type=PRO&aProj=pub&tablename=doc&id1=1382), [CAR1384](https://thereserve2.apx.com/mymodule/reg/TabDocuments.asp?r=111&ad=Prpt&act=update&type=PRO&aProj=pub&tablename=doc&id1=1384), and [CAR1409](https://thereserve2.apx.com/mymodule/reg/TabDocuments.asp?r=111&ad=Prpt&act=update&type=PRO&aProj=pub&tablename=doc&id1=1409)) in parts of the Sierra Nevada where the researchers identified potential zombie forest conditions. All four projects are under development by Sierra Pacific Industries (SPI) and largely consist of conifers. If approved, the projects could receive over 2.6 million offset credits that would be eligible for use in California's cap-and-trade program.

When we look at projected conifer habitat suitability in the years 2080 to 2100, we find that a significant fraction of the acreage of all four projects is classified as either "mismatched" or "severely mismatched" with the historical climatological niche of conifer forests in the Sierra Nevada (Table 1). In the case of SPI's Mosquito 2019 project (CAR1384), nearly the entire project area (97.1 percent) is classified as zombie forest. For the remaining projects, between 18.5 and 82.7 percent of enrolled acres are projected to be unsuitable for conifer forests by 2100. It's worth noting that we're reporting future changes in habitat suitability assuming a fairly ambitious climate mitigation scenario, [SSP2-4.5](https://www.dkrz.de/en/communication/climate-simulations/cmip6-en/the-ssp-scenarios), which puts the estimates in Table 1 on the conservative end of the spectrum.
Since California's forest carbon offsets program requires that projects consider risks over the next 100 years, thinking about habitat suitability over this timescale is critical. Any losses from zombie forests over that period will need to be compensated for by [the program's already-strained buffer pool](https://doi.org/10.3389/ffgc.2022.930426).

<Figure>
  <Table
    columns={[4, 4]}
    start={[[1], [3]]}
    width={[
      [2, 2],
      [2, 2],
      [2, 2],
      [2, 2],
    ]}
    data={[
      [
        <Box
          key='Project'
          as='span'
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 'smallcaps',
            fontFamily: 'heading',
            fontSize: [2, 2, 2, 3],
          }}
        >
          Project
        </Box>,
        <Box
          key='Mismatch'
          as='span'
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 'smallcaps',
            fontFamily: 'heading',
            fontSize: [2, 2, 2, 3],
          }}
        >
          Percent Area Mismatched
        </Box>,
      ],
      [
        <>
          Mosquito 2019 <br />
          <Box as='span' sx={{ color: 'secondary' }}>
            CAR1384
          </Box>
        </>,
        '97.1%',
      ],
      [
        <>
          Cohasset 2019 <br />
          <Box as='span' sx={{ color: 'secondary' }}>
            CAR1382
          </Box>
        </>,
        '82.7%',
      ],
      [
        <>
          Martell
          <br />
          <Box as='span' sx={{ color: 'secondary' }}>
            CAR1409
          </Box>
        </>,
        '56.1%',
      ],
      [
        <>
          RBS 2019
          <br />
          <Box as='span' sx={{ color: 'secondary' }}>
            CAR1381
          </Box>
        </>,
        '18.5%',
      ],
    ]}
    index={false}
    sx={{ my: [5] }}
  />
  <TableCaption number={1}>
    Percent of project area classified as "Mismatched" or "Severely Mismatched"
    with the habitat needs of conifer forests. Vegetation climate mismatch makes
    forests more vulnerable to catastrophic disturbance, like wildfire and
    drought.
  </TableCaption>
</Figure>

There is one other project worth discussing — a compliance reforestation project named Camp Refo ([CAR1491](https://thereserve2.apx.com/mymodule/reg/TabDocuments.asp?r=111&ad=Prpt&act=update&type=PRO&aProj=pub&tablename=doc&id1=1491)), which is also owned by SPI and is being developed within the burn scar of the devastating 2018 Camp Fire. From initial project documentation, SPI reports that they're replanting "young early seral stage conifer forests," which are exactly the types of trees that are likely no longer suitable for the warming, low elevation parts of the Sierra Nevada. By the end of the century, nearly the entire project (96.1 percent) will be "severely mismatched" with the historical habitat of Sierra Nevada conifers. These are almost certainly not the types of forests to use as the basis for making robust carbon offsetting claims.

The pending enrollment of rapidly changing and uniquely vulnerable forests under California's forest offsets program is another example of the program underestimating the risks posed by climate change to long-term forest carbon storage. It's striking that homeowners in these same parts of the Sierra Nevada are losing their insurance policies, yet California's forest carbon buffer pool continues to underwrite risky, ecologically unstable, and fire-prone forest carbon projects. We highlighted this inconsistency in [a comment letter](https://files.carbonplan.org/CARB-Forest-Offsets-Workshop-Comment-Letter-12-15-2022.pdf) we submitted to CARB late last year. In that same letter, we called on CARB to impose a moratorium on new projects in high risk areas, like the Sierra Nevada foothills, until CARB has completed [its revision of how its forest offsets protocol calculates risk](https://caleprocure.ca.gov/event/3900/0000025740). This new research on zombie forests makes clear that failure to act immediately will only further weaken the environmental integrity of CARB's forest offsets program.

## Data & Methods

We've shared the underlying [data and code](https://github.com/carbonplan/forest-offsets-mismatch) that we used in writing this post.

Our methods come with two small caveats. First, all the projects discussed in this post are not yet finalized, meaning CARB has not officially issued them credits. That means we're working with potentially incomplete information that is subject to change. Normal project paperwork, like the initial offset project data report that lists things like species information and official project acreage, is not yet available. A more formal assessment will only be possible if these projects become fully recognized by CARB.

Second, we don't have access to CARB's [official project boundary data](https://webmaps.arb.ca.gov/ARBOCIssuanceMap/) for these projects. Instead, we inferred likely project boundaries from provisional data posted to the [Climate Action Reserve registry](https://thereserve2.apx.com/myModule/rpt/myrpt.asp?r=111). In the case of Martell (CAR1409), documents have the project covering 87,266 acres. From the available boundary data, we calculated the project area to be 75,823 acres. To account for this in our analysis, we assumed conifers would continue to have suitable habitat in the missing 11,000+ acres, an assumption that yields conservative estimates in Table 1. In cases where parts of a project boundary fell outside the region where VCM data were calculated, we made a similarly conservative assumption. When we did not have a formal estimate of future VCM, we assumed conifers would continue to have suitable habitat into the future.
