import { Box } from 'theme-ui'

const BreakAll = ({ children }) => {
  return (
    <Box as='span' sx={{ wordBreak: 'break-all' }}>
      {children}
    </Box>
  )
}

export default BreakAll
