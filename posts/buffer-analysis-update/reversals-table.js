import { Box } from 'theme-ui'
import { Table } from '@carbonplan/components'

const sx = {
  heading: {
    textTransform: 'uppercase',
    letterSpacing: 'smallcaps',
    fontFamily: 'heading',
    fontSize: [0, 2, 2, 3],
  },
}

const ReversalsTable = () => {
  return (
    <Table
      columns={[4, 4, 4, 4]}
      start={[[1], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4]]}
      width={[
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ]}
      data={[
        [
          <Box key='Project' as='span' sx={sx.heading}>
            Project
          </Box>,
          <Box key='Reporting period' as='span' sx={sx.heading}>
            Reporting period
          </Box>,
          <Box key='CarbonPlan estimate' as='span' sx={sx.heading}>
            CarbonPlan estimate
          </Box>,
          <Box key='Official estimate' as='span' sx={sx.heading}>
            Official estimate
          </Box>,
        ],
        [
          <>
            Montesol <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              CAR1102
            </Box>
          </>,
          '5',
          <>
            Min: 0.22 <br /> Max: 0.27
          </>,
          '0.21',
        ],
        [
          <>
            Colville <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              ACR255
            </Box>
          </>,
          '5',
          'Not included',
          '0.56',
        ],
        [
          <>
            Colville
            <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              ACR255
            </Box>
          </>,
          '6',
          <>
            Min: 1.81 <br /> Max: 2.39
          </>,
          '3.18',
        ],
      ]}
      index={false}
      sx={{ my: [5] }}
    />
  )
}

export default ReversalsTable
