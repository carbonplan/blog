import { Box } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

const sx = {
  label: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
    mb: [2],
  },
  number: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    fontSize: [4, 4, 4, 5],
    color: 'red',
  },
  units: {
    display: ['inline-block'],
    fontFamily: 'faux',
    letterSpacing: 'faux',
    fontSize: [2, 2, 2, 3],
    color: 'secondary',
    ml: 2,
  },
  group: {
    borderStyle: 'solid',
    borderWidth: '0px',
    borderTopWidth: '1px',
    borderColor: 'muted',
    pt: [3],
  },
}

const CreditingTable = ({ data }) => {
  return (
    <Row columns={[2, 4, 4, 4]}>
      {data.map((d, i) => {
        return (
          <Column
            key={i}
            start={[(i % 2) + 1, i + 1, i + 1, i + 1]}
            width={[1]}
          >
            <Box sx={{ ...sx.group, mb: [i < 2 ? 4 : 0, 0, 0, 0] }}>
              <Box sx={sx.label}>{d[0]}</Box>
              <Box sx={sx.number}>{d[1]}M</Box>
            </Box>
          </Column>
        )
      })}
    </Row>
  )
}

export default CreditingTable
