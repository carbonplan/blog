import { memo } from 'react'
import { Button, Column, Row, Tag } from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'
import { CATEGORY_COLORS } from '../constants'

const Entry = ({ info }) => {
  let { id, title, color, category, authors, date, summary } = info

  color = color || 'text'
  const articleHref = `/blog/${id}`
  return (
    <>
      <Row columns={[6]}>
        <Column start={[1]} width={[1]}>
          {date}
        </Column>

        <Column start={[1, 2]} width={[6, 3]}>
          <Button href={articleHref} suffix={<RotatingArrow />}>
            {title}
          </Button>
        </Column>

        <Column start={[5]}>
          <Tag sx={{ color: CATEGORY_COLORS[category] }}>{category}</Tag>
        </Column>
      </Row>
      <Row columns={[6]}>
        <Column start={[1, 2]} width={[6, 4]}>
          {summary}
        </Column>
      </Row>
    </>
  )
}

export default memo(Entry)
