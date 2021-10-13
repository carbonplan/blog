import { Box } from 'theme-ui'

const FigureCaption = ({ children }) => {
  return (
    <Box
      as='figcaption'
      sx={{
        color: 'secondary',
        mt: [3, 3, 3, 4],
        mb: [6, 6, 6, 7],
        fontSize: [2, 2, 2, 3],
      }}
    >
      {children}
    </Box>
  )
}

export default FigureCaption
