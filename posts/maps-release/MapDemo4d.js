import { Box } from 'theme-ui'
import { Map, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'

const MapDemo4d = () => {
  const colormap = useColormap('warm')
  return (
    <Box as='figure' sx={{ mt: [6, 6, 6, 7], mb: [4, 4, 4, 5] }}>
      <Map>
        <Raster
          colormap={colormap}
          clim={[-20, 30]}
          source={
            'https://storage.googleapis.com/carbonplan-share/testing/maps/4d/tavg-prec-month'
          }
          variable={'climate'}
          dimensions={['band', 'month', 'y', 'x']}
          selector={{ band: 'tavg', month: 4 }}
        />
      </Map>
    </Box>
  )
}

export default MapDemo4d
