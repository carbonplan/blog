import React from 'react'
import {
  Bar,
  Chart,
  Plot,
  Axis,
  AxisLabel,
  Label,
  Line,
} from '@carbonplan/charts'
import { Arrow } from '@carbonplan/icons'
import { Box } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

const AccountingGraph = () => {
  const chartSpacing = 24
  const chartHeight = 200
  const xLimits = [0.25, 2.75]
  const yLimits = [0, 25]
  const barWidth = 0.5

  const emissionsData = [
    [0, 0],
    [1, 20],
    [2, 5],
  ]
  const removalsData = [
    [0, 0],
    [1, 10],
    [2, 10],
  ]

  return (
    <Row columns={6} style={{ width: '100%', height: chartHeight * 2 }}>
      <Column start={1} width={[6, 4, 4, 3]} sx={{ position: 'relative' }}>
        {/* Emissions Chart */}
        <Box sx={{ height: chartHeight, position: 'relative' }}>
          <Chart
            x={xLimits}
            y={yLimits}
            padding={{
              left: chartSpacing,
              right: 0,
              top: 0,
              bottom: chartSpacing,
            }}
          >
            <Axis left bottom />
            <AxisLabel left arrow={false} align='center'>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Emissions{' '}
                <Arrow
                  sx={{
                    transform: 'rotate(135deg)',
                    height: [12, 12, 12, 14],
                    mr: ['1px', '1px', '1px', '0px'],
                  }}
                />
              </Box>
            </AxisLabel>
            <Plot>
              <Bar
                width={barWidth}
                data={emissionsData}
                color={['grey', 'grey', 'purple']}
              />
            </Plot>
            <Label
              x={emissionsData[1][0]}
              y={emissionsData[1][1]}
              align='center'
              width={1}
              verticalAlign={'bottom'}
              sx={{ color: 'grey' }}
            >
              {emissionsData[1][1]}
            </Label>
            <Label
              x={emissionsData[2][0]}
              y={emissionsData[2][1]}
              align='center'
              width={1}
              verticalAlign={'bottom'}
              sx={{ color: 'purple' }}
            >
              {emissionsData[2][1]}
            </Label>
            <Label
              x={emissionsData[1][0]}
              y={0}
              align={'center'}
              width={1}
              verticalAlign={'top'}
              sx={{
                color: 'grey',
                height: `${2 * chartSpacing}px`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              Counterfactual <br /> (net emitting)
            </Label>
            <Label
              x={emissionsData[2][0]}
              y={0}
              align={'center'}
              width={1}
              verticalAlign={'top'}
              sx={{
                color: 'purple',
                height: `${2 * chartSpacing}px`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              Project <br /> (net removing)
            </Label>
          </Chart>
        </Box>

        {/* Removals Chart */}
        <Box sx={{ height: chartHeight, position: 'relative' }}>
          <Chart
            x={xLimits}
            y={yLimits}
            padding={{
              left: chartSpacing,
              right: 0,
              top: chartSpacing,
              bottom: 0,
            }}
          >
            <Axis left top />
            <AxisLabel left arrow={false} align='center'>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Arrow
                  sx={{
                    transform: 'rotate(315deg)',
                    height: [12, 12, 12, 14],
                    mr: ['1px', '1px', '1px', '0px'],
                  }}
                />{' '}
                Removals
              </Box>
            </AxisLabel>
            <Plot sx={{ transform: 'scale(1, -1)' }}>
              <Bar
                width={barWidth}
                data={removalsData}
                color={['grey', 'grey', 'purple']}
              />
              <Line
                data={[
                  [removalsData[1][0], removalsData[1][1] + 3],
                  [removalsData[1][0], removalsData[1][1] + 4],
                  [removalsData[2][0], removalsData[2][1] + 4],
                  [removalsData[2][0], removalsData[2][1] + 3],
                ]}
                color={'primary'}
                width={1}
              />
              <Line
                data={[
                  [
                    (removalsData[1][0] + removalsData[2][0]) / 2,
                    removalsData[1][1] + 4,
                  ],
                  [
                    (removalsData[1][0] + removalsData[2][0]) / 2,
                    removalsData[1][1] + 6,
                  ],
                ]}
                color={'primary'}
                width={1}
              />
            </Plot>
            <Label
              x={removalsData[1][0]}
              y={yLimits[1] - removalsData[1][1]}
              align='center'
              width={1}
              verticalAlign={'top'}
              sx={{ color: 'grey' }}
            >
              {removalsData[1][1]}
            </Label>
            <Label
              x={removalsData[2][0]}
              y={yLimits[1] - removalsData[2][1]}
              align='center'
              width={1}
              verticalAlign={'top'}
              sx={{ color: 'purple' }}
            >
              {removalsData[2][1]}
            </Label>
            <Label
              x={(removalsData[1][0] + removalsData[2][0]) / 2}
              y={8}
              align={'center'}
              width={3}
              verticalAlign={'top'}
              sx={{ color: 'primary' }}
            >
              No change in
              <br />
              gross removals
            </Label>
          </Chart>
        </Box>
      </Column>
    </Row>
  )
}

export default AccountingGraph
