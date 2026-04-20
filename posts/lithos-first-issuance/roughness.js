import React, { useState } from 'react'
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
import rows from './nb1_rate_vs_roughness_factor.csv'

const diam50 = rows.map((r) => [
  r.log_dissolution_rate_mol_m2_s,
  r.roughness_factor_diam_50um,
])
const diam396 = rows.map((r) => [
  r.log_dissolution_rate_mol_m2_s,
  r.roughness_factor_diam_396um,
])
const diam990 = rows.map((r) => [
  r.log_dissolution_rate_mol_m2_s,
  r.roughness_factor_diam_990um,
])

const Y_MIN = 1

const clipBottom = (series) => {
  const result = []
  for (let i = 0; i < series.length; i++) {
    const [x, y] = series[i]
    if (y >= Y_MIN) {
      result.push([x, y])
      if (i + 1 < series.length && series[i + 1][1] < Y_MIN) {
        const [nx, ny] = series[i + 1]
        const t =
          (Math.log10(Y_MIN) - Math.log10(y)) / (Math.log10(ny) - Math.log10(y))
        result.push([x + t * (nx - x), Y_MIN])
      }
    }
  }
  return result
}

const DOMAIN = [-13, -9]
const RANGE = [1, 1e6]

const RANGES = {
  renforth: {
    x: [-12.4, -11.5],
    y: 0.025,
    shortTitle: 'Renforth',
    title: 'Renforth et al., 2015',
    description: 'Olivine in soil, pH=7.2, T=19°C',
  },
  oelkers: {
    x: [-10.4, -9.2],
    y: 0.025,
    shortTitle: 'Oelkers',
    title: 'Oelkers et al., 2018',
    description: 'Forsterite, pH=6, T=25°C',
  },
  strefler: {
    x: [-12.63, -9.55],
    y: 0.15,
    shortTitle: 'Strefler',
    title: 'Strefler et al., 2018',
    description: 'Basalts (range)',
  },
}

const RangeLabel = ({ range, setHovered }) => {
  return (
    <Label
      x={RANGES[range].x[0]}
      y={RANGES[range].y * 0.93}
      sx={{
        color: 'primary',
        bg: 'background',
        pt: 1,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setHovered(range)}
      onMouseLeave={() => setHovered(null)}
    >
      <Box as='span' sx={{ display: ['none', 'block', 'block', 'block'] }}>
        {RANGES[range].title}
      </Box>
      <Box as='span' sx={{ display: ['block', 'none', 'none', 'none'] }}>
        {RANGES[range].shortTitle}
      </Box>
    </Label>
  )
}

const Roughness = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <Box>
      <Box sx={{ width: '100%', height: '400px' }}>
        <Chart
          x={DOMAIN}
          y={RANGE}
          logy
          clamp={false}
          padding={{ bottom: 130 }}
        >
          <Grid vertical horizontal />
          <Ticks left values={[1, 10, 100, 1000, 1e4, 1e5, 1e6]} />
          <Ticks bottom />
          <TickLabels bottom />
          <TickLabels
            left
            values={[1, 10, 100, 1000, 1e4, 1e5, 1e6]}
            labels={[1, 10, 100, '1K', '10K', '100K', '1M']}
          />
          <Plot>
            <Line
              data={[
                [-13, 1],
                [-13, 10],
              ]}
              color='primary'
              width={2}
              sx={{ strokeLinecap: 'butt' }}
            />
            <Rect
              x={DOMAIN}
              y={[1, 10]}
              color='secondary'
              style={{ opacity: 0.15 }}
            />
            <Line
              data={[
                [-12.93, 3],
                [-12.8, 3],
                [-12.75, 6],
              ]}
              color='primary'
              width={1}
            />

            {Object.entries(RANGES).map(([key, range]) => {
              const [x0, x1] = range.x
              const { y } = range
              return (
                <g key={key}>
                  <Line
                    data={[
                      [x0, 0.9],
                      [x0, y],
                      [x1, y],
                      [x1, 0.9],
                    ]}
                    color='background'
                    width={12}
                    sx={{
                      strokeLinecap: 'butt',
                    }}
                  />
                  <Line
                    data={[
                      [x0, 1],
                      [x0, y],
                      [x1, y],
                      [x1, 1],
                    ]}
                    color='primary'
                    width={2}
                    sx={{
                      strokeLinecap: 'butt',
                      fill: 'transparent',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                  />
                </g>
              )
            })}
            {hovered && (
              <Rect
                x={RANGES[hovered].x}
                y={RANGE}
                color='secondary'
                style={{ opacity: 0.15 }}
              />
            )}
            <Line data={clipBottom(diam50)} color='grey' width={2} />
            <Line data={clipBottom(diam396)} color='grey' width={2} />
            <Line data={clipBottom(diam990)} color='grey' width={2} />
          </Plot>
          <Label
            x={-11}
            y={200}
            sx={{ mt: [2, 0, 0, 0], color: 'grey', textTransform: 'none' }}
          >
            50 µm
          </Label>
          <Label
            x={-11}
            y={1.4e3}
            sx={{ mt: ['6px', 0, 0, 0], color: 'grey', textTransform: 'none' }}
          >
            400 µm
          </Label>
          <Label x={-11} y={2e4} sx={{ color: 'grey', textTransform: 'none' }}>
            990 µm
          </Label>
          <Label x={-12.8} y={35} sx={{ color: 'primary' }}>
            Expected
            <br />
            range
          </Label>
          <RangeLabel range='strefler' setHovered={setHovered} />
          <RangeLabel range='renforth' setHovered={setHovered} />
          <RangeLabel range='oelkers' setHovered={setHovered} />
          {hovered && (
            <Label
              x={RANGES[hovered].x[0]}
              y={RANGE[1]}
              sx={{ textTransform: 'none', mt: 1, ml: 1 }}
            >
              {RANGES[hovered].description}
            </Label>
          )}

          <AxisLabel left>Roughness factor</AxisLabel>
          <AxisLabel bottom units='mol/m²/s' sx={{ pt: 3 }}>
            Log Dissolution rate
          </AxisLabel>
        </Chart>
      </Box>
    </Box>
  )
}

export default Roughness
