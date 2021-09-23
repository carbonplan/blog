import { Box } from 'theme-ui'
import { Map, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'

const MapDemo2d = () => {
  const colormap = useColormap('warm')
  return (
    <Box
      as='figure'
      sx={{
        mt: [6, 6, 6, 7],
        mb: [4, 4, 4, 5],
        width: '100%',
        height: '300px',
      }}
    >
      <Map>
        <Raster
          colormap={colormap}
          clim={[-20, 30]}
          source={
            'https://storage.googleapis.com/carbonplan-share/testing/maps/2d/tavg'
          }
          variable={'tavg'}
          dimensions={['y', 'x']}
        />
      </Map>
    </Box>
  )
}

export default MapDemo2d
