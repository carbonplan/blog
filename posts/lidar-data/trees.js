import { Box, useThemeUI } from 'theme-ui'

const style = { vectorEffect: 'non-scaling-stroke' }
export const SmallTree = ({ height, sx }) => {
  const { theme } = useThemeUI()

  return (
    <Box
      as='svg'
      sx={{
        height,
        width: height.map((h) => (h * 76) / 122),
        ...sx,
      }}
      strokeWidth='1.5'
      viewBox='0 0 76 122'
    >
      <line
        style={style}
        x1='37'
        y1='121.5'
        x2='37'
        y2='14'
        stroke={theme.colors.pink}
      />
      <line
        style={style}
        y1='-0.5'
        x2='20.5922'
        y2='-0.5'
        transform='matrix(-0.806908 -0.590678 0.733561 -0.679623 37.8704 109.762)'
        stroke={theme.colors.pink}
      />
      <line
        style={style}
        y1='-0.5'
        x2='20.1525'
        y2='-0.5'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 37.8704 50.8462)'
        stroke={theme.colors.pink}
      />
      <line
        style={style}
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
        style={style}
        mask='url(#path-5-inside-1_203_96)'
      />
    </Box>
  )
}
export const LargeTree = ({ height, sx }) => {
  const { theme } = useThemeUI()

  return (
    <Box
      as='svg'
      sx={{
        height,
        width: height.map((h) => (h * 190) / 366),
        ...sx,
      }}
      strokeWidth='1.5'
      viewBox='0 0 190 366'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M93 0C75.3269 0 61 14.3269 61 32C61 39.2239 63.3937 45.8887 67.4312 51.2446C50.8486 53.2524 38 67.3757 38 84.5C38 96.6652 44.4844 107.316 54.1853 113.184C34.4365 115.101 19 131.748 19 152C19 165.52 25.8791 177.432 36.328 184.429C15.459 189.643 0 208.516 0 231C0 257.51 21.4903 279 48 279H142C168.51 279 190 257.51 190 231C190 208.516 174.541 189.643 153.672 184.429C164.121 177.432 171 165.52 171 152C171 131.748 155.564 115.101 135.815 113.184C145.516 107.316 152 96.6652 152 84.5C152 66.7372 138.175 52.2033 120.699 51.071C124.658 45.7451 127 39.1461 127 32C127 14.3269 112.673 0 95 0H93Z'
        fill={theme.colors.background}
      />
      <line
        x1='94.75'
        y1='27'
        x2='94.75'
        y2='366'
        stroke={theme.colors.yellow}
        style={style}
      />
      <line
        y1='-0.75'
        x2='41.1844'
        y2='-0.75'
        transform='matrix(-0.806908 -0.590678 0.733561 -0.679623 94.7407 337.525)'
        stroke={theme.colors.yellow}
        style={style}
      />
      <line
        y1='-0.75'
        x2='40.305'
        y2='-0.75'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 94.7407 227.692)'
        stroke={theme.colors.yellow}
        style={style}
      />
      <line
        y1='-0.75'
        x2='40.0526'
        y2='-0.75'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 96 273.847)'
        stroke={theme.colors.yellow}
        style={style}
      />
      <line
        y1='-0.75'
        x2='40.305'
        y2='-0.75'
        transform='matrix(-0.824513 -0.565843 0.711278 -0.70291 94.7407 93.8062)'
        stroke={theme.colors.yellow}
        style={style}
      />
      <line
        y1='-0.75'
        x2='40.0526'
        y2='-0.75'
        transform='matrix(0.763904 -0.64533 0.779797 0.626032 94.7407 160.847)'
        stroke={theme.colors.yellow}
        style={style}
      />
      <mask id='path-8-inside-1_212_48' fill='white'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M93 0C75.3269 0 61 14.3269 61 32C61 39.2239 63.3937 45.8887 67.4312 51.2446C50.8486 53.2524 38 67.3757 38 84.5C38 96.6652 44.4844 107.316 54.1853 113.184C34.4365 115.101 19 131.748 19 152C19 165.52 25.8791 177.432 36.328 184.429C15.459 189.643 0 208.516 0 231C0 257.51 21.4903 279 48 279H142C168.51 279 190 257.51 190 231C190 208.516 174.541 189.643 153.672 184.429C164.121 177.432 171 165.52 171 152C171 131.748 155.564 115.101 135.815 113.184C145.516 107.316 152 96.6652 152 84.5C152 66.7372 138.175 52.2033 120.699 51.071C124.658 45.7451 127 39.1461 127 32C127 14.3269 112.673 0 95 0H93Z'
        />
      </mask>
      <path
        d='M67.4312 51.2446L67.6115 52.7337L70.1963 52.4208L68.629 50.3416L67.4312 51.2446ZM54.1853 113.184L54.3302 114.677L58.8293 114.24L54.9617 111.901L54.1853 113.184ZM36.328 184.429L36.6915 185.884L39.9729 185.065L37.1626 183.183L36.328 184.429ZM153.672 184.429L152.837 183.183L150.027 185.065L153.308 185.884L153.672 184.429ZM135.815 113.184L135.038 111.901L131.171 114.24L135.67 114.677L135.815 113.184ZM120.699 51.071L119.495 50.1762L117.85 52.3896L120.602 52.5679L120.699 51.071ZM62.5 32C62.5 15.1553 76.1553 1.5 93 1.5V-1.5C74.4985 -1.5 59.5 13.4985 59.5 32H62.5ZM68.629 50.3416C64.7808 45.237 62.5 38.887 62.5 32H59.5C59.5 39.5608 62.0066 46.5405 66.2334 52.1475L68.629 50.3416ZM67.2509 49.7555C49.9242 51.8533 36.5 66.6079 36.5 84.5H39.5C39.5 68.1436 51.773 54.6514 67.6115 52.7337L67.2509 49.7555ZM36.5 84.5C36.5 97.2116 43.2775 108.339 53.4089 114.468L54.9617 111.901C45.6912 106.293 39.5 96.1187 39.5 84.5H36.5ZM54.0403 111.691C33.5304 113.682 17.5 130.968 17.5 152H20.5C20.5 132.528 35.3426 116.52 54.3302 114.677L54.0403 111.691ZM17.5 152C17.5 166.041 24.6464 178.412 35.4934 185.675L37.1626 183.183C27.1118 176.452 20.5 164.998 20.5 152H17.5ZM35.9644 182.974C14.4435 188.35 -1.5 207.811 -1.5 231H1.5C1.5 209.221 16.4746 190.935 36.6915 185.884L35.9644 182.974ZM-1.5 231C-1.5 258.338 20.6619 280.5 48 280.5V277.5C22.3188 277.5 1.5 256.681 1.5 231H-1.5ZM48 280.5H142V277.5H48V280.5ZM142 280.5C169.338 280.5 191.5 258.338 191.5 231H188.5C188.5 256.681 167.681 277.5 142 277.5V280.5ZM191.5 231C191.5 207.811 175.556 188.35 154.036 182.974L153.308 185.884C173.525 190.935 188.5 209.221 188.5 231H191.5ZM154.507 185.675C165.354 178.412 172.5 166.041 172.5 152H169.5C169.5 164.998 162.888 176.452 152.837 183.183L154.507 185.675ZM172.5 152C172.5 130.968 156.47 113.682 135.96 111.691L135.67 114.677C154.657 116.52 169.5 132.528 169.5 152H172.5ZM136.591 114.468C146.722 108.339 153.5 97.2116 153.5 84.5H150.5C150.5 96.1187 144.309 106.293 135.038 111.901L136.591 114.468ZM153.5 84.5C153.5 65.9413 139.056 50.7573 120.796 49.5741L120.602 52.5679C137.294 53.6494 150.5 67.5331 150.5 84.5H153.5ZM125.5 32C125.5 38.8129 123.268 45.1001 119.495 50.1762L121.903 51.9658C126.047 46.39 128.5 39.4793 128.5 32H125.5ZM95 1.5C111.845 1.5 125.5 15.1553 125.5 32H128.5C128.5 13.4985 113.502 -1.5 95 -1.5V1.5ZM93 1.5H95V-1.5H93V1.5Z'
        fill={theme.colors.yellow}
        mask='url(#path-8-inside-1_212_48)'
      />
    </Box>
  )
}
