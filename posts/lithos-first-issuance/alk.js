import { format } from 'd3-format'
import { Box } from 'theme-ui'
import {
  Chart,
  Plot,
  Grid,
  Ticks,
  TickLabels,
  AxisLabel,
  Label,
  Line,
  Rect,
} from '@carbonplan/charts'
import { dic_vs_infiltration } from './data'

const X_MAX = 500

const lerp = (x0, y0, x1, y1, x) => y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)

const clipSeries = (key) => {
  const pts = []
  for (let i = 0; i < dic_vs_infiltration.length; i++) {
    const x = dic_vs_infiltration[i].q_mm_per_yr
    const y = dic_vs_infiltration[i][key]
    if (x <= X_MAX) {
      pts.push([x, y])
    } else {
      const prev = dic_vs_infiltration[i - 1]
      pts.push([X_MAX, lerp(prev.q_mm_per_yr, prev[key], x, y, X_MAX)])
      break
    }
  }
  return pts
}

const dic = clipSeries('DIC_mM')

const DIC = () => {
  return (
    <Box sx={{ width: '100%', height: '400px' }}>
      <Chart
        x={[50, 500]}
        y={[1, 1000]}
        padding={{ left: 70, bottom: 50, top: 30, right: 20 }}
        logy
      >
        <Plot>
          <Rect
            x={[50, 500]}
            y={[1, 6]}
            color='secondary'
            style={{ opacity: 0.15 }}
          />
          <Rect
            x={[50, 500]}
            y={[7, 33]}
            color='secondary'
            style={{ opacity: 0.15 }}
          />
        </Plot>
        <Grid
          vertical
          values={[50, 100, 150, 200, 250, 300, 350, 400, 450, 500]}
        />
        <Grid horizontal />
        <Ticks left values={[1, 10, 100, 1000]} />
        <Ticks bottom />
        <TickLabels left values={[1, 10, 100, 1000]} format={format('~s')} />
        <TickLabels bottom />
        <AxisLabel left units='mM'>
          DIC
        </AxisLabel>
        <AxisLabel bottom units='mm/yr'>
          Infiltration
        </AxisLabel>

        <Plot>
          <Line data={dic} color='grey' width={2} />
          <Line
            data={[
              [50, 1],
              [50, 6],
            ]}
            color='primary'
            width={2}
            sx={{ strokeLinecap: 'butt' }}
          />
          <Line
            data={[
              [50, 7],
              [50, 33],
            ]}
            color='primary'
            width={2}
            sx={{ strokeLinecap: 'butt' }}
          />
        </Plot>
        <Label
          x={55}
          y={3}
          verticalAlign='middle'
          height={6}
          sx={{ color: 'primary', ml: 1 }}
        >
          Expected range
        </Label>
        <Label
          x={55}
          y={15}
          verticalAlign='middle'
          height={6}
          sx={{ color: 'primary', ml: 1 }}
        >
          GCS sites
        </Label>
      </Chart>
    </Box>
  )
}

export default DIC
