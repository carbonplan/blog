import { useState, useRef, useCallback, useEffect } from 'react'
import { Box } from 'theme-ui'
import { useColormap } from '@carbonplan/colormaps'
import { geoPath, geoNaturalEarth1 } from 'd3-geo'
import { feature } from 'topojson-client'
import { minIndex } from 'd3-array'
import ndarray from 'ndarray'
import useZarr from './use-zarr'
import Colorbar from './colorbar'

const prefix = 'https://carbonplan-climatetrace.s3.us-west-2.amazonaws.com/'
const path = 'v0.4/blog/total_emissions.zarr'

const colorize = (colormap, clim) => (value) => {
  value = isNaN(value) || value == 9.969209968386869e36 ? 0 : value
  value = (value - clim[0]) / (clim[1] - clim[0])
  value = Math.min(Math.max(value, 0), 1)
  value = Math.round(value * 254)
  const rgb = colormap[value]
  return [rgb[0], rgb[1], rgb[2], 255]
}

const Figure = () => {
  const width = 360
  const height = 185

  const sourceWidth = 360
  const sourceHeight = 180

  const { data } = useZarr(prefix + path, ['emissions', 'lat', 'lon'])

  const canvas = useRef()
  const colormap = useColormap('fire')
  const [land, setLand] = useState()
  const [projection, ] = useState(() =>
    geoNaturalEarth1()
      .scale((1.3 * width) / (2 * Math.PI))
      .translate([width / 2, height / 2])
  )

  const offsetHeight = Math.round((height - sourceHeight) / 2)

  const target = ndarray(new Float32Array(width * height), [height, width])

  const ref = useCallback((node) => {
    if (node !== null) {
      const context = node.getContext('2d')
      context.clearRect(0, 0, width, height)
      context.imageSmoothingEnabled = false
      const image = context.getImageData(0, 0, width, height)
      canvas.current = { context, image }
    }
  }, [])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json')
      .then((response) => response.json())
      .then((topology) => {
        setLand(feature(topology, topology.objects.land))
      })
  }, [])

  useEffect(() => {
    if (canvas.current && data) {
      const source = data.emissions
      const torgb = colorize(colormap, [0, 50000000])
      const { context, image } = canvas.current
      for (let i = 0; i < sourceWidth; i += 1) {
        for (let j = 0; j < sourceHeight; j += 1) {
          let coords = projection.invert([i, j + offsetHeight])
          let pixels = [
            minIndex(data.lon.data.map((d) => Math.abs(d - coords[0]))),
            minIndex(data.lat.data.map((d) => Math.abs(d - coords[1]))),
          ]
          target.set(
            j,
            i,
            source.get(Math.floor(pixels[1]), Math.floor(pixels[0]))
          )
        }
      }

      const flattened = Array.from(target.data).map(torgb).flat()
      image.data.set(new Uint8ClampedArray(flattened))
      context.putImageData(image, 0, offsetHeight)
    }
  }, [data, year, projection, colormap])

  return (
    <Box as='figure' sx={{ mt: [6, 6, 6, 7], mb: [4, 4, 4, 5] }}>
      <Box sx={{ display: 'block', width: '100%', position: 'relative' }}>
        <Box sx={{ zIndex: 1000, position: 'absolute', left: 0, bottom: 0 }}>
          <Colorbar colormap={'fire'} units={'tCO₂'} clim={[0, 50000000]} />
        </Box>
        <Box
          as='svg'
          viewBox={`0 0 ${width} ${height - 20}`}
          sx={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
        >
          <mask id='circle-mask'>
            <rect x='0' y='0' width='100%' height='100%' fill='#FFFFFF' />
            <path
              fill='#000000'
              id='circle-cutout'
              d={geoPath(projection)({ type: 'Sphere' })}
            />
          </mask>
          <Box
            as='rect'
            x='0'
            y='0'
            width='100%'
            height='100%'
            mask='url(#circle-mask)'
            sx={{ fill: 'background' }}
          />
        </Box>
        <Box
          as='svg'
          viewBox={`0 0 ${width} ${height - 20}`}
          sx={{
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            as='path'
            d={geoPath(projection)(land)}
            sx={{
              vectorEffects: 'non-scaling-stroke',
              stroke: 'primary',
              opacity: 0.7,
              fill: 'none',
              strokeWidth: '0.5px',
            }}
          />
        </Box>
        <Box
          as='canvas'
          id='canvas'
          ref={ref}
          width={`${width}px`}
          height={`${height - 20}px`}
          sx={{ imageRendering: 'pixelated', width: '100%' }}
        />
      </Box>
    </Box>
  )
}

export default Figure
