const fs = require('fs')
const path = require('path')
const glob = require('glob')
const extractMdxMeta = require('extract-mdx-metadata')

const existing = glob.sync('./pages/blog/!(index.js)')
existing.forEach((f) => {
  if (fs.rmSync) fs.rmSync(f)
})

// Build pages and contents.js from articles
glob('./posts/**.md', async (err, filePaths) => {
  const articleContents = await Promise.all(filePaths.map(getMetadata))

  // Construct pages/research
  articleContents.forEach(({ id }) => {
    const page = `
    import Index, {meta} from '../../posts/${id}.md'
    import Post from '../../components/post'

    const Content = () => (
      <Post meta={meta}>
        <Index />
      </Post>
    )

    export default Content
    `
    fs.writeFileSync(`./pages/blog/${id}.js`, page)
  })

  // Construct contents.js
  const sorted = articleContents.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const contents = `const contents = ${JSON.stringify(sorted)}
    export default contents`
  fs.writeFileSync('./contents.js', contents)
})

async function getMetadata(path) {
  const content = fs.readFileSync(path)
  const meta = await extractMdxMeta(content)
  const id = path.match(/[^\/]+(?=\.md)/)

  if (!id || !id[0]) {
    throw new Error(`Invalid article path: ${path}`)
  }

  return {
    id: id[0],
    ...meta,
  }
}
