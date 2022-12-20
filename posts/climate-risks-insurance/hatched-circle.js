import { Box, useThemeUI } from 'theme-ui'

const HatchedCircle = () => {
  const { theme } = useThemeUI()
  return (
    <Box
      as='span'
      sx={{
        display: 'inline-flex',
        gap: '2px',
        alignItems: 'center',
      }}
    >
      (
      <Box
        as='svg'
        width='12'
        height='12'
        viewBox='0 0 50 50'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        sx={{ mt: '2px' }}
      >
        <defs>
          <pattern
            id='hatching'
            patternUnits='userSpaceOnUse'
            width='4'
            height='4'
            patternTransform='scale(5 5)'
          >
            <Box
              as='path'
              d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2'
              sx={{
                stroke: 'primary',
                strokeWidth: '0.6',
              }}
            />
          </pattern>
        </defs>

        <circle
          cx='25'
          cy='25'
          r='25'
          fill='url(#hatching)'
          stroke={theme.colors.primary}
        />
      </Box>
      )
    </Box>
  )
}

export default HatchedCircle
