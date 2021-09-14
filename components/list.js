import { useMemo } from 'react'
import { Box } from 'theme-ui'
import Entry from './entry'
import contents from '../contents'

const List = ({ sort }) => {
  const filteredContents = useMemo(() => {
    const compare = (a, b) => {
      if (sort.date) {
        const da = new Date(a.date.replace(/-/g, '/'))
        const db = new Date(b.date.replace(/-/g, '/'))
        return (da < db) - (da > db)
      }
      if (sort.title) {
        return (a.title > b.title) - (a.title < b.title)
      }
    }

    return contents.sort(compare)
  }, [sort])

  return (
    <Box>
      {filteredContents.map((d, ix) => (
        <Entry
          key={d.title}
          info={d}
          first={ix === 0}
          final={ix === filteredContents.length - 1}
        ></Entry>
      ))}

      {filteredContents.length === 0 && (
        <Box sx={{ py: [4, 4, 5, 5] }}>
          <Box
            sx={{
              display: 'inline-block',
              fontSize: [1, 1, 1, 2],
              fontFamily: 'mono',
              color: 'secondary',
              textTransform: 'uppercase',
              letterSpacing: 'mono',
            }}
          >
            No posts found
          </Box>
          <Box
            sx={{
              mt: [2],
              fontSize: [2, 2, 2, 3],
            }}
          >
            Please select different filter options to view posts.
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default List
