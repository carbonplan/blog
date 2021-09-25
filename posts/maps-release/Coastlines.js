import { useEffect } from 'react'
import { useMapbox } from '@carbonplan/maps'
import { useThemeUI } from 'theme-ui'

const Coastlines = ({}) => {
  const { map } = useMapbox()
  const {
    theme: { rawColors: colors },
  } = useThemeUI()
  const { primary } = colors

  useEffect(() => {
    if (!map.getLayer('coastlines')) {
      map.addLayer({
        id: 'coastlines',
        type: 'line',
        source: 'basemap',
        'source-layer': 'ne_10m_land',
        layout: { visibility: 'visible' },
        paint: {
          'line-blur': 0.4,
          'line-color': primary,
          'line-opacity': 1,
          'line-width': 0.5,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (map.getLayer('coastlines')) {
      map.setPaintProperty('coastlines', 'line-color', primary)
    }
  }, [colors])

  return null
}

export default Coastlines
