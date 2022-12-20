import { Box } from 'theme-ui'
import { geoPath } from 'd3-geo'
import { alpha, mix } from '@theme-ui/color'

const Map = ({ data, fioSelection, selection, hovered, setHovered }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box as='svg' viewBox='0 0 975 610' onMouseLeave={() => setHovered(null)}>
        <defs>
          <pattern
            id='diagonalHatch'
            patternUnits='userSpaceOnUse'
            width='4'
            height='4'
            patternTransform='scale(4 4)'
          >
            <Box
              as='path'
              d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2'
              sx={{
                stroke: mix('primary', 'background', 0.7),
                strokeWidth: '0.3',
              }}
            />
          </pattern>
        </defs>

        {data && (
          <>
            {data?.features.map((feature) => (
              <Box
                as='path'
                sx={{
                  fill: alpha('muted', 0.5),
                }}
                key={feature.id}
                d={geoPath()(feature)}
                onMouseEnter={() => setHovered(feature.properties.name)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}

            <Box
              as='path'
              d={geoPath()(data)}
              sx={{
                fill: 'none',
                stroke: 'background',
                strokeWidth: 2,
                pointerEvents: 'none',
              }}
            />

            {data?.features
              .filter((f) => fioSelection.includes(f.properties.name))
              .map((feature) => (
                <Box
                  as='path'
                  sx={{
                    fill: 'url(#diagonalHatch)',
                    pointerEvents: 'none',
                  }}
                  key={feature.id}
                  d={geoPath()(feature)}
                />
              ))}

            {data?.features
              .filter((f) => selection.includes(f.properties.name))
              .map((feature) => (
                <Box
                  as='path'
                  key={feature.id}
                  sx={{
                    fill: alpha('blue', 0.5),
                    pointerEvents: 'none',
                  }}
                  d={geoPath()(feature)}
                />
              ))}

            {hovered && data && (
              <Box
                as='path'
                sx={{
                  fill: alpha('primary', 0.5),
                  pointerEvents: 'none',
                }}
                d={geoPath()(
                  data?.features.find((f) => hovered === f.properties.name)
                )}
              />
            )}

            <Box
              as='path'
              d={geoPath()(data)}
              sx={{ fill: 'none', stroke: 'background', strokeWidth: 2 }}
            />
          </>
        )}
      </Box>
    </Box>
  )
}

export default Map
