import fs from 'fs'

import contents from '../../contents'

function Contents() {
  // getServerSideProps will do the heavy lifting
}

export function getServerSideProps({ res }) {
  const pages = fs
    .readdirSync('pages/blog')
    .filter((staticPage) => {
      return !['index.js', '404.js', 'rss.xml.js', 'contents.json.js'].includes(
        staticPage
      )
    })
    .map((page) => page.replace('.js', ''))
    .map((page) => {
      const postContent = contents.find((c) => c.id === page)
      const result = { page: `blog/${page}` }
      if (postContent) {
        const [month, day, year] = postContent.date.split('-')
        result.date = `${year}-${month}-${day}`
      }
      return result
    })

  res.setHeader('Content-Type', 'application/json')

  res.write(JSON.stringify([{ page: 'blog' }].concat(pages)))
  res.end()

  return {
    props: {},
  }
}

export default Contents
