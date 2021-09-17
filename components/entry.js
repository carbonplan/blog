import { Box, Text } from 'theme-ui'
import { Button, Column, Row, formatDate } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

import AuthorIcons from './author-icons'

const Entry = ({ final, first, info }) => {
  let { id, number, title, authors, date, summary } = info

  // TODO: do we need to show year?
  const formattedDate = formatDate(date, { month: 'short', day: 'numeric' })
  const articleHref = `/blog/${id}`

  return (
    <>
      <Row
        columns={[6, 6, 7, 7]}
        sx={{
          py: [5, 6, 6, 7],
          borderColor: 'muted',
          borderStyle: 'solid',
          borderWidth: '0',
          borderTopWidth: first ? ['1px', 0, 0, 0] : 0,
          borderBottomWidth: final ? 0 : '1px',
        }}
      >
        <Column start={[1]} dr={1} width={[2, 2, 1, 1]} sx={{ order: [1, 1] }}>
          <Box
            sx={{
              color: 'secondary',
              fontFamily: 'mono',
              letterSpacing: 'mono',
              textTransform: 'uppercase',
              fontSize: [1, 1, 1, 2],
            }}
          >
            {formattedDate}
          </Box>
        </Column>
        <Column
          start={[1, 1, 2, 2]}
          width={[6, 6, 4, 4]}
          sx={{ order: [3, 3, 2, 2] }}
        >
          <Row columns={[6, 6, 3, 3]} sx={{ mb: [3] }}>
            <Column
              start={[1]}
              width={[6, 6, 4, 4]}
              sx={{ mt: [4, 4, -2, '-14px'] }}
            >
              <Button
                size='md'
                href={articleHref}
                suffix={<RotatingArrow />}
                sx={{ fontFamily: 'heading' }}
              >
                {title}
              </Button>
            </Column>
          </Row>
          <Row columns={[6, 6, 4, 4]}>
            <Column start={[1]} width={[6, 6, 4, 4]}>
              <Text sx={{ fontSize: [2, 2, 2, 3] }}>{summary}</Text>
            </Column>
          </Row>
        </Column>
        <Column
          start={[4, 4, 6, 6]}
          width={[3, 3, 2, 2]}
          sx={{ order: [2, 2, 3, 3], mt: [-1] }}
        >
          <AuthorIcons authors={authors} articleNumber={number} />
        </Column>
      </Row>
    </>
  )
}

export default Entry
