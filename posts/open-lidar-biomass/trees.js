import { Box, Flex, useThemeUI } from 'theme-ui'
import { useChart } from '@carbonplan/charts'

import data from './data.json'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [0, 0, 0, 1],
    position: 'absolute',
    top: 2,
    right: 2,
    bg: 'background',
  },
}

const SmallTree = ({ height, sx }) => {
  const { theme } = useThemeUI()

  return (
    <Box
      as='svg'
      sx={{
        height,
        width: height.map((h) => (h * 78) / 123),
        ...sx,
      }}
      strokeWidth='1.5'
      viewBox='0 0 78 123'
    >
      <line
        x1='37.75'
        y1='122.5'
        x2='37.75'
        y2='15'
        stroke={theme.colors.pink}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='20.5922'
        y2='-0.75'
        transform='matrix(-0.806908 -0.590678 0.733561 -0.679623 38.8706 110.762)'
        stroke={theme.colors.pink}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='20.1525'
        y2='-0.75'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 38.8706 51.8462)'
        stroke={theme.colors.pink}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='20.0263'
        y2='-0.75'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 38.8706 79.2139)'
        stroke={theme.colors.pink}
        vectorEffect='non-scaling-stroke'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M38.5001 1.04995C29.6911 1.04995 22.5501 8.19101 22.5501 17C22.5501 20.551 23.7104 23.8308 25.6727 26.4812L25.7292 26.5575L25.6343 26.5609C16.6965 26.8849 9.55014 34.2328 9.55014 43.2498C9.55014 48.6977 12.1587 53.5363 16.1952 56.5847L16.2941 56.6594L16.171 56.6742C7.65222 57.7006 1.0502 64.9543 1.0502 73.7499C1.0502 83.2492 8.7509 90.9499 18.2502 90.9499H59.7502C69.2495 90.9499 76.9502 83.2492 76.9502 73.7499C76.9502 64.3324 69.3816 56.6827 59.9954 56.5516L59.8524 56.5496L59.9655 56.462C63.9105 53.4074 66.4501 48.6252 66.4501 43.2498C66.4501 34.8696 60.2775 27.931 52.2308 26.7328L52.1472 26.7203L52.1984 26.653C54.2387 23.9732 55.4501 20.6281 55.4501 17C55.4501 8.19101 48.309 1.04995 39.5001 1.04995H38.5001ZM22.4501 17C22.4501 8.13578 29.6359 0.949951 38.5001 0.949951H39.5001C48.3642 0.949951 55.5501 8.13578 55.5501 17C55.5501 20.6205 54.3512 23.9612 52.3288 26.6465C60.383 27.8872 66.5501 34.8482 66.5501 43.2498C66.5501 48.6067 64.0429 53.3779 60.1381 56.4541C69.5135 56.6604 77.0502 64.325 77.0502 73.7499C77.0502 83.3044 69.3047 91.0499 59.7502 91.0499H18.2502C8.69567 91.0499 0.950195 83.3044 0.950195 73.7499C0.950195 64.9451 7.52771 57.6767 16.0372 56.5901C12.0324 53.5196 9.45014 48.6862 9.45014 43.2498C9.45014 34.2105 16.589 26.8387 25.5364 26.4647C23.5957 23.8111 22.4501 20.5392 22.4501 17Z'
        stroke={theme.colors.pink}
        strokeWidth='1.25'
      />
    </Box>
  )
}
const LargeTree = ({ height, sx }) => {
  const { theme } = useThemeUI()
  return (
    <Box
      as='svg'
      sx={{
        height,
        width: height.map((h) => (h * 192) / 367),
        ...sx,
      }}
      strokeWidth='1.5'
      viewBox='0 0 192 367'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M94 1C76.3269 1 62 15.3269 62 33C62 40.6236 64.6659 47.6245 69.1163 53.1214C51.8309 57.333 39 72.9181 39 91.5C39 101.986 43.0861 111.518 49.7529 118.59C32.2929 125.772 20 142.95 20 163C20 175.364 24.6747 186.636 32.353 195.145C13.827 203.849 1 222.677 1 244.5C1 274.6 25.4005 299 55.5 299H136.5C166.6 299 191 274.6 191 244.5C191 222.677 178.173 203.849 159.647 195.145C167.325 186.636 172 175.364 172 163C172 142.95 159.707 125.772 142.247 118.59C148.914 111.518 153 101.986 153 91.5C153 72.3135 139.32 56.322 121.183 52.7466C125.453 47.3079 128 40.4514 128 33C128 15.3269 113.673 1 96 1H94Z'
        fill={theme.colors.background}
      />
      <line
        x1='95.75'
        y1='28'
        x2='95.75'
        y2='367'
        stroke={theme.colors.yellow}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='41.1844'
        y2='-0.75'
        transform='matrix(-0.806908 -0.590678 0.733561 -0.679623 95.7407 338.525)'
        stroke={theme.colors.yellow}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='40.305'
        y2='-0.75'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 95.7407 228.692)'
        stroke={theme.colors.yellow}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='40.0526'
        y2='-0.75'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 97 274.847)'
        stroke={theme.colors.yellow}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='40.305'
        y2='-0.75'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 95.7407 104.806)'
        stroke={theme.colors.yellow}
        vectorEffect='non-scaling-stroke'
      />
      <line
        y1='-0.75'
        x2='40.0526'
        y2='-0.75'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 95.7407 170.847)'
        stroke={theme.colors.yellow}
        vectorEffect='non-scaling-stroke'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M94.0011 1.09963C76.3648 1.09963 62.0679 15.3514 62.0679 32.9317C62.0679 40.5153 64.7281 47.4794 69.1693 52.9475L69.2189 53.0086L69.1422 53.0272C51.8879 57.2181 39.08 72.7261 39.08 91.2159C39.08 101.65 43.1587 111.135 49.8136 118.172L49.8634 118.224L49.7963 118.252C32.3635 125.4 20.09 142.497 20.09 162.452C20.09 174.758 24.7573 185.976 32.4236 194.445L32.4687 194.495L32.4077 194.524C13.9083 203.188 1.09995 221.928 1.09995 243.651C1.09995 273.612 25.4652 297.9 55.5213 297.9H136.479C166.535 297.9 190.9 273.612 190.9 243.651C190.9 221.928 178.092 203.188 159.592 194.524L159.531 194.495L159.576 194.445C167.243 185.976 171.91 174.758 171.91 162.452C171.91 142.497 159.636 125.4 142.204 118.252L142.137 118.224L142.186 118.172C148.841 111.135 152.92 101.65 152.92 91.2159C152.92 72.1244 139.265 56.212 121.16 52.6544L121.08 52.6387L121.13 52.5747C125.392 47.1646 127.933 40.3441 127.933 32.9317C127.933 15.3514 113.636 1.09963 96 1.09963H94.0011ZM61.9679 32.9317C61.9679 15.2963 76.3096 1 94.0011 1H96C113.691 1 128.033 15.2963 128.033 32.9317C128.033 40.338 125.504 47.1555 121.259 52.5724C139.37 56.1701 153.02 72.104 153.02 91.2159C153.02 101.65 148.951 111.138 142.309 118.187C159.742 125.366 172.01 142.481 172.01 162.452C172.01 174.759 167.351 185.982 159.696 194.462C178.196 203.154 191 221.912 191 243.651C191 273.667 166.59 298 136.479 298H55.5213C25.41 298 1 273.667 1 243.651C1 221.912 13.804 203.154 32.3043 194.462C24.6488 185.982 19.99 174.759 19.99 162.452C19.99 142.481 32.2579 125.366 49.6912 118.187C43.0489 111.138 38.98 101.65 38.98 91.2159C38.98 72.7064 51.7826 57.1778 69.0421 52.9491C64.6168 47.4732 61.9679 40.5108 61.9679 32.9317Z'
        stroke={theme.colors.yellow}
        strokeWidth='2'
      />
    </Box>
  )
}

