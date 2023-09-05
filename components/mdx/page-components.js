import dynamic from 'next/dynamic'

// NOTE: This is a dynamically generated file based on the config specified under the
//       `components` key in each post's frontmatter.
const components = {
  'geochemical-cdr-measurements': {},
  'open-risk-data': {},
  'forest-offsets-firms': {},
  'buffer-update-two': {
    ReversalsTable: dynamic(() =>
      import('../../posts/buffer-update-two/reversals-table.js').then(
        (mod) => mod.ReversalsTable || mod.default
      )
    ),
  },
  'vcl-update-v2023.04.0': {
    VCLChart: dynamic(() =>
      import('../../posts/vcl-update-v2023.04.0/vcl-chart.js').then(
        (mod) => mod.VCLChart || mod.default
      )
    ),
    BeforeAfter: dynamic(() =>
      import('../../posts/vcl-update-v2023.04.0/before-after.js').then(
        (mod) => mod.BeforeAfter || mod.default
      )
    ),
  },
  'bootleg-fire-update': {},
  'forest-offsets-mismatch': {
    Table: dynamic(() =>
      import('@carbonplan/components').then((mod) => mod.Table || mod.default)
    ),
  },
  'compliance-users-update': {},
  'cdr-standards-call': {},
  'climate-risk-metadata': {},
  'lionshead-fire-update': {
    Scan: dynamic(() =>
      import('../../posts/lionshead-fire-update/scan.js').then(
        (mod) => mod.Scan || mod.default
      )
    ),
  },
  'climate-risks-insurance': {
    States: dynamic(() =>
      import('../../posts/climate-risks-insurance/states.js').then(
        (mod) => mod.States || mod.default
      )
    ),
    HatchedCircle: dynamic(() =>
      import('../../posts/climate-risks-insurance/hatched-circle.js').then(
        (mod) => mod.HatchedCircle || mod.default
      )
    ),
    BlueCircle: dynamic(() =>
      import('../../posts/climate-risks-insurance/blue-circle.js').then(
        (mod) => mod.BlueCircle || mod.default
      )
    ),
  },
  'enhanced-weathering-update': {
    BeforeAfter: dynamic(() =>
      import('../../posts/enhanced-weathering-update/before-after.js').then(
        (mod) => mod.BeforeAfter || mod.default
      )
    ),
  },
  'buffer-analysis-update': {
    ReversalsTable: dynamic(() =>
      import('../../posts/buffer-analysis-update/reversals-table.js').then(
        (mod) => mod.ReversalsTable || mod.default
      )
    ),
  },
  'cdr-database-archived': {},
  'klimadao-bct-response': {},
  'cloud-downscaling-pipelines': {
    PipelineDiagram: dynamic(() =>
      import(
        '../../posts/cloud-downscaling-pipelines/pipeline-diagram.js'
      ).then((mod) => mod.PipelineDiagram || mod.default)
    ),
    ArrayDiagram: dynamic(() =>
      import('../../posts/cloud-downscaling-pipelines/array-diagram.js').then(
        (mod) => mod.ArrayDiagram || mod.default
      )
    ),
  },
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
