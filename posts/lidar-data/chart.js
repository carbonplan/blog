import { Box, Flex, useThemeUI } from 'theme-ui'
import React from 'react'
import {
  Chart,
  Axis,
  AxisLabel,
  Ticks,
  TickLabels,
  Plot,
  Scatter,
  Line,
  Grid,
  Label,
  useChart,
} from '@carbonplan/charts'
import { Column, Row } from '@carbonplan/components'

import data from './data.json'

const sx = {
  reference: {
    borderLeftWidth: '2px',
    borderStyle: 'dashed',
    opacity: 1,
  },
}

const RANGE = [603260, 603225]

const LINES = [
  ['alternative_ground_peak', 'pink', 'Alternative ground peak'],
  ['ground_peak', 'yellow', 'Ground peak'],
  ['signal_beginning', 'green', 'Signal beginning'],
  ['signal_end', 'green', 'Signal end'],
]

const HEIGHTS = [500, 500, 450, 500]

const SmallTree = () => {
  const { theme } = useThemeUI()
  const { y } = useChart()

  const calculateHeight = (height) =>
    (Math.abs(y(data.alternative_ground_peak) - y(data.signal_beginning)) /
      100) *
    height *
    0.9

  const calculateWidth = (height) => (calculateHeight(height) * 76) / 122

  return (
    <Box
      as='svg'
      sx={{
        display: ['none', 'none', 'initial', 'initial'],
        width: HEIGHTS.map(calculateWidth),
        height: HEIGHTS.map(calculateHeight),
      }}
      viewBox='0 0 76 122'
    >
      <line x1='37' y1='121.5' x2='37' y2='14' stroke={theme.colors.pink} />
      <line
        y1='-0.5'
        x2='20.5922'
        y2='-0.5'
        transform='matrix(-0.806908 -0.590678 0.733561 -0.679623 37.8704 109.762)'
        stroke={theme.colors.pink}
      />
      <line
        y1='-0.5'
        x2='20.1525'
        y2='-0.5'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 37.8704 50.8462)'
        stroke={theme.colors.pink}
      />
      <line
        y1='-0.5'
        x2='20.0263'
        y2='-0.5'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 37.8704 78.2139)'
        stroke={theme.colors.pink}
      />
      <mask id='path-5-inside-1_203_96' fill='white'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M37.4999 0C28.6633 0 21.4999 7.16344 21.4999 16C21.4999 19.5621 22.6639 22.8523 24.6323 25.511C15.6677 25.8359 8.49994 33.2058 8.49994 42.2498C8.49994 47.7141 11.1164 52.5672 15.1649 55.6246C6.62123 56.654 0 63.9287 0 72.7499C0 82.2768 7.72309 89.9999 17.25 89.9999H58.75C68.2769 89.9999 76 82.2768 76 72.7499C76 63.3051 68.4094 55.6331 58.9959 55.5016C62.9526 52.4379 65.4999 47.6413 65.4999 42.2498C65.4999 33.8445 59.3088 26.8852 51.238 25.6834C53.2847 22.9951 54.4999 19.6395 54.4999 16C54.4999 7.16344 47.3364 0 38.4999 0H37.4999Z'
        />
      </mask>
      <path
        d='M24.6323 25.511L24.6685 26.5104L26.5655 26.4416L25.436 24.916L24.6323 25.511ZM15.1649 55.6246L15.2845 56.6175L17.7461 56.3209L15.7675 54.8266L15.1649 55.6246ZM58.9959 55.5016L58.3837 54.7109L56.1227 56.4616L58.9819 56.5015L58.9959 55.5016ZM51.238 25.6834L50.4424 25.0776L49.4178 26.4233L51.0907 26.6724L51.238 25.6834ZM22.4999 16C22.4999 7.71573 29.2156 1 37.4999 1V-1C28.111 -1 20.4999 6.61116 20.4999 16H22.4999ZM25.436 24.916C23.5907 22.4236 22.4999 19.3406 22.4999 16H20.4999C20.4999 19.7835 21.7371 23.281 23.8286 26.106L25.436 24.916ZM24.5961 24.5117C15.0956 24.856 7.49994 32.6657 7.49994 42.2498H9.49994C9.49994 33.746 16.2398 26.8159 24.6685 26.5104L24.5961 24.5117ZM7.49994 42.2498C7.49994 48.0409 10.2743 53.1843 14.5622 56.4226L15.7675 54.8266C11.9586 51.95 9.49994 47.3872 9.49994 42.2498H7.49994ZM15.0452 54.6318C6.00529 55.721 -1 63.4166 -1 72.7499H1C1 64.4408 7.23717 57.5871 15.2845 56.6175L15.0452 54.6318ZM-1 72.7499C-1 82.8291 7.1708 90.9999 17.25 90.9999V88.9999C8.27537 88.9999 1 81.7245 1 72.7499H-1ZM17.25 90.9999H58.75V88.9999H17.25V90.9999ZM58.75 90.9999C68.8292 90.9999 77 82.8291 77 72.7499H75C75 81.7245 67.7246 88.9999 58.75 88.9999V90.9999ZM77 72.7499C77 62.7575 68.9694 54.6409 59.0099 54.5017L58.9819 56.5015C67.8495 56.6254 75 63.8527 75 72.7499H77ZM59.6081 56.2923C63.7989 53.0473 66.4999 47.9638 66.4999 42.2498H64.4999C64.4999 47.3189 62.1063 51.8284 58.3837 54.7109L59.6081 56.2923ZM66.4999 42.2498C66.4999 33.3418 59.9388 25.968 51.3853 24.6943L51.0907 26.6724C58.6788 27.8024 64.4999 34.3472 64.4999 42.2498H66.4999ZM53.4999 16C53.4999 19.4131 52.3611 22.5574 50.4424 25.0776L52.0336 26.2891C54.2083 23.4328 55.4999 19.8658 55.4999 16H53.4999ZM38.4999 1C46.7841 1 53.4999 7.71573 53.4999 16H55.4999C55.4999 6.61116 47.8887 -1 38.4999 -1V1ZM37.4999 1H38.4999V-1H37.4999V1Z'
        fill={theme.colors.pink}
        mask='url(#path-5-inside-1_203_96)'
      />
    </Box>
  )
}
const LargeTree = () => {
  const { theme } = useThemeUI()
  const { y } = useChart()
  const calculateHeight = (height) =>
    (Math.abs(y(data.ground_peak) - y(data.signal_beginning)) / 100) *
    height *
    0.9
  const calculateWidth = (height) => (calculateHeight(height) * 190) / 366

  return (
    <Box
      as='svg'
      sx={{
        display: ['none', 'none', 'initial', 'initial'],
        width: HEIGHTS.map(calculateWidth),
        height: HEIGHTS.map(calculateHeight),
      }}
      viewBox='0 0 190 366'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M93 0C75.3269 0 61 14.3269 61 32C61 39.2239 63.3937 45.8887 67.4312 51.2446C50.8486 53.2524 38 67.3757 38 84.5C38 96.6652 44.4844 107.316 54.1853 113.184C34.4365 115.101 19 131.748 19 152C19 165.52 25.8791 177.432 36.328 184.429C15.459 189.643 0 208.516 0 231C0 257.51 21.4903 279 48 279H142C168.51 279 190 257.51 190 231C190 208.516 174.541 189.643 153.672 184.429C164.121 177.432 171 165.52 171 152C171 131.748 155.564 115.101 135.815 113.184C145.516 107.316 152 96.6652 152 84.5C152 66.7372 138.175 52.2033 120.699 51.071C124.658 45.7451 127 39.1461 127 32C127 14.3269 112.673 0 95 0H93Z'
        fill={theme.colors.background}
      />

      <line x1='94.5' y1='27' x2='94.5' y2='366' stroke={theme.colors.yellow} />
      <line
        y1='-0.5'
        x2='41.1844'
        y2='-0.5'
        transform='matrix(-0.806908 -0.590678 0.733561 -0.679623 94.7407 337.525)'
        stroke={theme.colors.yellow}
      />
      <line
        y1='-0.5'
        x2='40.305'
        y2='-0.5'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 94.7407 227.692)'
        stroke={theme.colors.yellow}
      />
      <line
        y1='-0.5'
        x2='40.0526'
        y2='-0.5'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 96 273.847)'
        stroke={theme.colors.yellow}
      />
      <line
        y1='-0.5'
        x2='40.305'
        y2='-0.5'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 94.7407 93.8062)'
        stroke={theme.colors.yellow}
      />
      <line
        y1='-0.5'
        x2='40.0526'
        y2='-0.5'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 94.7407 160.847)'
        stroke={theme.colors.yellow}
      />
      <mask id='path-7-inside-1_0_1' fill='white'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M93 0C75.3269 0 61 14.3269 61 32C61 39.2239 63.3937 45.8887 67.4312 51.2446C50.8486 53.2524 38 67.3757 38 84.5C38 96.6652 44.4844 107.316 54.1853 113.184C34.4365 115.101 19 131.748 19 152C19 165.52 25.8791 177.432 36.328 184.429C15.459 189.643 0 208.516 0 231C0 257.51 21.4903 279 48 279H142C168.51 279 190 257.51 190 231C190 208.516 174.541 189.643 153.672 184.429C164.121 177.432 171 165.52 171 152C171 131.748 155.564 115.101 135.815 113.184C145.516 107.316 152 96.6652 152 84.5C152 66.7372 138.175 52.2033 120.699 51.071C124.658 45.7451 127 39.1461 127 32C127 14.3269 112.673 0 95 0H93Z'
        />
      </mask>
      <path
        d='M67.4312 51.2446L67.5514 52.2373L69.2746 52.0287L68.2297 50.6426L67.4312 51.2446ZM54.1853 113.184L54.2819 114.18L57.2813 113.888L54.7029 112.329L54.1853 113.184ZM36.328 184.429L36.5703 185.399L38.7579 184.853L36.8844 183.598L36.328 184.429ZM153.672 184.429L153.116 183.598L151.242 184.853L153.43 185.399L153.672 184.429ZM135.815 113.184L135.297 112.329L132.719 113.888L135.718 114.18L135.815 113.184ZM120.699 51.071L119.896 50.4744L118.799 51.95L120.634 52.0689L120.699 51.071ZM62 32C62 14.8792 75.8792 1 93 1V-1C74.7746 -1 60 13.7746 60 32H62ZM68.2297 50.6426C64.3185 45.4542 62 38.9993 62 32H60C60 39.4485 62.469 46.3233 66.6327 51.8466L68.2297 50.6426ZM67.311 50.2518C50.2324 52.3197 37 66.8638 37 84.5H39C39 67.8876 51.4648 54.1851 67.5514 52.2373L67.311 50.2518ZM37 84.5C37 97.0295 43.6798 107.998 53.6677 114.04L54.7029 112.329C45.2889 106.634 39 96.3008 39 84.5H37ZM54.0887 112.189C33.8324 114.155 18 131.228 18 152H20C20 132.268 35.0405 116.047 54.2819 114.18L54.0887 112.189ZM18 152C18 165.867 25.0573 178.085 35.7716 185.26L36.8844 183.598C26.7009 176.779 20 165.172 20 152H18ZM36.0856 183.459C14.782 188.781 -1 208.046 -1 231H1C1 208.986 16.1361 190.504 36.5703 185.399L36.0856 183.459ZM-1 231C-1 258.062 20.9381 280 48 280V278C22.0426 278 1 256.957 1 231H-1ZM48 280H142V278H48V280ZM142 280C169.062 280 191 258.062 191 231H189C189 256.957 167.957 278 142 278V280ZM191 231C191 208.046 175.218 188.781 153.914 183.459L153.43 185.399C173.864 190.504 189 208.986 189 231H191ZM154.228 185.26C164.943 178.085 172 165.867 172 152H170C170 165.172 163.299 176.779 153.116 183.598L154.228 185.26ZM172 152C172 131.228 156.168 114.155 135.911 112.189L135.718 114.18C154.959 116.047 170 132.268 170 152H172ZM136.332 114.04C146.32 107.998 153 97.0295 153 84.5H151C151 96.3008 144.711 106.634 135.297 112.329L136.332 114.04ZM153 84.5C153 66.2066 138.763 51.2393 120.763 50.0731L120.634 52.0689C137.588 53.1674 151 67.2678 151 84.5H153ZM126 32C126 38.9239 123.731 45.3151 119.896 50.4744L121.501 51.6676C125.584 46.175 128 39.3682 128 32H126ZM95 1C112.121 1 126 14.8792 126 32H128C128 13.7746 113.225 -1 95 -1V1ZM93 1H95V-1H93V1Z'
        fill={theme.colors.yellow}
        mask='url(#path-7-inside-1_0_1)'
      />
    </Box>
  )
}

