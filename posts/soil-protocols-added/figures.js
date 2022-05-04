import dynamic from 'next/dynamic'

const figures = {
  RecommendationTable: dynamic(() => import('./recommendation-table.js')),
  ScoreSummary: dynamic(() => import('./score-summary.js')),
}

export default figures
