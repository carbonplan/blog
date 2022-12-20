import { useEffect, useMemo, useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { Column, Expander, Filter, Row, Slider } from '@carbonplan/components'
import { json } from 'd3-fetch'
import { feature } from 'topojson-client'

import Map from './map'
import Distribution from './distribution'
import risks from './risks.json'

const HAZARDS = {
  'FIO LIST': [
    'AVLN',
    'CFLD',
    'CWAV',
    'DRGT',
    'HAIL',
    'HWAV',
    'HRCN',
    'ISTM',
    'LNDS',
    'LTNG',
    'RFLD',
    'SWND',
    'TRND',
    'TSUN',
    'WFIR',
  ],
  'CLIMATE SENSITIVE': ['CFLD', 'DRGT', 'HWAV', 'HRCN', 'LNDS', 'RFLD', 'WFIR'],
  ALL: [
    'WNTW',
    'VLCN',
    'ERQK',
    'AVLN',
    'CFLD',
    'CWAV',
    'DRGT',
    'HAIL',
    'HWAV',
    'HRCN',
    'ISTM',
    'LNDS',
    'LTNG',
    'RFLD',
    'SWND',
    'TRND',
    'TSUN',
    'WFIR',
  ],
}

const HAZARD_LABELS = {
  AVLN: 'Avalanche',
  CFLD: 'Coastal flooding',
  CWAV: 'Cold waves',
  HAIL: 'Hail',
  HWAV: 'Heat wave',
  HRCN: 'Hurricane',
  ISTM: 'Icestorm',
  LNDS: 'Landslide',
  LTNG: 'Lightning',
  RFLD: 'River flooding',
  SWND: 'Wind',
  TRND: 'Tornado',
  TSUN: 'Tsunami',
  WFIR: 'Wildfire',
  WNTW: 'Winter weather',
  VLCN: 'Volcano',
  ERQK: 'Earthquake',
  DRGT: 'Drought',
}

const SUFFIXES = {
  agriculture: 'EALA',
  buildings: 'EALB',
  population: 'EALPE',
}

const getStateTotals = (hazards, lossTypes) => {
  return Object.keys(risks).reduce((accum, stateName) => {
    const total = hazards.reduce(
      (sum, hazardName) =>
        sum +
        Object.keys(lossTypes)
          .filter((k) => lossTypes[k])
          .reduce(
            (innerSum, lossType) =>
              innerSum +
              (risks[stateName][`${hazardName}_${SUFFIXES[lossType]}`] ?? 0),
            0
          ),
      0
    )
    accum.push([stateName, total])
    return accum
  }, [])
}

const FIO_TOTALS = getStateTotals(HAZARDS['FIO LIST'], {
  agriculture: true,
  buildings: true,
  population: true,
})
const FIO_TOP_TEN = FIO_TOTALS.sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map((d) => d[0])

const heights = [
  '200px',
  'calc(5 / 8 * (4 * (100vw - 9 * 32px) / 8 + 3 * 32px + 50px))',
  'calc(5 / 8 * (4 * (100vw - 13 * 32px) / 12 + 3 * 32px))',
  'calc(5 / 8 * (4 * (100vw - 13 * 48px) / 12 + 3 * 48px))',
]

const States = () => {
  const [hazardKey, setHazardKey] = useState('CLIMATE SENSITIVE')
  const [hazardsList, setHazardsList] = useState(HAZARDS['CLIMATE SENSITIVE'])
  const [lossTypes, setLossTypes] = useState({
    agriculture: false,
    buildings: true,
    population: false,
  })
  const [expanded, setExpanded] = useState(false)
  const [count, setCount] = useState(10)
  const [stateData, setStateData] = useState(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    json(
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/states-albers-10m.json'
    ).then((us) => setStateData(feature(us, us.objects.states)))
  }, [])

  const totals = useMemo(
    () => getStateTotals(hazardsList, lossTypes),
    [hazardsList, lossTypes]
  )
  const selection = useMemo(
    () =>
      totals.every((d) => d[1] === 0)
        ? []
        : totals
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map((d) => d[0]),
    [totals, count]
  )

  return (
    <>
      <Row columns={6}>
        <Column start={1} width={[6, 4, 4, 4]}>
          <Map
            data={stateData}
            fioSelection={FIO_TOP_TEN}
            selection={selection}
            hovered={hovered}
            setHovered={setHovered}
          />
        </Column>
        <Column start={[1, 5, 5, 5]} width={[6, 2, 2, 2]}>
          <Distribution
            totals={totals}
            count={count}
            hovered={hovered}
            height={heights}
          />
          <Slider
            min={1}
            max={51}
            step={1}
            onChange={(e) => setCount(parseFloat(e.target.value))}
            value={count}
            sx={{
              width: heights.map((h) => `calc(${h} - 36px)`),
              transform: heights.map(
                (h, i) =>
                  `rotate(270deg) translate(50%, calc(-0.5 * (${h} - 36px ${
                    i === 0 ? '- 65px' : ''
                  })))`
              ),
              height: 0,
              mt: '-46px',
            }}
          />
        </Column>
      </Row>
      <Row columns={6} sx={{ mt: [3, 3, 4, 4] }}>
        <Column start={1} width={[6, 3, 3, 3]}>
          <Box
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              fontSize: [1, 1, 1, 2],
              color: 'secondary',
              userSelect: 'none',
              textTransform: 'uppercase',
              mb: ['6px'],
            }}
          >
            Hazards
          </Box>
          <Flex sx={{ alignItems: 'flex-end' }}>
            <Filter
              values={{
                'FIO LIST': hazardKey === 'FIO LIST',
                'CLIMATE SENSITIVE': hazardKey === 'CLIMATE SENSITIVE',
                CUSTOM: hazardKey === 'CUSTOM',
              }}
              colors={{
                'FIO LIST': 'blue',
                'CLIMATE SENSITIVE': 'blue',
                CUSTOM: 'blue',
              }}
              setValues={(obj) => {
                const key = Object.keys(obj).find((k) => obj[k])
                if (key === 'FIO LIST') {
                  setCount(10)
                  setLossTypes({
                    agriculture: true,
                    buildings: true,
                    population: true,
                  })
                }

                setHazardKey(key)
                if (key === 'CUSTOM') {
                  setExpanded(true)
                } else {
                  setHazardsList(HAZARDS[key])
                }
              }}
            />
            <Expander
              value={expanded}
              onClick={() => {
                setExpanded(!expanded)
              }}
              sx={{ mb: '8px', width: 19, height: 19 }}
            />
          </Flex>

          {expanded && (
            <Filter
              values={HAZARDS.ALL.reduce(
                (accum, h) => ({
                  ...accum,
                  [HAZARD_LABELS[h] ?? h]: hazardsList.includes(h),
                }),
                {}
              )}
              setValues={(obj) => {
                const list = Object.keys(obj)
                  .filter((k) => obj[k])
                  .map(
                    (label) =>
                      Object.keys(HAZARD_LABELS).find(
                        (key) => HAZARD_LABELS[key] === label
                      ) ?? label
                  )

                setHazardKey('CUSTOM')
                setHazardsList(list)
              }}
              multiSelect
            />
          )}
        </Column>
        <Column start={[1, 4, 4, 4]} width={[6, 3, 3, 3]}>
          <Box
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              fontSize: [1, 1, 1, 2],
              color: 'secondary',
              userSelect: 'none',
              textTransform: 'uppercase',
              mb: ['6px'],
            }}
          >
            Loss type
          </Box>
          <Filter
            values={lossTypes}
            colors={{
              agriculture: 'blue',
              buildings: 'blue',
              population: 'blue',
            }}
            setValues={(obj) => setLossTypes({ ...obj })}
            multiSelect
            sx={{ mt: [3, 0, 0, 0] }}
          />
        </Column>
      </Row>
    </>
  )
}

export default States