const Trees = () => {
  const { y } = useChart()
  return (
    <Flex
      sx={{
        position: 'absolute',
        gap: 3,
        left: 'calc(100% + 12px)',
        top: `${y(data.signal_beginning) - 2}%`,
        alignContent: 'flex-start',
      }}
    >
      <LargeTree />
      <SmallTree />
    </Flex>
  )
}

const Figure = () => {
  return (
    <Row columns={6}>
      <Column start={1} width={6}>
        <Box
          sx={{
            width: 'calc(0.4 * (100% - 70px) + 70px)',
            height: HEIGHTS,
          }}
        >
          <Chart x={[-0.04, 0.46]} y={RANGE} clamp={false}>
            <Axis left bottom />
            <AxisLabel bottom units='joules'>
              <Box
                as='span'
                sx={{
                  textTransform: 'none',
                  display: ['none', 'none', 'none', 'initial'],
                }}
              >
                LiDAR RETURN
              </Box>
              <Box
                as='span'
                sx={{ display: ['initial', 'initial', 'initial', 'none'] }}
              >
                Return
              </Box>
            </AxisLabel>
            <AxisLabel left units='m' arrow={false}>
              Distance from satellite
            </AxisLabel>
            <Ticks left bottom />
            <TickLabels left format={(d) => d % RANGE[1]} />
            <TickLabels bottom />
            <Grid vertical values={[0.013915494217939783]} sx={sx.reference} />
            <Plot sx={{ position: 'relative' }}>
              <Scatter
                size={5}
                data={data.raw.filter((d) => d[1] > RANGE[1])}
                color='muted'
              />
              <Line
                data={data.smoothed.filter((d) => d[1] > RANGE[1])}
                width={2}
                color='secondary'
              />
              {LINES.map(([key, color]) => (
                <Line
                  key={key}
                  data={[
                    [-0.04, data[key]],
                    [0.5 / 0.4 - 0.04, data[key]],
                  ]}
                  sx={{
                    stroke: color,
                    strokeWidth: 1,
                    strokeDasharray: 4,
                  }}
                />
              ))}
            </Plot>
            <Trees />
            {LINES.map(([key, color, label]) => (
              <Label
                key={key}
                x={0.5 / 0.4 - 0.04}
                align='right'
                verticalAlign='bottom'
                y={data[key]}
                sx={{ color, backgroundColor: 'background' }}
              >
                {label}
              </Label>
            ))}
          </Chart>
        </Box>
      </Column>
    </Row>
  )
}

export default Figure
