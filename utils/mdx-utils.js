const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Utils based on examples in https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote

// POSTS_PATH is useful when you want to get the path to a specific file
const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md files
  .filter((path) => /\.md$/.test(path))
  .map((path) => ({ path, id: path.replace(/\.md$/, '') }))

// postMetadata is the list metadata objects for all postFilePaths
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

module.exports = {
  POSTS_PATH,
  postFilePaths,
  postMetadata,
}
