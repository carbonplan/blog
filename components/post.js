import { Box, Text } from 'theme-ui'
import { Button, Column, Row, Layout } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'

import AuthorIcons from './author-icons'

const prefix = 'https://images.carbonplan.org'

const Authors = ({ authors }) => {
  return (
    <>
      <Text
        sx={{
          color: 'secondary',
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [2],
        }}
      >
        by
      </Text>
      <br />
      <Text
        sx={{
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [2],
        }}
      >
        {authors.map((author, ix) => (
          <Text
            key={author}
            sx={{
              display: 'inline-block',
              mr: [2],
              fontFamily: 'mono',
              letterSpacing: 'mono',
              fontSize: [2],
            }}
          >
            {author.replace(/ /g, '\u00a0')}{' '}
            {ix < authors.length - 1 ? '+' : ''}
          </Text>
        ))}
      </Text>
    </>
  )
}
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const Post = ({ children, meta }) => {
  return (
    <Layout
      card={`${prefix}/social/${meta.card}.png`}
      description={meta.summary}
      title={meta.title.toLowerCase() + ' / blog / carbonplan'}
      links={'local'}
      metadata={'scroll'}
      container={false}
    >
      <Row>
        <Column start={[1]} width={[2, 1, 2, 2]}>
          <Button
            inverted
            size='xs'
            href='/blog'
            prefix={<Left />}
            sx={{ ml: ['-2px', '-2px', '-2px', '-2px'] }}
          >
            Back
          </Button>
        </Column>
        <Column
          start={[4, 2, 4, 4]}
          width={[3, 3, 2, 2]}
          sx={{ textAlign: ['right', 'left'] }}
        >
          <Text
            sx={{
              fontFamily: 'mono',
              letterSpacing: 'mono',
              textTransform: 'uppercase',
              color: 'secondary',
              fontSize: [2],
            }}
          >
            {dateFormatter.format(new Date(meta.date))}
          </Text>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 2, 4, 4]} width={[6, 6, 6, 6]}>
          <Box as='h1' variant='styles.h1'>
            {meta.title}
          </Box>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 2, 1, 2]} width={[6, 6, 2, 2]}>
          {/* TODO: share margin-top with h2 without hard-coding values */}
          <Box sx={{ mt: [0, 5, 6, 6] }}>
            <Row columns={[6, 6, 2, 2]}>
              <Column start={[1]} width={[3, 3, 2, 2]}>
                <Authors authors={meta.authors} />
              </Column>
              <Column start={[4, 4, 1, 1]} width={[3, 3, 2, 2]}>
                <AuthorIcons authors={meta.authors} />
              </Column>
            </Row>
          </Box>
        </Column>
        <Column start={[1, 2, 4, 4]} width={[6, 6, 6, 6]}>
          <Box as='article'>{children}</Box>
        </Column>
      </Row>
    </Layout>
  )
}

export default Post
