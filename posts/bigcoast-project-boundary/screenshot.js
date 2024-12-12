import { alpha } from '@theme-ui/color'
import { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { FadeIn } from '@carbonplan/components'
import { Left, Right } from '@carbonplan/icons'

const Screenshot = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box
      sx={{
        backgroundColor: 'muted',
        p: [3, 5, 5, 6],
        mx: [-3, -5, -5, -6],
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          as='img'
          src='https://images.carbonplan.org/blog/bigcoast-project-boundary/screenshot.png'
          sx={{
            width: '100%',
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: 'primary',
          }}
        />
        <Box
          onClick={() => setExpanded(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'zoom-in',
            transition: '0.2s background',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                background: alpha('muted', 0.2),
              },
              '&:hover div': {
                opacity: 1,
              },
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-54%, -50%)',
            }}
          >
            <Box
              id='expander'
              sx={{
                opacity: 0,
                transition: '0.2s opacity',
                transform: 'rotate(135deg)',
              }}
            >
              <Left sx={{ mr: '8px', width: 12, fill: 'secondary' }} />
              <Right sx={{ width: 12, fill: 'secondary' }} />
            </Box>
          </Box>
        </Box>
        {expanded && (
          <Flex
            onClick={() => setExpanded(false)}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 9999,
              cursor: 'zoom-out',
              alignItems: 'center',
              justifyContent: 'center',
              background: alpha('background', 0.9),
              '& div': {
                maxWidth: '100%',
                maxHeight: '100%',
                overflowY: 'scroll',
              },
            }}
          >
            <FadeIn>
              <Box
                as='img'
                onClick={() => setExpanded(false)}
                src='https://images.carbonplan.org/blog/bigcoast-project-boundary/screenshot.png'
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block',
                  userSelect: 'none',
                }}
              />
            </FadeIn>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default Screenshot
