import { useEffect, useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { geoPath, geoAlbers } from 'd3-geo'
import { useSpring, animated } from '@react-spring/web'
import { feature as topoFeature } from 'topojson-client'
import Zoom from './zoom'

const Point = ({ scale, position, sx, projection }) => {
  const [x, y] = projection(position)

  const path = `M${x} ${y} A0 0 0 0 1 ${x + 0.0001 * scale} ${
    y + 0.0001 * scale
  }`

  return (
    <Box
      as='path'
      d={path}
      sx={{
        stroke: 'primary',
        strokeWidth: 10,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        vectorEffect: 'non-scaling-stroke',
        ...sx,
      }}
    />
  )
}

const AnimatedPoint = animated(Point)
const Label = ({ position, children, projection, scale, translate }) => {
  const [x, y] = projection(position)

  const effectiveX = (x + translate[0]) * scale
  const effectiveY = (y + translate[1]) * scale

  return (
    <Box
      x={x}
      y={y}
      sx={{
        fontSize: 1,
        fontFamily: 'mono',
        fill: 'primary',
        textTransform: 'uppercase',
        ml: 2,
        position: 'absolute',
        left: `${(100 * effectiveX) / 400}%`,
        top: `${(100 * effectiveY) / 200}%`,
      }}
    >
      {children}
    </Box>
  )
}
const AnimatedLabel = animated(Label)

const Map = ({ showInferred = false, showZoom = false }) => {
  const [zoomed, setZoomed] = useState(false)
  const [projection, setProjection] = useState(null)
  const [paths, setPaths] = useState(null)
  const { theme } = useThemeUI()
  const { transform } = useSpring({
    config: { duration: 500, mass: 1, tension: 280, friction: 120 },
    transform: zoomed
      ? `scale(3.7) translate(-160, -126)`
      : 'scale(1) translate(0,0)',
  })
  const { scale, translate } = useSpring({
    config: { duration: 500, mass: 1, tension: 280, friction: 120 },
    scale: zoomed ? 3.7 : 1,
    translate: zoomed ? [-160, -126] : [0, 0],
  })

  useEffect(() => {
    Promise.all(
      [
        'https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/offsets-project-boundaries/inferred_boundary.json',
        'https://carbonplan-forest-offsets.s3.us-west-1.amazonaws.com/offsets-project-boundaries/provided_boundary.json',
        'https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json',
        'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json',
      ].map((d) => fetch(d))
    )
      .then((res) => Promise.all(res.map((r) => r.json())))
      .then(([inferred, provided, basemap, countries]) => {
        provided.features[0].geometry.coordinates[0] =
          provided.features[0].geometry.coordinates[0].reverse()

        inferred.geometries[0].coordinates.forEach((c, i) => {
          inferred.geometries[0].coordinates[i][0] = c[0].reverse()
        })

        const p = geoAlbers().fitExtent(
          [
            [0, 0],
            [400, 180],
          ],
          provided
        )

        const generator = geoPath(p)
        setProjection(() => p)

        let countriesFiltered = topoFeature(
          countries,
          countries.objects['countries']
        )
        countriesFiltered.features = countriesFiltered.features.filter(
          (d) => d.properties.name === 'United States of America'
        )

        setPaths({
          inferred: generator(inferred),
          provided: generator(provided),
          basemap: generator(topoFeature(basemap, basemap.objects['land'])),
          countries: generator(countriesFiltered),
        })
      })
  }, [])

  return (
    <Box>
      <Box
        sx={{
          display: 'block',
          width: '100%',
          position: 'relative',
          overflow: 'clip',
        }}
      >
        <Box as='svg' viewBox={`0 0 400 200`}>
          <animated.g transform={transform}>
            {paths && (
              <>
                <path
                  stroke='none'
                  fill={theme.rawColors.muted}
                  d={paths.basemap}
                />
                <path
                  stroke={theme.rawColors.background}
                  fill='none'
                  d={paths.countries}
                />
                {showInferred && (
                  <path
                    stroke={theme.rawColors.primary}
                    fill={theme.rawColors.primary}
                    style={{ fillOpacity: 1, strokeWidth: 0.05 }}
                    d={paths.inferred}
                  />
                )}
                <path
                  stroke='none'
                  fill={theme.rawColors.green}
                  style={{ fillOpacity: 0.3 }}
                  d={paths.provided}
                />
              </>
            )}
            {projection && (
              <>
                <AnimatedPoint
                  scale={scale}
                  projection={projection}
                  position={[-123.3656, 48.4284]}
                  label='Victoria'
                />
                <AnimatedPoint
                  scale={scale}
                  projection={projection}
                  position={[-123.1207, 49.2827]}
                  label='Vancouver'
                />
              </>
            )}
          </animated.g>
        </Box>
        {projection && (
          <>
            <AnimatedLabel
              projection={projection}
              scale={scale}
              translate={translate}
              position={[-123.0607, 49.4927]}
            >
              Vancouver
            </AnimatedLabel>
            <AnimatedLabel
              projection={projection}
              scale={scale}
              translate={translate}
              position={[-123.2656, 48.6284]}
            >
              Victoria
            </AnimatedLabel>
          </>
        )}
        {showZoom && <Zoom setZoomed={setZoomed} zoomed={zoomed} />}
      </Box>
    </Box>
  )
}

export default Map
