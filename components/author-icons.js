import { Box, Image } from 'theme-ui'
import { Column, Row } from '@carbonplan/components'

const AuthorIcons = ({ authors }) => {
  return (
    <Row columns={[3]} gap={[1, 3]}>
      {authors.map((name) => (
        <Column key={name}>
          <Box
            sx={{
              maxWidth: '100px',
              width: '100%',
              height: 'auto',
              borderRadius: '50%',
              position: 'relative',
              bg: 'pink', // todo: vary this
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
