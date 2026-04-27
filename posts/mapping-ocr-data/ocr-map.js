// @ts-nocheck
/* cspell:words maplibre pmtiles protomaps namedflavor basemap basemaps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Flex, Grid, useColorMode, useThemeUI, get } from 'theme-ui'
import { mix } from '@theme-ui/color'
import { Badge, Row, Column } from '@carbonplan/components'
import { Chart, AxisLabel } from '@carbonplan/charts'
import { useColormap } from '@carbonplan/colormaps'
import {
  Map as MapLibre,
  AttributionControl,
  NavigationControl,
  addProtocol,
  removeProtocol,
} from 'maplibre-gl'
import { Protocol } from 'pmtiles'
import { layers as protomapsLayers, namedFlavor } from '@protomaps/basemaps'
import { ZarrLayer } from '@carbonplan/zarr-layer'

const DATA_VERSION = 'v1.1.0'
const BASE_S3 = 'https://carbonplan-ocr.s3.amazonaws.com/output/fire-risk'
const BUILDINGS_URL = `${BASE_S3}/vector/production/${DATA_VERSION}/pmtiles/buildings.pmtiles`
const BUILDING_POINTS_URL = `${BASE_S3}/vector/production/${DATA_VERSION}/pmtiles/building_centroids.pmtiles`
const ZARR_URL = `${BASE_S3}/pyramid/production/${DATA_VERSION}/pyramid.zarr`
const BASEMAP_URL =
  'https://carbonplan-maps.s3.us-west-2.amazonaws.com/basemaps/pmtiles/global.pmtiles'
const GLYPHS_URL =
  'https://carbonplan-maps.s3.us-west-2.amazonaws.com/basemaps/fonts/{fontstack}/{range}.pbf'

const VECTOR_RISK_KEY = '0'
const ZARR_RISK_VARIABLE = 'rps_2011'
const BIN_BOUNDARIES = [0, 0.01, 0.02, 0.035, 0.06, 0.1, 0.2, 0.5, 1, 3]
const COLORMAP_OFFSET = 2
const COLORMAP_COUNT = BIN_BOUNDARIES.length + COLORMAP_OFFSET
const ZARR_BOUNDS = [
  -128.3875562194317, 22.428114227623336, -64.05348689808879, 52.4818488914143,
]
const ZARR_FILL_VALUE = 9.969209968386869e36

const LAYER_IDS = {
  buildingsFill: 'risk-buildings-fill',
  buildingsLine: 'risk-buildings-line',
  buildingPoints: 'building-points-circle',
  zarr: 'zarr-raster-layer',
}

const buildFlavor = (colorMode, theme) => {
  const isDark = colorMode === 'dark'
  const flavorName = isDark ? 'black' : 'white'
  const transparent = 'transparent'
  const hinted = get(theme, 'rawColors.hinted')
  const primary = get(theme, 'rawColors.primary')
  const secondary = get(theme, 'rawColors.secondary')
  const muted = get(theme, 'rawColors.muted')
  const background = get(theme, 'rawColors.background')

  return {
    ...namedFlavor(flavorName),
    buildings: transparent,
    background: transparent,
    park_a: transparent,
    park_b: transparent,
    hospital: transparent,
    industrial: transparent,
    school: transparent,
    wood_a: transparent,
    wood_b: transparent,
    pedestrian: transparent,
    scrub_a: transparent,
    scrub_b: transparent,
    glacier: transparent,
    sand: transparent,
    beach: transparent,
    aerodrome: transparent,
    runway: transparent,
    earth: transparent,
    zoo: transparent,
    military: transparent,

    landcover: {
      barren: transparent,
      farmland: transparent,
      forest: transparent,
      glacier: transparent,
      grassland: transparent,
      scrub: transparent,
      urban_area: transparent,
    },

    water: hinted,

    bridges_other_casing: background,
    bridges_minor_casing: background,
    bridges_link_casing: background,
    bridges_major_casing: background,
    bridges_highway_casing: background,
    bridges_other: muted,
    bridges_minor: muted,
    bridges_link: muted,
    bridges_major: muted,
    bridges_highway: muted,

    minor_service_casing: background,
    minor_casing: background,
    link_casing: background,
    major_casing_late: background,
    highway_casing_late: background,
    other: muted,
    minor_service: muted,
    minor_a: muted,
    minor_b: muted,
    link: muted,
    major_casing_early: background,
    major: muted,
    highway_casing_early: background,
    highway: muted,
    pier: muted,

    railway: muted,
    boundaries: secondary,

    roads_label_minor: [
      'interpolate',
      ['linear'],
      ['zoom'],
      12,
      secondary,
      26,
      primary,
    ],
    roads_label_minor_halo: background,
    roads_label_major: [
      'interpolate',
      ['linear'],
      ['zoom'],
      12,
      secondary,
      26,
      primary,
    ],
    roads_label_major_halo: background,
    ocean_label: secondary,
    subplace_label: [
      'interpolate',
      ['linear'],
      ['zoom'],
      8,
      secondary,
      22,
      primary,
    ],
    subplace_label_halo: background,
    city_label: [
      'interpolate',
      ['linear'],
      ['zoom'],
      8,
      secondary,
      22,
      primary,
    ],
    city_label_halo: background,
    state_label: secondary,
    state_label_halo: background,
    country_label: secondary,

    address_label: secondary,
    address_label_halo: background,

    regular: 'Relative Pro Book',
    bold: 'Relative Pro Book',
    italic: 'Relative Pro Book',
  }
}

const useRiskColormap = () => {
  const [colorMode] = useColorMode()
  const { theme } = useThemeUI()
  const mode = colorMode === 'dark' ? 'dark' : 'light'
  const base = useColormap('reds', {
    mode,
    format: 'hex',
    count: COLORMAP_COUNT,
  })

  return useMemo(
    () => [
      mix('muted', 'background', 0.3)(theme),
      ...base.slice(COLORMAP_OFFSET),
    ],
    [base, theme]
  )
}

const buildColorExpression = (colormap) => {
  if (!colormap?.length) return 'transparent'
  const value = ['to-number', ['get', VECTOR_RISK_KEY]]
  const steps = []
  BIN_BOUNDARIES.forEach((boundary, i) => {
    if (i + 1 < colormap.length) steps.push(boundary, colormap[i + 1])
  })
  const discrete = ['step', value, colormap[0], ...steps]
  return ['case', ['==', value, 0], colormap[0], discrete]
}

const buildZarrCustomFrag = () => {
  const binConditions = BIN_BOUNDARIES.slice(0, -1)
    .map((_, i) => {
      const keyword = i === 0 ? 'if' : 'else if'
      return `
      ${keyword} (value < ${BIN_BOUNDARIES[i + 1].toFixed(6)}) {
        binIndex = ${i}.0;
      }`
    })
    .join('')
  const lastBinIndex = BIN_BOUNDARIES.length - 1
  return `
    float value = ${ZARR_RISK_VARIABLE};
    if (value == fillValue || value == 0.0) {
      fragColor = vec4(0.0);
      return;
    }
    float binIndex = 0.0;
    ${binConditions} else {
      binIndex = ${lastBinIndex}.0;
    }
    // Offset by 1 to match buildings layer which uses colormap[i+1] for bin i
    // +0.5 to center the bin in the colormap.
    float rescaled = (binIndex + 1.5) / ${BIN_BOUNDARIES.length + 1}.0;
    vec4 c = texture(colormap, vec2(clamp(rescaled, 0.0, 1.0), 0.5));
    fragColor = vec4(c.rgb, opacity);
  `
}

const useMapControlStyles = () => {
  const { theme } = useThemeUI()
  const primary = get(theme, 'rawColors.primary')
  const secondary = get(theme, 'rawColors.secondary')
  const enc = encodeURIComponent

  return {
    '& .maplibregl-control-container': {
      textTransform: 'uppercase',
      fontSize: [0, 0, 1, 1],
      fontFamily: 'mono',
      letterSpacing: 'mono',
      '& [class*="maplibregl-ctrl-"]': { zIndex: 0 },
      '& .maplibregl-ctrl-attrib': {
        bg: 'hinted',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'secondary',
        color: 'secondary',
        display: 'flex',
        '& a': { color: 'secondary' },
        '& .maplibregl-ctrl-attrib-button': {
          bg: 'hinted',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill-rule='evenodd' viewBox='0 0 20 20'%3E%3Cpath fill='${enc(
            secondary
          )}' d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E")`,
          '&:hover, &:focus-visible': {
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill-rule='evenodd' viewBox='0 0 20 20'%3E%3Cpath fill='${enc(
              secondary
            )}' d='M4 10a6 6 0 1 0 12 0 6 6 0 1 0-12 0m5-3a1 1 0 1 0 2 0 1 1 0 1 0-2 0m0 3a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0'/%3E%3C/svg%3E")`,
          },
        },
      },
      '& .maplibregl-ctrl-group': {
        bg: 'hinted',
        border: '1px solid',
        borderColor: 'secondary',
        borderRadius: '20px',
        boxShadow: 'none',
        overflow: 'hidden',
        '& button': {
          bg: 'hinted',
          border: 'none',
          borderBottom: '1px solid',
          borderColor: 'secondary',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:last-child': { borderBottom: 'none' },
          '& .maplibregl-ctrl-icon': {
            backgroundSize: '20px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          },
        },
        '& .maplibregl-ctrl-zoom-in .maplibregl-ctrl-icon': {
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath stroke='${enc(
            primary
          )}' stroke-width='2' stroke-linecap='round' fill='none' d='M10 6v8M6 10h8'/%3E%3C/svg%3E")`,
        },
        '& .maplibregl-ctrl-zoom-in:hover .maplibregl-ctrl-icon, & .maplibregl-ctrl-zoom-in:focus-visible .maplibregl-ctrl-icon':
          {
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath stroke='${enc(
              secondary
            )}' stroke-width='2' stroke-linecap='round' fill='none' d='M10 6v8M6 10h8'/%3E%3C/svg%3E")`,
          },
        '& .maplibregl-ctrl-zoom-out .maplibregl-ctrl-icon': {
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath stroke='${enc(
            primary
          )}' stroke-width='2' stroke-linecap='round' fill='none' d='M6 10h8'/%3E%3C/svg%3E")`,
        },
        '& .maplibregl-ctrl-zoom-out:hover .maplibregl-ctrl-icon, & .maplibregl-ctrl-zoom-out:focus-visible .maplibregl-ctrl-icon':
          {
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath stroke='${enc(
              secondary
            )}' stroke-width='2' stroke-linecap='round' fill='none' d='M6 10h8'/%3E%3C/svg%3E")`,
          },
      },
    },
  }
}

const getBuildingLayerSpecs = () => [
  {
    id: LAYER_IDS.buildingPoints,
    type: 'circle',
    source: 'buildingPoints',
    'source-layer': 'risk',
    paint: {
      'circle-color': 'transparent',
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 11, 1, 13, 2],
      'circle-opacity': ['interpolate', ['linear'], ['zoom'], 14, 1, 14.5, 0],
    },
  },
  {
    id: LAYER_IDS.buildingsFill,
    type: 'fill',
    source: 'buildings',
    'source-layer': 'risk',
    paint: { 'fill-color': 'transparent' },
  },
  {
    id: LAYER_IDS.buildingsLine,
    type: 'line',
    source: 'buildings',
    'source-layer': 'risk',
    paint: {
      'line-color': 'transparent',
      'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0, 14, 0.3],
    },
  },
]

const insertBeforeBuildings = (baseLayers, extras) => {
  const index = baseLayers.findIndex((l) => l.id === 'buildings')
  if (index < 0) return [...baseLayers, ...extras]
  return [...baseLayers.slice(0, index), ...extras, ...baseLayers.slice(index)]
}

const OcrMap = () => {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const zarrLayerRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [showZarr, setShowZarr] = useState(false)
  const { theme } = useThemeUI()
  const [colorMode] = useColorMode()

  const colormap = useRiskColormap()
  const controlStyles = useMapControlStyles()

  useEffect(() => {
    if (!containerRef.current) return

    const protocol = new Protocol()
    addProtocol('pmtiles', protocol.tile)

    const flavor = buildFlavor(colorMode, theme)
    const basemapLayers = protomapsLayers('basemap', flavor, { lang: 'en' })
    const initialLayers = insertBeforeBuildings(
      basemapLayers,
      getBuildingLayerSpecs()
    )

    const sources = {
      basemap: {
        type: 'vector',
        url: `pmtiles://${BASEMAP_URL}`,
        attribution:
          '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
      },
      buildings: {
        type: 'vector',
        url: `pmtiles://${BUILDINGS_URL}`,
        minzoom: 6,
      },
      buildingPoints: {
        type: 'vector',
        url: `pmtiles://${BUILDING_POINTS_URL}`,
      },
    }

    const map = new MapLibre({
      container: containerRef.current,
      style: {
        version: 8,
        glyphs: GLYPHS_URL,
        sources,
        layers: initialLayers,
        projection: { type: 'globe' },
      },
      center: [-97.58, 38],
      zoom: 3,
      minZoom: 2,
      maxZoom: 16.75,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
    })
    map.touchZoomRotate.disableRotation()
    map.keyboard.disable()

    map.addControl(new AttributionControl({ compact: true }), 'bottom-right')
    map.addControl(
      new NavigationControl({ showCompass: false, visualizePitch: false }),
      'bottom-left'
    )

    mapRef.current = map
    map.once('load', () => setMapReady(true))

    return () => {
      map.remove()
      removeProtocol('pmtiles')
      mapRef.current = null
      zarrLayerRef.current = null
      setMapReady(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    const colorExpr = buildColorExpression(colormap)
    const lineColor = get(theme, 'rawColors.secondary')

    if (map.getLayer(LAYER_IDS.buildingsFill)) {
      map.setPaintProperty(LAYER_IDS.buildingsFill, 'fill-color', colorExpr)
    }
    if (map.getLayer(LAYER_IDS.buildingsLine)) {
      map.setPaintProperty(LAYER_IDS.buildingsLine, 'line-color', lineColor)
    }
    if (map.getLayer(LAYER_IDS.buildingPoints)) {
      map.setPaintProperty(LAYER_IDS.buildingPoints, 'circle-color', colorExpr)
    }
  }, [colormap, mapReady, theme])

  // Apply basemap theme changes in place (mirrors ocr-web/components/map.tsx).
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    const flavor = buildFlavor(colorMode, theme)
    const newLayers = protomapsLayers('basemap', flavor, { lang: 'en' })
    newLayers.forEach((layerSpec) => {
      if (!map.getLayer(layerSpec.id)) return
      if (layerSpec.paint) {
        for (const [key, value] of Object.entries(layerSpec.paint)) {
          map.setPaintProperty(layerSpec.id, key, value)
        }
      }
    })
  }, [colorMode, theme, mapReady])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    if (!showZarr) {
      if (zarrLayerRef.current && map.getLayer(LAYER_IDS.zarr)) {
        map.removeLayer(LAYER_IDS.zarr)
      }
      zarrLayerRef.current = null
      return
    }

    const layer = new ZarrLayer({
      id: LAYER_IDS.zarr,
      source: ZARR_URL,
      variable: ZARR_RISK_VARIABLE,
      colormap,
      clim: [BIN_BOUNDARIES[0], BIN_BOUNDARIES[BIN_BOUNDARIES.length - 1]],
      fillValue: ZARR_FILL_VALUE,
      customFrag: buildZarrCustomFrag(),
      zarrVersion: 3,
      bounds: ZARR_BOUNDS,
      latIsAscending: true,
    })
    zarrLayerRef.current = layer
    map.addLayer(layer, LAYER_IDS.buildingsFill)

    return () => {
      if (map.getLayer(LAYER_IDS.zarr)) {
        map.removeLayer(LAYER_IDS.zarr)
      }
      zarrLayerRef.current = null
    }
    // colormap is intentionally excluded — it is synced via a separate effect
    // so we don't tear down / rebuild the layer on theme changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showZarr, mapReady])

  useEffect(() => {
    if (zarrLayerRef.current?.setColormap) {
      zarrLayerRef.current.setColormap(colormap)
    }
  }, [colormap])

  const toggleZarr = useCallback(() => setShowZarr((s) => !s), [])

  return (
    <>
      <Row columns={6}>
        <Column start={[1, 1, 1, 1]} width={[6, 6, 6, 5]}>
          <Box
            ref={containerRef}
            sx={{
              position: 'relative',
              width: '100%',
              height: '400px',
              mb: 3,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'muted',
              ...controlStyles,
            }}
          >
            <Box
              as='button'
              onClick={toggleZarr}
              sx={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                zIndex: 1,
                appearance: 'none',
                fontFamily: 'mono',
                fontSize: [0, 0, 1, 1],
                letterSpacing: 'mono',
                textTransform: 'uppercase',
                color: 'primary',
                bg: 'hinted',
                border: '1px solid',
                borderColor: 'secondary',
                borderRadius: '20px',
                px: 2,
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                '&:hover, &:focus-visible': { color: 'secondary' },
              }}
            >
              Raster
              <Box
                as='svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                sx={{ width: '18px', height: '18px' }}
              >
                <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                <circle
                  cx='12'
                  cy='12'
                  r='3'
                  fill={showZarr ? 'currentColor' : 'none'}
                />
              </Box>
            </Box>
          </Box>
        </Column>
      </Row>
      <Row columns={6}>
        <Column start={[1, 1, 1, 1]} width={[6, 6, 6, 3]}>
          <Flex
            sx={{
              gap: '2px',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <Grid
              sx={{
                flexGrow: 1,
                gridTemplateColumns: 'repeat(11, 1fr)',
                gridGap: '2px',
              }}
            >
              {Array(11)
                .fill(null)
                .map((_, i) => (
                  <Flex key={i} sx={{ position: 'relative' }}>
                    {i >= 2 &&
                      (() => {
                        const str = String(BIN_BOUNDARIES[i - 1])
                        const digitCount = str.replace(/\D/g, '').length
                        const formattedStr =
                          digitCount > 2 ? str.replace(/^0(?=\.)/, '') : str
                        const displayText = `${formattedStr}%${
                          i === BIN_BOUNDARIES.length ? '+' : ''
                        }`
                        return (
                          <>
                            <Box
                              sx={{
                                position: 'absolute',
                                height: '5px',
                                bottom: '-12px',
                                left: '-2.5px',
                                color: 'secondary',
                                borderStyle: 'solid',
                                borderWidth: '0px',
                                borderLeftWidth: '1px',
                              }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: '-28px',
                                left: `-${displayText.length * 4.2}px`,
                                fontSize: 0,
                                fontFamily: 'mono',
                                letterSpacing: 'mono',
                                color: 'secondary',
                                userSelect: 'none',
                              }}
                            >
                              {displayText}
                            </Box>
                          </>
                        )
                      })()}
                    <Badge
                      sx={{
                        width: '100%',
                        fontSize: [0, 0, 1, 1],
                        height: [18, 18, 21, 21],
                        backgroundColor: colormap[i],
                        color: i === 0 ? 'secondary' : 'primary',
                      }}
                    >
                      {i}
                    </Badge>
                  </Flex>
                ))}
            </Grid>
          </Flex>
          <Box sx={{ width: '100%', mt: '50px', pb: 1 }}>
            <Chart x={[0, 1]} y={[0, 1]}>
              <AxisLabel
                bottom
                units='%'
                sx={{
                  color: 'secondary',
                  '& svg': { fill: 'secondary' },
                }}
              >
                Risk of loss
              </AxisLabel>
            </Chart>
          </Box>
        </Column>
      </Row>
    </>
  )
}

export default OcrMap
