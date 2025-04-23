import { Box } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

const sx = {
  label: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
    pt: [2, 2, 2, 3],
    mt: [1],
    pb: [0],
  },
  valueBig: {
    fontFamily: 'faux',
    letterSpacing: 'faux',
    textTransform: 'uppercase',
    color: 'purple',
    fontSize: [6, 7, 7, 8],
  },
  valueSmall: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    color: 'purple',
    fontSize: [3, 3, 3, 4],
    mt: 2,
  },
  group: {
    borderStyle: 'solid',
    borderWidth: '0px',
    borderTopWidth: '1px',
    borderColor: 'muted',
    mb: [0, 0, 0, 3],
  },
  twoRow: {
    // Force line break on smaller screens
    '@media (width < 1950px)': {
      wordSpacing: 200,
    },
  },
}

const ProjectTypeSummary = () => {
  return (
    <Box>
      <Row columns={6}>
        <Column start={1} width={3}>
          <Box sx={sx.group}>
            <Box sx={sx.label}>Project types</Box>
            <Box sx={sx.valueBig}>78</Box>
          </Box>
        </Column>
        <Column start={4} width={3}>
          <Box sx={sx.group}>
            <Box sx={sx.label}>Categories</Box>
            <Box sx={sx.valueBig}>12{/* excluding `unknown` */}</Box>
          </Box>
        </Column>
      </Row>
      <Row columns={6} sx={{ mt: [4] }}>
        <Column start={1} width={2}>
          <Box sx={sx.group}>
            <Box sx={{ ...sx.label, ...sx.twoRow }}>
              Berkeley-typed projects
            </Box>
            <Box sx={sx.valueSmall}>9,903</Box>
          </Box>
        </Column>
        <Column start={3} width={2}>
          <Box sx={sx.group}>
            <Box sx={{ ...sx.label, ...sx.twoRow }}>Newly-typed projects</Box>
            <Box sx={sx.valueSmall}>113</Box>
          </Box>
        </Column>
        <Column start={5} width={2}>
          <Box sx={sx.group}>
            <Box sx={{ ...sx.label, ...sx.twoRow }}>Total projects</Box>
            <Box sx={sx.valueSmall}>10,361</Box>
          </Box>
        </Column>
      </Row>
    </Box>
  )
}

export default ProjectTypeSummary
