import { useThemeUI, Box } from 'theme-ui'
import { useState } from 'react'
import { Map, Raster, Line } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import { Group } from '@carbonplan/components'
import Parameters from './parameters'
import Zoom from './zoom'

const bucket = 'https://storage.googleapis.com/carbonplan-maps/'

const CLIMS = {
  tavg: [-20, 30],
  prec: [0, 300],
}

const COLORMAPS = {
  tavg: 'warm',
  prec: 'cool',
}

const MapDemo4d = () => {
  const [band, setBand] = useState('prec')
  const [month, setMonth] = useState(1)

  const { theme } = useThemeUI()
  const colormap = useThemedColormap(COLORMAPS[band])

  return (
    <Box sx={{ my: [6, 6, 6, 7] }}>
      <Group spacing='sm'>
        <Box
          as='figure'
          sx={{
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
              source={bucket + 'basemaps/land'}
              variable={'land'}
            />
            <Raster
              colormap={colormap}
              clim={CLIMS[band]}
              source={bucket + 'v1/demo/4d/tavg-prec-month'}
              variable={'climate'}
              dimensions={['band', 'month', 'y', 'x']}
              selector={{ band, month }}
            />
            <Parameters
              band={band}
              setBand={setBand}
              month={month}
              setMonth={setMonth}
            />
            <Zoom />
          </Map>
        </Box>
      </Group>
    </Box>
  )
}

export default MapDemo4d
