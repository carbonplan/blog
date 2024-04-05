import { Box } from 'theme-ui'
import { format } from 'd3-format'
import {
  Chart,
  Ticks,
  TickLabels,
  Axis,
  AxisLabel,
  StackedBar,
  Plot,
  Grid,
  Point,
} from '@carbonplan/charts'

// data from https://github.com/carbonplan/toucan-crypto-offsets/tree/main/data

const data = {
  '2014-04-01': null,
  '2014-07-01': 1193461.0,
  '2014-10-01': 1238339.0,
  '2015-01-01': 1699634.0,
  '2015-04-01': 1816791.0,
  '2015-07-01': 2443254.0,
  '2015-10-01': 3822389.0,
  '2016-01-01': 4104963.0,
  '2016-04-01': 4167304.0,
  '2016-07-01': 5255109.0,
  '2016-10-01': 6267389.0,
  '2017-01-01': 6412926.0,
  '2017-04-01': 7937763.0,
  '2017-07-01': 7395709.0,
  '2017-10-01': 9854044.0,
  '2018-01-01': 12642852.0,
  '2018-04-01': 13592716.0,
  '2018-07-01': 14103294.0,
  '2018-10-01': 17802767.0,
  '2019-01-01': 19690569.0,
  '2019-04-01': 20025522.0,
  '2019-07-01': 20933077.0,
  '2019-10-01': 21746192.0,
  '2020-01-01': 22276604.0,
  '2020-04-01': 24079774.0,
  '2020-07-01': 24637128.0,
  '2020-10-01': 27392548.0,
  '2021-01-01': 28706601.0,
  '2021-04-01': 28578968.0,
  '2021-07-01': 29053336.0,
  '2021-10-01': 29819664.0,
  '2022-01-01': 30215556.0,
  '2022-04-01': 30374173.0,
  '2022-07-01': 30484812.0,
  '2022-10-01': 30942686.0,
  '2023-01-01': 30910407.0,
  '2023-04-01': 31057039.0,
  '2023-07-01': 31637009.0,
  '2023-10-01': 28233448.0,
  '2024-01-01': 27222924.0,
}

const keys = Object.keys(data)
const counts = keys.map((k, index) => {
  const [year, month] = k.split('-').map(Number)
  const x = year + (month - 1) / 12
  const previousIndex = index - 1
  const previousValue = data[keys[previousIndex]] ?? 0
  return [
    x,
    0,
    data[k] ?? 0,
    data[k] ?? 0,
    previousValue > data[k] ? previousValue : 0,
  ]
})

const BufferBalance = () => {
  const formatter = format('~s')

  return (
    <Box sx={{ width: '100%', height: ['275px', '350px', '350px', '350px'] }}>
      <Chart x={[2014.25, 2024.25]} y={[0, 40000000]} padding={{ left: 60 }}>
        <Ticks left />
        <Ticks
          bottom
          count={10}
          sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
        />
        <Ticks
          bottom
          count={5}
          sx={{ display: ['inherit', 'none', 'none', 'none'] }}
        />
        <TickLabels left format={formatter} />
        <TickLabels
          bottom
          count={10}
          sx={{ display: ['none', 'inherit', 'inherit', 'inherit'] }}
        />
        <TickLabels
          bottom
          count={5}
          sx={{ display: ['inherit', 'none', 'none', 'none'] }}
        />
        <Axis left bottom />
        <Grid horizontal count={5} />
        <AxisLabel left>Credits</AxisLabel>
        <AxisLabel bottom>Year</AxisLabel>
        <Plot>
          <StackedBar data={counts} color={['grey', 'grey', 'red']} />
        </Plot>
        <Point x={2024.25} y={40000000} align='right'>
          <Box
            sx={{
              color: 'red',
              textTransform: 'uppercase',
              fontFamily: 'mono',
              fontSize: [0, 1, 1, 1],
            }}
          >
            Buffer Pool Declines
          </Box>
        </Point>
      </Chart>
    </Box>
  )
}

export default BufferBalance
