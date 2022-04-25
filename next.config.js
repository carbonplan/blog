const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

const slug = require('rehype-slug')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [slug],
  },
})

module.exports = withMDX({
  pageExtensions: ['page.jsx', 'page.js', 'page.md', 'page.mdx'],
  assetPrefix: isDev ? '' : 'https://blog.carbonplan.org',
})
