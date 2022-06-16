import dynamic from 'next/dynamic'

// NOTE: This is a dynamically generated file based on the config specified under the
//       `components` key in each post's frontmatter.
const components = {
  'offsets-fires-update': {
    CreditingTable: dynamic(() =>
      import('../../posts/offsets-fires-update/crediting-table.js').then(
        (mod) => mod.CreditingTable || mod.default
      )
    ),
  },
  'seaweed-farming-clarifications': {},
  'scoping-plan-comments': {
    EmissionsTable: dynamic(() =>
      import('../../posts/scoping-plan-comments/emissions-table.js').then(
        (mod) => mod.EmissionsTable || mod.default
      )
    ),
    EmissionsTargets: dynamic(() =>
      import('../../posts/scoping-plan-comments/emissions-targets.js').then(
        (mod) => mod.EmissionsTargets || mod.default
      )
    ),
    EmissionsPlans: dynamic(() =>
      import('../../posts/scoping-plan-comments/emissions-plans.js').then(
        (mod) => mod.EmissionsPlans || mod.default
      )
    ),
    DifferenceTable: dynamic(() =>
      import('../../posts/scoping-plan-comments/difference-table.js').then(
        (mod) => mod.DifferenceTable || mod.default
      )
    ),
  },
  'ton-year-verra': {},
  'occ-risk-comment': {},
  'open-lidar-biomass': {
    Chart: dynamic(() =>
      import('../../posts/open-lidar-biomass/figure.js').then(
        (mod) => mod.Chart || mod.default
      )
    ),
  },
  'offset-disclosure-needs': {},
  'ton-year-ncx': {
    TableHundred: dynamic(() =>
      import('../../posts/ton-year-ncx/table-hundred.js').then(
        (mod) => mod.TableHundred || mod.default
      )
    ),
    TableThousand: dynamic(() =>
      import('../../posts/ton-year-ncx/table-thousand.js').then(
        (mod) => mod.TableThousand || mod.default
      )
    ),
  },
  'compliance-users-release': {},
  'stripe-2021-additions': {},
  'usda-csaf-comment': {},
  'fsoc-open-data': {},
  'climate-financial-risks': {},
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
