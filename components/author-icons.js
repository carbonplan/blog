import { Box, Image } from 'theme-ui'
import { Column, Row } from '@carbonplan/components'

const colors = ['red', 'orange', 'yellow', 'pink']

const AuthorIcons = ({ authors, articleNumber }) => {
  const mobileColOffset = Math.max(1, 3 - authors.length + 1)

  return (
    <Row columns={[3]} gap={[1, 2, 2, 3]}>
      {authors.map((name, idx) => (
        <Column key={name} start={[mobileColOffset + idx, 'auto']}>
          <Box
            sx={{
              width: ['90%', '90%', '100%', '100%'],
              height: 'auto',
              borderRadius: '50%',
              position: 'relative',
              bg: colors[(articleNumber + idx) % 4],
            }}
          >
            <Image
              key={name}
              alt={name}
              src={`https://images.carbonplan.org/team/${name
                .toLowerCase()
                .replace(' ', '-')}.png`}
              sx={{
                opacity: 0.25,
                filter: 'contrast(200%) brightness(100%)',
                width: '100%',
                borderRadius: '50%',
                display: 'block',
              }}
            />
          </Box>
        </Column>
      ))}
    </Row>
  )
}

export default AuthorIcons
