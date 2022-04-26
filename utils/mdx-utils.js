const fs = require('fs')
const path = require('path')

// POSTS_PATH is useful when you want to get the path to a specific file
const POSTS_PATH = path.join(process.cwd(), 'pages/blog')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md files
  .filter((path) => /\.page.md$/.test(path))
  .map((path) => ({ path, id: path.replace(/\.page.md$/, '') }))

const getPostMetadata = async () => {
  const extractor = require('extract-mdx-metadata')
  const unsorted = await Promise.all(
    postFilePaths.map(({ path: filePath, id }) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
      return extractor(source).then((data) => ({
        ...data,
        id,
      }))
    })
  )

  return unsorted
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((meta, idx) => ({ ...meta, number: postFilePaths.length - 1 - idx }))
}
module.exports = {
  postFilePaths,
  getPostMetadata,
}
