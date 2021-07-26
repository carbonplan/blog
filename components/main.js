import { useState } from 'react'
import { Grid } from 'theme-ui'
import List from './list'

const initFilter = {
  all: true,
  post: true,
  tool: true,
  comment: true,
  publication: true,
  dataset: true,
}

const initSort = {
  date: true,
  title: false,
}

const Main = () => {
  const [filter, setFilter] = useState(initFilter)
  const [sort, setSort] = useState(initSort)

  return (
    <Grid columns={[1, 1, 'minmax(350px, 30%) auto']} gap={['0px']}>
      <List filter={filter} sort={sort} />
    </Grid>
  )
}

export default Main
