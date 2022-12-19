import { Box, useColorMode } from 'theme-ui'
import { useState } from 'react'
import { Filter } from '@carbonplan/components'

const BeforeAfter = () => {
  const [colorMode] = useColorMode()
  const [after, setAfter] = useState(false)

  return (
    <Box>
      <Filter
        values={{ before: !after, after }}
        setValues={(obj) => setAfter(obj.after)}
      />
      <Box
        as='img'
        src={`https://images.carbonplan.org/blog/enhanced-weathering-update/${
          after ? 'after' : 'before'
        }-${colorMode}.png`}
        sx={{ width: '100%', mt: 3 }}
      />
    </Box>
  )
}

export default BeforeAfter
