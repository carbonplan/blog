const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// We generate this at build to allow us to afrom edge functions like dynamic OG images (og.js)

const POSTS_PATH = path.join(process.cwd(), 'posts')

// Get list of all md files inside the posts directory
const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md files
  .filter((path) => /\.md$/.test(path))
  .map((path) => ({ path, id: path.replace(/\.md$/, '') }))

// Generate metadata objects for all postFilePaths
const postMetadata = postFilePaths
  .map(({ path: filePath, id }) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { data } = matter(source)
    return {
      ...data,
      id,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((meta, idx) => ({ ...meta, number: postFilePaths.length - 1 - idx }))

// Generate the metadata file content
const fileContent = `// This file is auto-generated. Do not edit it manually.
const postMetadata = ${JSON.stringify(postMetadata, null, 2)}

module.exports = {
  postMetadata,
}
`

// Write the metadata file
fs.writeFileSync(
  path.join(process.cwd(), 'utils', 'post-metadata.js'),
  fileContent
)
