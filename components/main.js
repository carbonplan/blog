import { useState } from 'react'
import { Box, Heading, Text } from 'theme-ui'
import { Row, Column, Filter, Tag, Tray } from '@carbonplan/components'

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

const Settings = ({ filter, setFilter, setSort, sort }) => {
  return (
    <>
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
    </>
  )
}

const Main = ({ showMobileSettings }) => {
  // TODO: update Filter integration to support multi-select
  const [filter, setFilter] = useState(initCategoryFilter)
  const [sort, setSort] = useState(initSort)

  const settings = (
    <Settings
      filter={filter}
      setFilter={setFilter}
      setSort={setSort}
      sort={sort}
    />
  )

  return (
    <>
      <Tray expanded={showMobileSettings}>{settings}</Tray>
      <Row>
        <Column start={[1, 1, 2, 2]} width={[3]}>
          <Heading as='h1' variant='styles.h1'>
            Blog
          </Heading>
        </Column>
        <Column
          start={[1, 1, 5, 5]}
          width={[3]}
          sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
          <Text variant='paragraph' sx={{ mb: [4, 5, 6, 6] }}>
            Short posts from our team on topics in climate and technology.
          </Text>
        </Column>
      </Row>
      <Row>
        <Column
          start={[1, 1, 2, 2]}
          width={[6, 6, 2, 2]}
          sx={{ display: ['none', 'none', 'initial', 'initial'] }}
        >
          {settings}
        </Column>
        <Column start={[1, 1, 5, 5]} width={[6, 6, 8, 8]}>
          <List filter={filter} sort={sort} />
        </Column>
      </Row>
    </>
  )
}

export default Main
