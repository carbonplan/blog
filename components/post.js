import { Box, Text } from 'theme-ui'
import { Button, Column, Row, Layout } from '@carbonplan/components'
import { Left } from '@carbonplan/icons'

import AuthorIcons from './author-icons'
import Closing from './closing'
import { formatDate } from './utils/format-date'

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
            {author.replace(/ /g, '\u00a0')}
            {'\u00a0'}
            {ix < authors.length - 1 ? '+' : ''}
          </Text>
        ))}
      </Text>
    </>
  )
}

const Post = ({ children, meta, number }) => {
  return (
    <Layout
      card={
        meta.card
          ? `${prefix}/social/${meta.card}.png`
          : 'https://images.carbonplan.org/social/blog.png'
      }
      description={meta.summary}
      title={meta.title.toLowerCase() + ' / blog / carbonplan'}
      links={'local'}
      metadata={'scroll'}
      container={false}
    >
      <Row sx={{ mt: [4, 6, 7, 8] }}>
        <Column start={[1, 2, 2, 2]} width={[2, 1, 2, 2]}>
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
          start={[4, 5, 5, 5]}
          width={[3, 3, 2, 2]}
          sx={{
            textAlign: ['right', 'right', 'left', 'left'],
            mt: ['-3px', '-3px', '-3px', '-1px'],
          }}
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
            {formatDate(meta.date, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 2, 5, 5]} width={[6, 6, 6, 6]}>
          <Box as='h1' variant='styles.h1' sx={{ mb: [5, 5, 0, 0] }}>
            {meta.title}
          </Box>
        </Column>
      </Row>
      <Row>
        <Column start={[1, 2, 2, 2]} width={[6, 6, 2, 2]}>
          {/* TODO: share margin-top with h2 without hard-coding values */}
          <Box sx={{ mt: [0, 0, 6, 6] }}>
            <Row columns={[6, 6, 2, 2]}>
              <Column start={[1]} width={[3, 3, 2, 2]} sx={{ mb: [3] }}>
                <Authors authors={meta.authors} />
              </Column>
              <Column
                start={[4, 4, 1, 1]}
                width={[3, 3, 2, 2]}
                sx={{ mt: [-1, -1, 0, 0] }}
              >
                <AuthorIcons authors={meta.authors} articleNumber={number} />
              </Column>
            </Row>
          </Box>
        </Column>
        <Column
          start={[1, 2, 5, 5]}
          width={[6, 6, 6, 6]}
          sx={{ mb: [8, 8, 9, 10] }}
        >
          <Box as='article'>{children}</Box>
          <Closing />
        </Column>
      </Row>
    </Layout>
  )
}

export default Post
