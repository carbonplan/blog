import { useThemeUI, Box } from 'theme-ui'
import { Map, Raster, Line } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import Zoom from './zoom'

const bucket = 'https://storage.googleapis.com/carbonplan-maps/v1/demo/'

const MapDemo2d = () => {
  const { theme } = useThemeUI()
  const colormap = useThemedColormap('warm')

  return (
    <Box
      as='figure'
      sx={{
        my: [6, 6, 6, 7],
        width: '100%',
        height: ['300px', '400px', '400px', '500px'],
        border: 'solid',
        borderColor: 'muted',
        borderWidth: '1px',
        borderRadius: '1px',
      }}
    >
      <Map>
        <Line
          color={theme.rawColors.primary}
          source={bucket + 'land'}
          variable={'land'}
        />
        <Raster
          colormap={colormap}
          clim={[-20, 30]}
          source={bucket + '2d/tavg'}
          variable={'tavg'}
          dimensions={['y', 'x']}
        />
        <Zoom />
      </Map>
    </Box>
  )
}

export default MapDemo2d
