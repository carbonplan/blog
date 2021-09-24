import { Box } from 'theme-ui'
import { useState } from 'react'
import { Map, Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import { Group } from '@carbonplan/components'
import Coastlines from './Coastlines'
import style from './style'
import Parameters from './Parameters'

const CLIMS = {
  tavg: [-20, 30],
  prec: [-100, 200],
}

const COLORMAPS = {
  tavg: 'warm',
  prec: 'cool',
}

const MapDemo4d = () => {
  const [band, setBand] = useState('tavg')
  const [month, setMonth] = useState(1)

  const colormap = useColormap(COLORMAPS[band])

  return (
    <Box sx={{ my: [6, 6, 6, 7] }}>
      <Group spacing='sm'>
        <Box
          as='figure'
          sx={{
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
              clim={CLIMS[band]}
              source={
                'https://storage.googleapis.com/carbonplan-share/testing/maps/4d/tavg-prec-month'
              }
              variable={'climate'}
              dimensions={['band', 'month', 'y', 'x']}
              selector={{ band, month }}
            />
          </Map>
        </Box>

        <Parameters
          band={band}
          setBand={setBand}
          month={month}
          setMonth={setMonth}
        />
      </Group>
    </Box>
  )
}

export default MapDemo4d
