import { useState } from 'react'
import { Box } from 'theme-ui'
import { Row, Column, Filter, Tag } from '@carbonplan/components'

import List from './list'
import { CATEGORY_COLORS } from '../constants'

const initCategoryFilter = {
  press: true,
  team: true,
  policy: true,
  tech: true,
}

const initSort = {
  date: true,
  title: false,
}

const Main = () => {
  // TODO: update Filter integration to support multi-select
  const [filter, setFilter] = useState(initCategoryFilter)
  const [sort, setSort] = useState(initSort)

  return (
    <Row>
      <Column start={[1, 1, 2, 2]} width={[6, 6, 2, 2]}>
        <Filter
          filters={{ category: filter }}
          setFilters={{ category: setFilter }}
          filterLabels={{ category: 'Category' }}
          filterList={['category']}
          filterColors={{ category: CATEGORY_COLORS }}
        />
        <Box
          sx={{
            mt: [5],
            color: 'secondary',
            textTransform: 'uppercase',
            fontFamily: 'mono',
            letterSpacing: 'mono',
            fontSize: [1, 1, 1, 2],
          }}
        >
          Sort by
          <Box sx={{ mt: [3] }}>
            <Tag
              value={sort.date}
              onClick={() => setSort({ date: true, title: false })}
              sx={{
                width: 'max-content',
                mr: [2],
                mb: [1],
              }}
            >
              Date
            </Tag>
            <Tag
              value={sort.title}
              onClick={() => setSort({ date: false, title: true })}
              sx={{
                width: 'max-content',
                mr: [2],
                mb: [1],
              }}
            >
              Title
            </Tag>
          </Box>
        </Box>
      </Column>
      <Column start={[1, 1, 5, 5]} width={[6, 6, 8, 8]}>
        <List filter={filter} sort={sort} />
      </Column>
    </Row>
  )
}

export default Main
