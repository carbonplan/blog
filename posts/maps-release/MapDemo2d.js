import { Box } from 'theme-ui'
import { Map, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import Coastlines from './Coastlines'
import style from './style'

const MapDemo2d = () => {
  const colormap = useColormap('warm')

  return (
    <Box
      as='figure'
      sx={{
        my: [6, 6, 6, 7],
        width: '100%',
        height: '350px',
        border: 'solid',
        borderColor: 'muted',
        borderWidth: '1px',
      }}
    >
      <Map style={style}>
        <Coastlines />
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
