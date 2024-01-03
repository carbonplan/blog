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

const getCurrentYear = () => new Date().getFullYear()

const Settings = ({ setYears, years }) => {
  return (
    <Group spacing='md'>
      <Filter
        values={years}
        setValues={setYears}
        label='Filter by year'
        showAll
      />
    </Group>
  )
}

const Main = ({ showMobileSettings, posts }) => {
  const [years, setYears] = useState(() => {
    const currentYear = getCurrentYear()
    const initYears = {}
    for (let year = 2021; year <= currentYear; year++) {
      initYears[year] = true
    }
    return initYears
  })

  const settings = <Settings setYears={setYears} years={years} />

  return (
    <>
      {new Date().toTimeString()}
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
          <List years={years} posts={posts} />
        </Column>
      </Row>
    </>
  )
}

export default Main
