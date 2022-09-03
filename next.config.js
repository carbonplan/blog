const path = require('path')

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
  pageExtensions: ['jsx', 'js', 'md', 'mdx'],
  assetPrefix: isDev ? '' : 'https://blog.carbonplan.org',
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', 'theme-ui', ...config.externals]
    }
    config.resolve.alias['react'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'react'
    )
    config.resolve.alias['theme-ui'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'theme-ui'
    )
    return config
  },
})
