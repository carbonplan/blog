import { Box } from 'theme-ui'
import React from 'react'
import {
  Chart,
  Axis,
  AxisLabel,
  Ticks,
  TickLabels,
  Plot,
  Point,
  Scatter,
  Line,
  Grid,
  Label,
} from '@carbonplan/charts'
import { Column, Row } from '@carbonplan/components'

import Trees from './trees'
import data from './data.json'

const sx = {
  reference: {
    borderLeftWidth: '2px',
    borderStyle: 'dashed',
    opacity: 1,
  },
}

const RANGE = [603260, 603225]

const LINES = [
  ['alternative_ground_peak', 'pink', 'Alternative ground peak'],
  ['ground_peak', 'yellow', 'Ground peak'],
  ['signal_beginning', 'green', 'Signal beginning'],
  ['signal_end', 'green', 'Signal end'],
]

const HEIGHTS = [500, 500, 450, 500]

const Arrow = ({ color, x, y, start }) => {
  return (
    <Point x={x} y={y} verticalAlign={!start ? 'top' : 'bottom'}>
      <Box
        as='svg'
        viewBox='0 0 9 9'
        fill='none'
        width='9'
        height='9'
        strokeWidth='1.5'
        sx={{
          stroke: color,
          ml: '-4.5px',
          mb: start ? '-3.5px' : '7px',
          transform: start ? 'rotate(315deg)' : 'rotate(135deg)',
          WebkitTransform: start ? 'rotate(315deg)' : 'rotate(135deg)',
          msTransform: start ? 'rotate(315deg)' : 'rotate(135deg)',
        }}
      >
        <line x1='0' y1='0' x2='0' y2='9' />
        <line x1='0' y1='9' x2='9' y2='9' />
      </Box>
    </Point>
  )
}

const TreeLines = () => {
  return (
    <>
      <Line
        data={[
          [0.5, data.ground_peak - 1],
          [0.5, data.signal_beginning + 1],
        ]}
        sx={{
          stroke: 'yellow',
          strokeWidth: 1,
          display: ['initial', 'initial', 'none', 'none'],
        }}
      />
      <Line
        data={[
          [0.7, data.alternative_ground_peak - 1],
          [0.7, data.signal_beginning + 1],
        ]}
        sx={{
          stroke: 'pink',
          strokeWidth: 1,
          display: ['initial', 'initial', 'none', 'none'],
        }}
      />
    </>
  )
}

const Figure = () => {
  return (
    <Box as='figure' sx={{ mt: [6, 6, 6, 7], mb: [4, 4, 4, 5] }}>
      <Row columns={6}>
        <Column start={1} width={6}>
          <Box
            sx={{
              height: HEIGHTS,
            }}
          >
            <Chart x={[-0.04, 0.5 / 0.4 - 0.04]} y={RANGE} clamp={false}>
              <Axis left bottom />
              <AxisLabel bottom units='joules' arrow={false}>
                <Box as='span' sx={{ textTransform: 'none' }}>
                  LiDAR
                </Box>
                &nbsp;return
              </AxisLabel>
              <AxisLabel left units='m' arrow={false}>
                Distance from satellite
              </AxisLabel>
              <Ticks left bottom />
              <TickLabels left format={(d) => d % RANGE[1]} />
              <TickLabels bottom />
              <Grid
                vertical
                values={[0.013915494217939783]}
                sx={sx.reference}
              />
              <Plot sx={{ position: 'relative' }}>
                <Scatter
                  size={5}
                  data={data.raw.filter((d) => d[1] > RANGE[1])}
                  color='secondary'
                />
                <Line
                  data={data.smoothed.filter((d) => d[1] > RANGE[1])}
                  width={2}
                  color='primary'
                />
                {LINES.map(([key, color]) => (
                  <Line
                    key={key}
                    data={[
                      [-0.04, data[key]],
                      [0.5 / 0.4 - 0.04, data[key]],
                    ]}
                    sx={{
                      stroke: color,
                      strokeWidth: 1,
                      strokeDasharray: 4,
                    }}
                  />
                ))}
                <TreeLines />
              </Plot>
              <Trees heights={HEIGHTS} />

              <Box sx={{ display: ['initial', 'initial', 'none', 'none'] }}>
                <Arrow color='yellow' x={0.5} y={data.ground_peak - 1} start />
                <Arrow
                  color='yellow'
                  x={0.5}
                  y={data.signal_beginning + 1}
                  end
                />
                <Arrow
                  color='pink'
                  x={0.7}
                  y={data.alternative_ground_peak - 1}
                  start
                />
                <Arrow color='pink' x={0.7} y={data.signal_beginning + 1} end />
                <Label
                  x={0.5}
                  y={data.signal_beginning}
                  align='left'
                  verticalAlign='top'
                  sx={{
                    color: 'yellow',
                    ml: 3,
                    mt: [4, 4, 3, 3],
                    bg: 'background',
                  }}
                >
                  {(data.ground_peak - data.signal_beginning).toFixed(1)} m
                </Label>
                <Label
                  x={0.7}
                  y={data.signal_beginning}
                  align='left'
                  verticalAlign='top'
                  sx={{
                    color: 'pink',
                    ml: 3,
                    mt: [6, 4, 3, 3],
                    bg: 'background',
                  }}
                >
                  {(
                    data.alternative_ground_peak - data.signal_beginning
                  ).toFixed(1)}{' '}
                  m
                </Label>
              </Box>

              {LINES.map(([key, color, label]) => (
                <Label
                  key={key}
                  x={0.5 / 0.4 - 0.04}
                  align='right'
                  verticalAlign='bottom'
                  y={data[key]}
                  sx={{ color, backgroundColor: 'background', mb: '2px' }}
                >
                  {label}
                </Label>
              ))}
            </Chart>
          </Box>
        </Column>
      </Row>
    </Box>
  )
}

export default Figure
