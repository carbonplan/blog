const fs = require('fs')
const glob = require('glob')
const extractMdxMeta = require('extract-mdx-metadata')

const existing = glob.sync('./pages/blog/!(index.js|rss.xml.js)')
existing.forEach((f) => {
  if (fs.rmSync) fs.rmSync(f)
})

// Build pages and contents.js from articles
glob('./posts/**.md', async (err, filePaths) => {
  const articleContents = await Promise.all(filePaths.map(getMetadata))

  // Construct contents.js
  const sorted = articleContents
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((meta, idx) => ({ ...meta, number: articleContents.length - 1 - idx }))
  const contents = `const contents = ${JSON.stringify(sorted)}
    module.exports = contents`
  fs.writeFileSync('./contents.js', contents)

  // Construct pages/research
  sorted.forEach(({ id, number }) => {
    const page = `
    import Index, {meta} from '../../posts/${id}.md'
    import { Post } from '@carbonplan/layouts'

    const Content = () => (
      <Post meta={meta} number={${number}}>
        <Index />
      </Post>
    )

    export default Content
    `
    fs.writeFileSync(`./pages/blog/${id}.js`, page)
  })
})

async function getMetadata(path) {
  const content = fs.readFileSync(path)
  const meta = await extractMdxMeta(content)
  const id = path.match(/[^/]+(?=\.md)/)

  if (!id || !id[0]) {
    throw new Error(`Invalid article path: ${path}`)
  }

  return {
    id: id[0],
    ...meta,
  }
}
