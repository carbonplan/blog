import { Box } from 'theme-ui'
import React from 'react'
import {
  Chart,
  Axis,
  AxisLabel,
  Ticks,
  TickLabels,
  Plot,
  Scatter,
  Line,
  Grid,
  Label,
} from '@carbonplan/charts'
import { Column, Row } from '@carbonplan/components'

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

const Marker = ({ color, start }) => {
  return (
    <Box
      as='marker'
      id={`${color}-${start ? 'start' : 'end'}`}
      markerWidth='24'
      markerHeight='24'
      refX='21.9'
      refY='12'
      orient={start ? 90 : -90}
      markerUnits='strokeWidth'
      sx={{
        stroke: color,
        fill: 'none',
        vectorEffect: 'non-scaling-stroke',
        strokeWidth: 1,
      }}
    >
      <line x1='13.4' y1='3.5' x2='21.9' y2='12' />
      <line x1='21.9' y1='12' x2='13.4' y2='20.5' />
    </Box>
  )
}

const Figure = () => {
  return (
    <Row columns={6}>
      <Column start={1} width={6}>
        <Box sx={{ height: HEIGHTS }}>
          <Chart x={[-0.04, 0.5 / 0.4 - 0.04]} y={RANGE} clamp={false}>
            <Axis left bottom />
            <AxisLabel bottom units='joules' arrow={false}>
              <Box
                as='span'
                sx={{
                  textTransform: 'none',
                  display: ['none', 'none', 'none', 'initial'],
                }}
              >
                LiDAR RETURN
              </Box>
              <Box
                as='span'
                sx={{ display: ['initial', 'initial', 'initial', 'none'] }}
              >
                Return
              </Box>
            </AxisLabel>
            <AxisLabel left units='m' arrow={false}>
              Relative distance from satellite
            </AxisLabel>
            <Ticks left bottom />
            <TickLabels left format={(d) => d % RANGE[1]} />
            <TickLabels bottom />
            <Grid vertical values={[0.013915494217939783]} sx={sx.reference} />
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
              <Marker color='yellow' start />
              <Marker color='yellow' end />

              <Line
                data={[
                  [0.5, data.ground_peak],
                  [0.5, data.signal_beginning],
                ]}
                sx={{
                  stroke: 'yellow',
                  strokeWidth: 1,
                }}
                markerEnd='url(#yellow-end)'
                markerStart='url(#yellow-start)'
              />

              <Marker color='pink' start />
              <Marker color='pink' end />

              <Line
                data={[
                  [0.7, data.alternative_ground_peak],
                  [0.7, data.signal_beginning],
                ]}
                sx={{
                  stroke: 'pink',
                  strokeWidth: 1,
                }}
                markerEnd='url(#pink-end)'
                markerStart='url(#pink-start)'
              />
            </Plot>
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
                textTransform: 'none',
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
                textTransform: 'none',
              }}
            >
              {(data.alternative_ground_peak - data.signal_beginning).toFixed(
                1
              )}{' '}
              m
            </Label>
          </Chart>
        </Box>
      </Column>
    </Row>
  )
}

export default Figure
