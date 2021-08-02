import { useState } from 'react'
import { Heading, Text } from 'theme-ui'
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
      <Filter
        values={filter}
        setValues={setFilter}
        label='Filter by'
        colors={CATEGORY_COLORS}
        multiSelect
        showAll
      />
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
