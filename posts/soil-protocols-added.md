import { Box } from 'theme-ui'
import { Link } from '@carbonplan/components'
import RecommendationTable from './soil-protocols-added/recommendation-table'
import ScoreSummary from './soil-protocols-added/score-summary'
import FigureCaption from '../components/figure-caption'

export const meta = {
  version: '1.0.0',
  title: 'Additions to our analysis of soil carbon protocols',
  authors: ['Freya Chay', 'Danny Cullenward'],
  date: '10-13-2021',
  summary:
    'We analyzed three new soil carbon protocols and added them our interactive database',
  card: 'soil-protocols-added',
}

In July 2021, we published an [analysis](https://carbonplan.org/research/soil-protocols-explainer) of 14 protocols that certify or issue credits for soil carbon removal. Our systematic review of the protocols was also published as an [interactive database](https://carbonplan.org/research/soil-protocols), which we are updating now with the release of this short blog post.

We originally analyzed publicly available protocols that generate credits for the voluntary carbon market. In response to public feedback, we are expanding this database to include three additional protocols that were designed by governments – two protocols from Australia and one from Alberta, Canada – but whose credits can also be used by voluntary actors.

This blog post summarizes our findings from reviewing the three additional protocols. We applied the same four metrics applied in our initial analysis: rigor, additionality, durability, and safeguards. We recommend reading [this article](https://carbonplan.org/research/soil-protocols-explainer) for more details regarding the four metrics and our methods.

## Australia measurement protocol

The most recent [Australia measurement protocol](https://www.legislation.gov.au/Details/F2018L00089) was published in 2018, and has been used by [over 100 projects](http://www.cleanenergyregulator.gov.au/ERF/project-and-contracts-registers/project-register) to date. It is is currently [under review](http://www.cleanenergyregulator.gov.au/ERF/Pages/Method%20development%20tracker/Soil-carbon.aspx) and revisions to the protocol are possible by the end of 2021. We analyzed this protocol as published, without taking into account possible changes as a result of the public review process.

### Rigor

This protocol features empirical crediting based on robust soil sampling requirements and receives our highest possible rigor score. Only 3 of 14 protocols in our initial analysis (BCarbon, FAO and Verra Soil) featured similarly rigorous sampling and quantification methodologies.

### Additionality

This protocol received a middle ground score for additionality. The singular additionality screen implemented in this protocol is a “newness” requirement that aims to ensure a new management activity is adopted after a project is declared eligible to generate credits. If a buyer wants confidence that their purchase creates climate benefits that would not have happened otherwise, the newness requirement is one piece of the puzzle — it requires a new action to be taken and sidesteps the challenges associated with activity backdating. However, a newness requirement does not screen out practices that are widely adopted or would have been implemented without additional support. (Although an exclusive focus on newness can’t reliably ensure additionality, many of the protocols we reviewed have even weaker standards — and several have none at all.)

### Durability

This protocol also received a middle ground score for durability. Projects credited under this protocol may choose either a 25- or 100-year permanence obligation. In either case, a flat 5% discount is applied to account for a generic risk of reversal. If a project chooses a 25-year permanence obligation, an additional 20% discount is applied. While this discount gestures toward the [distinct challenges](https://carbonplan.org/research/permanence-calculator) of temporary carbon removal, it does not specifically address permanence risks, including the possibility that temporarily stored carbon could be reversed entirely after the project crediting period ends.

### Safeguards

This protocol received a high score for safeguards. Applicable Australian laws provide for landowner protections and data privacy.

## Australia estimation protocol

The [Australia estimation protocol](https://www.legislation.gov.au/Details/F2018C00126) was published in 2015, but has [not been used](http://www.cleanenergyregulator.gov.au/ERF/project-and-contracts-registers/project-register) since. We included it here because it serves as an important contrast with the Australia protocol that is in wide use and which earned a significantly higher score in our review.

This protocol shares durability and safeguard characteristics with the Australia measurement protocol reviewed above, but differs significantly in its quantification rigor and additionality metrics.

### Rigor

Under this protocol, projects estimate changes to soil carbon using regional default values which are associated with each eligible project activity. Crediting is based on multiplying default values by the duration of the project. Projects are not required to perform soil sampling at any point. Accordingly, this protocol received the lowest possible score for rigor.

### Additionality

This protocol uses the same “newness” requirement to establish additionality as the Australia measurement protocol described above. Although we gave the measurement protocol a score of 2/3, we assigned a score of 1/3 here because no site-specific modeling or analysis is required. Instead, this protocol uses default parameters to calculate carbon savings, which provides a strong incentive to developers to preferentially select profitable locations for development — potentially resulting in the exact same kind of adverse selection outcomes we documented in [California’s forest offsets program](https://carbonplan.org/research/forest-offsets-explainer). As a result, the potential benefits of a “newness” screen are outweighed by its shortcomings in the context of a protocol without rigorous, project-specific analysis.

## Alberta protocol

The [Alberta Quantification Protocol for Conservation Cropping](https://open.alberta.ca/dataset/b99725e1-5d2a-4427-baa8-14b9ec6c6a24/resource/db11dd55-ce34-4472-9b8b-cb3b30214803/download/6744004-2012-quantification-protocol-conservation-cropping-april-2012-version-1.0-2012-04-02.pdf) was published in 2012, replacing a [predecessor](https://open.alberta.ca/publications/specified-gas-emitters-regulation-quantification-protocol-for-tillage-system-management-version-1-3) that operated from 2002-2012. It has been used by [47 projects](https://alberta.csaregistries.ca/GHGR_Listing/AEOR_Listing.aspx), but was [withdrawn](https://www.alberta.ca/assets/documents/aeos-memo-withdrawal-quantification-protocol-conservation-cropping.pdf) in 2020. Existing projects may be credited through the end of 2021, but no new projects may be developed under it.

### Rigor

This protocol received a low score for rigor. Projects estimate changes to soil carbon using regional default factors, and are not required to perform soil sampling at any point.

### Additionality

This protocol also received a low score for additionality. No additionality screens are applied at the project level. Instead, the protocol’s eligible activity — in this case, no-till agriculture — is deemed additional on the basis of having less than a 40% adoption rate. Furthermore, if the protocol’s activity does not satisfy this generous performance test, the protocol may also justify its activity’s additionality via a barriers analysis. In our view, the high adoption threshold and loosely-defined barriers analysis applied at the protocol-level do not provide meaningful additionality protections. The Government of Alberta recently [determined](https://www.alberta.ca/assets/documents/aeos-memo-withdrawal-quantification-protocol-conservation-cropping.pdf) that this protocol no longer met additionality standards and withdrew it from operation in 2020.

### Durability

This protocol also received a low score for durability. The protocol applies a crediting discount based on observed, regional rates of reversal. The credits issued are claimed to represent permanent climate benefits. If a project experiences a reversal, the insurance mechanism is to exclude the affected fields from crediting for the affected year(s). Beyond the crediting period, there is no insurance mechanism to back up the claim that all issued credits are permanent.

### Safeguards

This protocol received a high score for safeguards. The Government of Alberta is subject to various general privacy protections that also apply in this context.

## Conclusions

Combining the new analysis with our results from before, we can look at all the protocols we have analyzed together.

<ScoreSummary />
<FigureCaption>
  Summary table of our results. Each protocol is a row. The{' '}
  <Box as='span' sx={{ color: 'orange' }}>
    *
  </Box>{' '}
  indicates new additions. The first four columns show scores along four
  individual metrics (each on a scale from 1 to 3) and the final column shows
  the overall rating (on a scale from 1 to 5). For more details, check out the{' '}
  <Link
    href='/research/soil-protocols'
    sx={{ color: 'secondary', '&:hover': { color: 'primary' } }}
  >
    interactive version
  </Link>{' '}
  of this table. Abbreviations: Grazing (G), Compost (C), Cropping (Cr),
  Improved Agriculture (IA), Sustainable Agriculture (SA), Fire + Grazing (FG),
  Austrailia (Aus), Alberta (Alb)
</FigureCaption>

With the addition of these three protocols, our recommendations to buyers remain the same:

<RecommendationTable />

The only amendment to these recommendations is the addition of the Australia measurement protocol to the list of rigorous, sampling-based quantification methods. This protocol received the highest overall ranking of any protocol we reviewed.

The three protocols reviewed here — as well as the majority of protocols reviewed in our initial analysis — were also included in the Environmental Defense Fund’s recent and thoughtful [report on Agricultural Soil Carbon Credits](https://www.edf.org/soilcarbon), which we encourage interested readers to explore.

Thanks to those who reached out to give us feedback on our initial review and express interest in the addition of these compliance protocols. We appreciate hearing what people are finding (or would find) useful, and as always, we welcome further feedback.
