import { Box, Flex } from 'theme-ui'
import { useMemo } from 'react'
import {
  Chart,
  Plot,
  Axis,
  AxisLabel,
  Ticks,
  TickLabels,
  Bar,
} from '@carbonplan/charts'
import { format } from 'd3-format'
import { animated, useSpring, easings } from '@react-spring/web'
import { Colors } from '@carbonplan/components'

const AnimatedChart = animated(Chart)

const formatNumber = (d, long = false) => {
  return format('.2s')(d).replace('G', long ? ' billion' : 'B')
}

const sx = {
  value: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [2, 4, 4, '28px'],
  },
  label: {
    fontSize: [0, 0, 0, 1],
    fontFamily: 'faux',
    letterSpacing: 'faux',
    textTransform: 'uppercase',
    mt: [0],
    right: 0,
  },
}

const Distribution = ({ count, totals, hovered, height }) => {
  const { data, colors, range, total, totalSelected } = useMemo(() => {
    if (totals.every((d) => d[1] === 0)) {
      return {
        data: [],
        colors: [],
        range: [0, 0],
        total: 0,
        totalSelected: 0,
      }
    }

    totals.sort((a, b) => b[1] - a[1])

    const data = totals.map((d, i) => [i + 1, d[1]])
    const colors = totals.map((d, i) => {
      if (hovered === d[0]) {
        return 'primary'
      } else if (i < count) {
        return 'blue'
      } else {
        return 'secondary'
      }
    })

    const values = totals.map((d) => d[1])
    const total = values.reduce((sum, d) => sum + d, 0)
    const totalSelected = values.reduce(
      (sum, d, i) => (i < count ? sum + d : sum),
      0
    )

    return {
      data,
      range: [0, Math.max(...values)],
      colors,
      total,
      totalSelected,
    }
  }, [totals, count, hovered])

  const spring = useSpring({
    range,
    config: {
      duration: 100,
      easing: easings.easeOut,
    },
  })

  return (
    <Box
      sx={{
        width: '100%',
        height,
        position: 'relative',
        pl: [5, '2px', '2px', '2px'],
      }}
    >
      <AnimatedChart
        y={[0, 51]}
        x={spring.range}
        padding={{ left: 0, right: 0 }}
      >
        <Ticks bottom count={4} />
        <TickLabels bottom format={formatNumber} count={3} />
        <Axis left bottom />
        <AxisLabel bottom units='$'>
          Losses
        </AxisLabel>
        <AxisLabel left units='STATES' arrow={false} sx={{ left: -5 }}>
          <Flex sx={{ gap: 1 }}>
            <Colors.Blue>{count}</Colors.Blue>{' '}
            <Colors.Secondary>/ 51</Colors.Secondary>
          </Flex>
        </AxisLabel>

        <Plot>
          <Bar data={data} color={colors} direction='horizontal' />
        </Plot>
      </AnimatedChart>

      <Flex
        sx={{
          position: 'absolute',
          flexDirection: 'column',
          alignItems: 'flex-end',
          top: 0,
          right: 0,
          gap: 3,
        }}
      >
        <Flex
          sx={{
            color: 'blue',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={sx.value}>${formatNumber(totalSelected)}</Box>
          <Box sx={sx.label}>Top states</Box>
        </Flex>

        <Flex
          sx={{
            color: 'secondary',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={sx.value}>${formatNumber(total)}</Box>
          <Box sx={sx.label}>All</Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Distribution
