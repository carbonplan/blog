import { Box, Text } from 'theme-ui'
import { Button, Column, Row, Tag } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

import AuthorIcons from './author-icons'
import { CATEGORY_COLORS } from '../constants'
import { formatDate } from './utils/format-date'

const Entry = ({ final, info }) => {
  let { id, number, title, category, authors, date, summary } = info

  // TODO: do we need to show year?
  const formattedDate = formatDate(date, { month: 'short', day: 'numeric' })
  const articleHref = `/blog/${id}`

  return (
    <>
      <Row
        columns={[6, 6, 8, 8]}
        sx={{
          py: [4, 4, 5, 5],
          borderColor: 'secondary',
          borderStyle: 'solid',
          borderWidth: '0',
          borderBottomWidth: final ? 0 : '1px',
        }}
      >
        <Column start={[1]} width={[2, 2, 1, 1]} sx={{ order: [1, 1] }}>
          <Box
            sx={{
              color: 'secondary',
              fontFamily: 'mono',
              letterSpacing: 'mono',
              textTransform: 'uppercase',
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
          <Row columns={[6, 6, 4, 4]} sx={{ mb: [3] }}>
            <Column start={[1]} width={[6, 6, 3, 3]}>
              <Button href={articleHref} suffix={<RotatingArrow />}>
                {title}
              </Button>
            </Column>
            <Column
              start={[4]}
              width={[1]}
              sx={{ display: ['none', 'none', 'block', 'block'] }}
            >
              <Box sx={{ textAlign: 'right' }}>
                <Tag sx={{ color: CATEGORY_COLORS[category] }}>{category}</Tag>
              </Box>
            </Column>
          </Row>

          <Row columns={[6, 6, 4, 4]}>
            <Column start={[1]} width={[6, 6, 4, 4]}>
              <Text variant='paragraph'>{summary}</Text>
            </Column>
          </Row>
        </Column>

        <Column
          start={[4, 4, 7, 7]}
          width={[3, 3, 2, 2]}
          sx={{ order: [2, 2, 3, 3] }}
        >
          <AuthorIcons authors={authors} articleNumber={number} />
        </Column>
      </Row>
    </>
  )
}

export default Entry
