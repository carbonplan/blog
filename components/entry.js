import { memo } from 'react'
import { Box } from 'theme-ui'
import { Button, Column, Row, Tag } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'
import { CATEGORY_COLORS } from '../constants'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

const Entry = ({ info }) => {
  let { id, title, category, authors, date, summary } = info

  const formattedDate = dateFormatter.format(new Date(date))
  const articleHref = `/blog/${id}`

  return (
    <>
      <Row columns={[6, 8]}>
        <Column start={[1]} width={[1]}>
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

        <Column start={[1, 2]} width={[6, 3]}>
          <Button href={articleHref} suffix={<RotatingArrow />}>
            {title}
          </Button>
        </Column>

        <Column start={[5]}>
          <Box sx={{ textAlign: 'right' }}>
            <Tag sx={{ color: CATEGORY_COLORS[category] }}>{category}</Tag>
          </Box>
        </Column>
      </Row>
      <Row columns={[6, 8]}>
        <Column start={[1, 2]} width={[6, 4]}>
          {summary}
        </Column>
      </Row>
    </>
  )
}

export default memo(Entry)
