import { Box, Text } from 'theme-ui'
import {
  Button,
  Column,
  Row,
  AvatarGroup,
  formatDate,
} from '@carbonplan/components'
import { RotatingArrow } from '@carbonplan/icons'

const Entry = ({ final, first, info }) => {
  let { id, number, title, authors, date, summary } = info

  const formattedDate = formatDate(date, {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    separator: '.',
  })

  const articleHref = `/blog/${id}`

  const colors = ['red', 'orange', 'yellow', 'pink']
  const avatars = authors.map((d, i) => {
    return { name: d, color: colors[(number + i) % 4] }
  })

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
          <AvatarGroup
            members={avatars}
            fixedCount={3}
            spacing={[1, 2, 2, 3]}
            maxWidth='150px'
            align={['right', 'left', 'left', 'left']}
            width={['90%', '90%', '100%', '100%']}
          />
        </Column>
      </Row>
    </>
  )
}

export default Entry