const Trees = ({ heights }) => {
  const { x, y } = useChart()
  const xPosition = x(0.5)
  return (
    <>
      <Flex
        sx={{
          position: 'absolute',
          gap: 3,
          left: [
            `calc(${xPosition}% + 28px)`,
            `calc(${xPosition}% + 28px)`,
            `calc(${xPosition}% + 28px)`,
            `calc(${xPosition}% + 64px)`,
          ],
          top: `${y(data.signal_beginning) - 2}%`,
          alignContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: ['none', 'none', 'initial', 'initial'],
            position: 'relative',
          }}
        >
          <LargeTree
            height={heights.map(
              (height, i) =>
                (Math.abs(y(data.ground_peak) - y(data.signal_beginning)) /
                  100) *
                height *
                (0.88 + i * 0.005)
            )}
          />
          <Box sx={{ ...sx.label, color: 'yellow' }}>
            {(data.ground_peak - data.signal_beginning).toFixed(1)} m
          </Box>
        </Box>

        <Box
          sx={{
            display: ['none', 'none', 'initial', 'initial'],
            position: 'relative',
          }}
        >
          <SmallTree
            height={heights.map(
              (height, i) =>
                (Math.abs(
                  y(data.alternative_ground_peak) - y(data.signal_beginning)
                ) /
                  100) *
                height *
                (0.88 + i * 0.005)
            )}
          />
          <Box sx={{ ...sx.label, color: 'pink' }}>
            {(data.alternative_ground_peak - data.signal_beginning).toFixed(1)}{' '}
            m
          </Box>
        </Box>
      </Flex>
    </>
  )
}
export default Trees
