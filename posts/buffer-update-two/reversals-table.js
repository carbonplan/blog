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
      columns={[3, 3, 3, 3]}
      start={[
        [1], // start of column 1
        [2, 2, 2, 2], // start of column 2 (across 4 breakpoints)
        [3, 3, 3, 3], // start of column 3 (across 4 breakpoints)
      ]}
      width={[
        [1, 1, 1, 1], // width of column 1
        [1, 1, 1, 1], // width of column 2
        [1, 1, 1, 1], // width of column 3
      ]}
      data={[
        [
          <Box key='Project' as='span' sx={sx.heading}>
            Project
          </Box>,
          <Box key='Reversal magnitude' as='span' sx={sx.heading}>
            Magnitude of reversal
          </Box>,
          <Box key='Source' as='span' sx={sx.heading}>
            Source
          </Box>,
        ],
        [
          <>
            Trinity <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              CAR1046
            </Box>
          </>,
          '0.85',
          'CARB',
        ],
        [
          <>
            Eddie Ranch <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              CAR1174
            </Box>
          </>,
          '0.28',
          'CARB',
        ],
        [
          <>
            Montesol <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              CAR1102
            </Box>
          </>,
          '0.21',
          'CARB',
        ],
        [
          <>
            Colville <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              ACR255
            </Box>
          </>,
          '3.95',
          'Project paperwork',
        ],
        [
          <>
            Klamath East <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              ACR273
            </Box>
          </>,
          '1.14',
          'Project paperwork',
        ],
        [
          <>
            Warm Springs <br />
            <Box as='span' sx={{ color: 'secondary' }}>
              ACR260
            </Box>
          </>,
          '2.68',
          'New reporting',
        ],
      ]}
      index={false}
      sx={{ my: [5] }}
    />
  )
}

export default ReversalsTable
