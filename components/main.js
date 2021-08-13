import { useState } from 'react'
import { Box, Text } from 'theme-ui'
import { Group, Row, Column, Filter, Tray } from '@carbonplan/components'

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
    <Group spacing='md'>
      <Filter values={sort} setValues={setSort} label='Sort by' />
    </Group>
  )
}

const Main = ({ showMobileSettings }) => {
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
      <Row sx={{ mt: [5, 6, 7, 8], mb: [5, 6, 7, 8] }}>
        <Column start={[1, 1, 2, 2]} width={[3]}>
          <Box as='h1' variant='styles.h1' sx={{ my: [0, 0, 0, 0] }}>
            Blog
          </Box>
        </Column>
        <Column
          start={[1, 4, 5, 5]}
          width={[6, 4, 4, 4]}
          sx={{ display: 'flex', alignItems: 'flex-end' }}
        >
          <Text
            sx={{
              mt: [4, 0, 0, 0],
              pb: [0, '2px', 1, 1],
              fontSize: [2, 2, 2, 3],
            }}
          >
            Short posts from our team on topics
            <br /> in climate and technology.
          </Text>
        </Column>
      </Row>
      <Row>
        <Column
          start={[1, 1, 2, 2]}
          width={[6, 6, 2, 2]}
          sx={{
            display: ['none', 'none', 'initial', 'initial'],
            mt: [4, 5, 6, 7],
          }}
        >
          {settings}
        </Column>
        <Column start={[1, 2, 5, 5]} width={[6, 6, 7, 7]}>
          <List filter={filter} sort={sort} />
        </Column>
      </Row>
    </>
  )
}

export default Main
