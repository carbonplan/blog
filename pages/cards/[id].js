import { Box, Flex, Text } from 'theme-ui'
import { Monogram, formatDate } from '@carbonplan/components'

import contents from '../../contents'
import { AUTHOR_COLORS } from '../../constants'

const Card = ({ title, authors, date, number }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        px: ['80px'],
        py: [7],
        height: '100vh',
        width: '100vw',
        justifyContent: 'space-between',
      }}
    >
      <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Box
            sx={{
              color: 'secondary',
              fontFamily: 'faux',
              letterSpacing: 'smallcaps',
              fontSize: [5],
              mb: [3],
            }}
          >
            blog / carbonplan
          </Box>
          <Box as='h1' variant='styles.h1' sx={{ maxWidth: '800px' }}>
            {title}
          </Box>
        </Box>
        <Box
          sx={{
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            color: 'secondary',
            fontSize: [5],
          }}
        >
          {authors.map((a, i) => (
            <Box key={a} sx={{ color: AUTHOR_COLORS[(number + i) % 4] }}>
              {a}

              {i < authors.length - 1 && (
                <Box as='span' sx={{ color: 'primary', ml: [3] }}>
                  +
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Flex>

      <Box sx={{ flex: '1 0 64px' }} />

      <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <Monogram sx={{ width: 160, display: 'block', mr: '-10px' }} />

        <Text
          sx={{
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
            color: 'secondary',
            fontSize: [5],
            writingMode: 'vertical-rl',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            overflow: 'visible',
            mr: '-12px',
          }}
        >
          {formatDate(date, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Card

export async function getStaticPaths() {
  const paths = contents.map((post) => ({
    params: { id: post.id },
  }))

  const isDev =
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NODE_ENV === 'development'

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: isDev ? paths : [], fallback: false }
}

export async function getStaticProps({ params }) {
  const post = contents.find((p) => p.id === params.id)
  const { title, authors, date, number } = post

  // Pass post data to the page via props
  return { props: { title, authors, date, number } }
}
