import { Box, useThemeUI } from 'theme-ui'

const BlueCircle = () => {
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
        <circle cx='25' cy='25' r='25' fill={theme.colors.blue} />
      </Box>
      )
    </Box>
  )
}

export default BlueCircle
