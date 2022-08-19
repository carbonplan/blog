import dynamic from 'next/dynamic'

// NOTE: This is a dynamically generated file based on the config specified under the
//       `components` key in each post's frontmatter.
const components = {
  'physical-risk-workshop': {},
  'scipy-conference-2022': {},
  'sec-offset-disclosure': {},
  'offsets-fires-update': {
    CreditingTable: dynamic(() =>
      import('../../posts/offsets-fires-update/crediting-table.js').then(
        (mod) => mod.CreditingTable || mod.default
      )
    ),
  },
  'seaweed-farming-clarifications': {},
  'ton-year-verra': {},
  'occ-risk-comment': {},
  'open-lidar-biomass': {
    Chart: dynamic(() =>
      import('../../posts/open-lidar-biomass/figure.js').then(
        (mod) => mod.Chart || mod.default
      )
    ),
  },
  'compliance-users-release': {},
  'stripe-2021-additions': {},
  'usda-csaf-comment': {},
  'fsoc-open-data': {},
  'soil-protocols-added': {
    RecommendationTable: dynamic(() =>
      import('../../posts/soil-protocols-added/recommendation-table.js').then(
        (mod) => mod.RecommendationTable || mod.default
      )
    ),
    ScoreSummary: dynamic(() =>
      import('../../posts/soil-protocols-added/score-summary.js').then(
        (mod) => mod.ScoreSummary || mod.default
      )
    ),
  },
  'maps-library-release': {
    MapDemo2d: dynamic(() =>
      import('../../posts/maps-library-release/maps-demo-2d.js').then(
        (mod) => mod.MapDemo2d || mod.default
      )
    ),
    MapDemo4d: dynamic(() =>
      import('../../posts/maps-library-release/maps-demo-4d.js').then(
        (mod) => mod.MapDemo4d || mod.default
      )
    ),
  },
  'climate-trace-release': {
    Map: dynamic(() =>
      import('../../posts/climate-trace-release/figure.js').then(
        (mod) => mod.Map || mod.default
      )
    ),
  },
  'first-post-welcome': {},
}

export default components
