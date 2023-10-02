import { Box } from 'theme-ui'

const Zoom = ({ setZoomed }) => {
  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
      <Box
        as='button'
        aria-label='Zoom out'
        onClick={() => setZoomed(false)}
        sx={{
          color: 'primary',
          border: 'none',
          bg: 'transparent',
          m: [0],
          p: [0],
          cursor: 'pointer',
          textTransform: 'uppercase',
          fontFamily: 'body',
          letterSpacing: 'smallcaps',
          mr: [3],
          fontSize: [5, 5, 5, 6],
          transition: 'color 0.15s',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': {
              color: 'secondary',
            },
          },
        }}
      >
        -
      </Box>
      <Box
        as='button'
        aria-label='Zoom in'
        onClick={() => setZoomed(true)}
        sx={{
          color: 'primary',
          border: 'none',
          bg: 'transparent',
          m: [0],
          p: [0],
          cursor: 'pointer',
          textTransform: 'uppercase',
          fontFamily: 'body',
          letterSpacing: 'smallcaps',
          fontSize: [5, 5, 5, 6],
          transition: 'color 0.15s',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': {
              color: 'secondary',
            },
          },
        }}
      >
        +
      </Box>
    </Box>
  )
}

export default Zoom
