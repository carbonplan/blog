import { Box, Flex } from 'theme-ui'
import { useState } from 'react'
import {
  Chart,
  Plot,
  Ticks,
  TickLabels,
  Axis,
  AxisLabel,
  Line,
  Circle,
  Label,
} from '@carbonplan/charts'
import { Row, Column } from '@carbonplan/components'
import { mix } from '@theme-ui/color'
import { format } from 'd3-format'
import data from './data.json'

const p = { left: 60, bottom: 50 }
const max = 500
const HEIGHTS = [
  `calc((6 / 6 * (100vw - 24px * 7) - ${p.left - p.bottom}px + 5 * 24px))`,
  `calc((4 / 8 * (100vw - 32px * 9) + ${p.bottom}px + 3 * 32px))`,
  `calc((4 / 12 * (100vw - 32px * 13) + ${p.bottom}px + 3 * 32px))`,
  `calc(min(${max - p.left + p.bottom}px, (4 / 12 * (100vw - 48px * 13) + ${
    p.bottom
  }px + 3 * 48px)))`,
]

const Reporting = () => {
  const [label, setLabel] = useState(null)
  return (
    <Row columns={6}>
      <Column start={[1, 2, 2, 2]} width={[6, 4, 4, 4]}>
        <Flex sx={{ width: '100%', justifyContent: 'center' }}>
          <Box
            sx={{
              width: [
                '100%',
                `calc(100% + ${p.left}px)`,
                `calc(100% + ${p.left}px)`,
                `calc(100% + ${p.left}px)`,
              ],
              maxWidth: max,
              height: HEIGHTS,
              ml: [0, -p.left, -p.left, -p.left],
            }}
          >
            <Chart x={[0, 700]} y={[0, 700]} padding={p}>
              <Ticks left bottom />
              <TickLabels left bottom format={(d) => format('0.1s')(d * 1e4)} />
              <Axis left bottom />
              <AxisLabel left units='CNY' sx={{ whiteSpace: 'nowrap' }}>
                Cash Flow Revenue Threshold
              </AxisLabel>
              <AxisLabel bottom units='CNY' sx={{ whiteSpace: 'nowrap' }}>
                Sensitivity Revenue Threshold
              </AxisLabel>
              <Plot>
                {data.map((d) => (
                  <a
                    key={d.project_id}
                    href={`https://carbonplan.org/research/offsets-db/projects/${d.project_id}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Circle
                      key={d.project_id}
                      x={d.rev_thold}
                      y={d.cash_thold}
                      color='blue'
                      size={15}
                      opacity={0.5}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { opacity: 1 },
                      }}
                      onMouseEnter={() =>
                        setLabel({
                          x: d.rev_thold,
                          y: d.cash_thold,
                          text: d.project_id,
                        })
                      }
                      onMouseLeave={() => setLabel(null)}
                    />
                  </a>
                ))}
                <Line
                  data={[
                    [0, 0],
                    [700, 700],
                  ]}
                  color='primary'
                  sx={{ strokeDasharray: '4' }}
                />
              </Plot>
              <Box sx={{ pointerEvents: 'none' }}>
                <Label
                  x={label ? label.x : 0}
                  y={label ? label.y : 0}
                  verticalAlign='bottom'
                  sx={{
                    color: mix('blue', 'primary', 0.5),
                    ml: 2,
                    opacity: label ? 1 : 0,
                    transition: 'opacity 0.15s',
                  }}
                >
                  {label ? label.text : ''}
                </Label>
              </Box>
            </Chart>
          </Box>
        </Flex>
      </Column>
    </Row>
  )
}

export default Reporting
