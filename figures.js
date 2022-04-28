import dynamic from 'next/dynamic'

const figures = {
  'climate-trace-release': {
    Map: dynamic(() => import('./posts/climate-trace-release/figure')),
  },
  'open-lidar-biomass': {
    Chart: dynamic(() => import('./posts/open-lidar-biomass/figure')),
  },
  'maps-library-release': {
    MapDemo2d: dynamic(() =>
      import('./posts/maps-library-release/maps-demo-2d')
    ),
    MapDemo4d: dynamic(() =>
      import('./posts/maps-library-release/maps-demo-4d')
    ),
  },
  'soil-protocols-added': {
    RecommendationTable: dynamic(() =>
      import('./posts/soil-protocols-added/recommendation-table')
    ),
    ScoreSummary: dynamic(() =>
      import('./posts/soil-protocols-added/score-summary')
    ),
  },
  'ton-year-ncx': {
    TableHundred: dynamic(() => import('./posts/ton-year-ncx/table-hundred')),
    TableThousand: dynamic(() => import('./posts/ton-year-ncx/table-thousand')),
  },
}

export default figures
