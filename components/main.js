import { useState } from 'react'
import {
  Group,
  Row,
  Column,
  Filter,
  Heading,
  Tray,
} from '@carbonplan/components'

import List from './list'

const initSort = {
  date: true,
  title: false,
}

const Settings = ({ setSort, sort }) => {
  return (
    <Group spacing='md'>
      <Filter values={sort} setValues={setSort} label='Sort by' />
    </Group>
  )
}

const Main = ({ showMobileSettings }) => {
  const [sort, setSort] = useState(initSort)

  const settings = <Settings setSort={setSort} sort={sort} />

  return (
    <>
      <Tray expanded={showMobileSettings}>{settings}</Tray>
      <Heading
        description={
          <>
            Short posts from our team on topics
            <br /> in climate and technology.
          </>
        }
        descriptionStart={[1, 3, 5, 5]}
        descriptionWidth={[6, 4, 4, 4]}
      >
        Blog
      </Heading>
      <Row sx={{ mb: [7, 8, 9, 10] }}>
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
          <List sort={sort} />
        </Column>
      </Row>
    </>
  )
}

export default Main
