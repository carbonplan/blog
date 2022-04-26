import fs from 'fs'
import matter from 'gray-matter'
import dynamic from 'next/dynamic'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { useMDXComponents } from '@mdx-js/react'

import { Box } from 'theme-ui'
import { Post } from '@carbonplan/layouts'
import {
  Blockquote,
  Link,
  Figure,
  FigureCaption,
  TableCaption,
} from '@carbonplan/components'

import { postMetadata, POSTS_PATH } from '../../utils/mdx-utils'

const COMPONENTS = {
  Box,
  blockquote: Blockquote,
  Link,
  Figure,
  FigureCaption,
  TableCaption,
}

const figures = {
  'climate-trace-release': {
    Map: dynamic(() => import('../../posts/climate-trace-release/figure')),
  },
  'open-lidar-biomass': {
    Chart: dynamic(() => import('../../posts/open-lidar-biomass/figure')),
  },
  'maps-library-release': {
    MapDemo2d: dynamic(() =>
      import('../../posts/maps-library-release/maps-demo-2d')
    ),
    MapDemo4d: dynamic(() =>
      import('../../posts/maps-library-release/maps-demo-4d')
    ),
  },
  'soil-protocols-added': {
    RecommendationTable: dynamic(() =>
      import('../../posts/soil-protocols-added/recommendation-table')
    ),
    ScoreSummary: dynamic(() =>
      import('../../posts/soil-protocols-added/score-summary')
    ),
  },
  'ton-year-ncx': {
    TableHundred: dynamic(() =>
      import('../../posts/ton-year-ncx/table-hundred')
    ),
    TableThousand: dynamic(() =>
      import('../../posts/ton-year-ncx/table-thousand')
    ),
  },
}

const PostPage = ({ id, source, frontMatter, number }) => {
  const components = useMDXComponents()
  const rawAuthors = frontMatter.authors
  const authors = rawAuthors.split(',')

  return (
    <Post meta={{ ...frontMatter, authors }} number={number}>
      <MDXRemote
        {...source}
        components={{
          ...components,
          ...COMPONENTS,
          ...figures[id],
        }}
      />
    </Post>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.id}.md`)
  const source = fs.readFileSync(postFilePath)
  const { number } = postMetadata.find((d) => d.id === params.id)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      id: params.id,
      source: mdxSource,
      frontMatter: data,
      number,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postMetadata
    // Map the path into the static paths object required by Next.js
    .map(({ id }) => ({ params: { id } }))

  return {
    paths,
    fallback: false,
  }
}
export default PostPage
