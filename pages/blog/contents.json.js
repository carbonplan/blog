import { postMetadata } from '../../utils/mdx-utils'

function Contents() {
  // getServerSideProps will do the heavy lifting
}

export function getServerSideProps({ res }) {
  const pages = postMetadata.map(({ date, id }) => {
    const [month, day, year] = date.split('-')
    return { page: `blog/${id}`, date: `${year}-${month}-${day}` }
  })

  res.setHeader('Content-Type', 'application/json')

  res.write(JSON.stringify([{ page: 'blog' }].concat(pages)))
  res.end()

  return {
    props: {},
  }
}

export default Contents
