import { useMemo } from 'react'
import { Box } from 'theme-ui'
import Entry from './entry'
import contents from '../contents'

const List = ({ filter, sort }) => {
  const filteredContents = useMemo(() => {
    const inFilter = (d) => filter[d.category]

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

    return contents.filter(inFilter).sort(compare)
  }, [filter, sort])

  return (
    <Box>
      {filteredContents.map((d, ix) => (
        <Entry
          key={d.title}
          info={d}
          final={ix === filteredContents.length - 1}
        ></Entry>
      ))}
    </Box>
  )
}

export default List
