import { Box, useThemeUI } from 'theme-ui'
import {
  Chart,
  Grid,
  TickLabels,
  AxisLabel,
  Plot,
  Rect,
  Label,
} from '@carbonplan/charts'
import { Arrow } from '@carbonplan/icons'
import { mix } from '@theme-ui/color'

const sx = {
  label: {
    fontSize: [0, 1, 1, 2],
    textTransform: 'none',
    backgroundColor: 'background',
    fontFamily: 'faux',
    letterSpacing: 'faux',
    whiteSpace: 'nowrap',
    ml: ['6px', '6px', '7px', '8px'],
    color: 'primary',
    pb: ['2px', '0px', '4px', '4px'],
    pt: '3px',
    pr: '3px',
    mb: -2,
  },
}

const VCLChart = () => {
  const { theme } = useThemeUI()
  return (
    <Box
      sx={{
        width: '100%',
        height: ['340px', '350px', '450px', '550px'],
        mt: [7],
      }}
    >
      <Chart
        x={[0, 5]}
        y={[-0.5, 27.5]}
        padding={{ left: 0, top: 8, bottom: 32 }}
      >
        <TickLabels
          top
          values={[0.5, 1.5, 2.5, 3.5, 4.5]}
          format={Math.round}
          sx={{ color: 'primary', mb: '-22px' }}
        />
        <Grid vertical sx={{ borderColor: 'secondary', opacity: 0.75 }} />
        <Label
          x={0}
          y={27.5}
          verticalAlign='bottom'
          sx={{ color: 'primary', fontSize: [0, 1, 1, 2], mb: [2, 2, 2, 3] }}
        >
          Verification Confidence Level (VCL)
        </Label>
        <Label
          x={3}
          y={24}
          verticalAlign='bottom'
          sx={{ ...sx.label, color: mix('primary', 'background', 0.3) }}
        >
          Direct air capture
        </Label>
        <Label
          x={2}
          y={21}
          verticalAlign='bottom'
          sx={{ ...sx.label, color: mix('primary', 'background', 0.3) }}
        >
          <Box sx={{ display: ['none', 'initial', 'initial', 'initial'] }}>
            Biomass carbon removal and storage
          </Box>
          <Box sx={{ display: ['initial', 'none', 'none', 'none'] }}>BiCRS</Box>
        </Label>
        <Label
          x={1}
          y={18}
          verticalAlign='bottom'
          sx={{ ...sx.label, color: mix('primary', 'background', 0.3) }}
        >
          Terrestrial biomass sinking
        </Label>
        <Label x={0} y={15} verticalAlign='bottom' sx={{ ...sx.label }}>
          Biochar
        </Label>
        <Label x={2} y={12} verticalAlign='bottom' sx={{ ...sx.label }}>
          Alkaline waste mineralization
        </Label>

        <Label
          x={2}
          y={9}
          verticalAlign='bottom'
          sx={{ ...sx.label, color: mix('primary', 'background', 0.3) }}
        >
          Enhanced weathering
        </Label>
        <Label
          x={0}
          y={6}
          verticalAlign='bottom'
          sx={{ ...sx.label, color: mix('primary', 'background', 0.3) }}
        >
          Ocean biomass sinking
        </Label>
        <Label x={1} y={3} verticalAlign='bottom' sx={{ ...sx.label }}>
          Direct ocean removal
        </Label>
        <Label
          x={0}
          y={0}
          verticalAlign='bottom'
          sx={{ ...sx.label, color: mix('primary', 'background', 0.3) }}
        >
          Ocean alkalinity enhancement
        </Label>

        <Plot>
          <Rect
            x={[3, 5]}
            y={[25, 26]}
            color={mix('purple', 'background', 0.3)(theme)}
          />
          <Rect
            x={[2, 5]}
            y={[22, 23]}
            color={mix('yellow', 'background', 0.3)(theme)}
          />
          <Rect
            x={[1, 4]}
            y={[19, 20]}
            color={mix('yellow', 'background', 0.3)(theme)}
          />
          <Rect x={[0, 3]} y={[16, 17]} color={'yellow'} />
          <Rect x={[2, 5]} y={[13, 14]} color={'grey'} />
          <Rect
            x={[2, 3]}
            y={[10, 11]}
            color={mix('grey', 'background', 0.3)(theme)}
          />
          <Rect
            x={[0, 3]}
            y={[7, 8]}
            color={mix('teal', 'background', 0.3)(theme)}
          />
          <Rect x={[1, 3]} y={[4, 5]} color={'blue'} />
          <Rect
            x={[0, 3]}
            y={[1, 2]}
            color={mix('blue', 'background', 0.3)(theme)}
          />
        </Plot>
        <AxisLabel
          sx={{ fontSize: [0, 1, 1, 2], color: 'secondary' }}
          bottom
          arrow={false}
        >
          High confidence
          <Arrow
            sx={{
              position: 'relative',
              top: ['4px', '4px', '4px', '6px'],
              ml: ['6px'],
              width: 11,
              height: 11,
              transform: 'rotate(45deg)',
            }}
          />
        </AxisLabel>
        <AxisLabel
          bottom
          align='left'
          sx={{ fontSize: [0, 1, 1, 2], color: 'secondary' }}
          arrow={false}
        >
          <Arrow
            sx={{
              position: 'relative',
              top: ['4px', '4px', '4px', '6px'],
              mr: ['6px'],
              width: 11,
              height: 11,
              transform: 'rotate(-135deg)',
            }}
          />
          Low confidence
        </AxisLabel>

        <AxisLabel top>Verification Confidence Level (VCL)</AxisLabel>
      </Chart>
    </Box>
  )
}

export default VCLChart
