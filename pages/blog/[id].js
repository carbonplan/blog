import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkMdxCodeMeta from 'remark-mdx-code-meta'
import path from 'path'
import { useMDXComponents } from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import { Box } from 'theme-ui'
import { Post } from '@carbonplan/layouts'
import {
  Blockquote,
  Colors,
  Link,
  Figure,
  FigureCaption,
  TableCaption,
} from '@carbonplan/components'
import { Code } from '@carbonplan/prism'

import { postMetadata, POSTS_PATH } from '../../utils/mdx'
import { pageComponents } from '../../components/mdx'

const COMPONENTS = {
  pre: Code,
  blockquote: Blockquote,
  Box,
  ...Colors,
  Link,
  Figure,
  FigureCaption,
  TableCaption,
}

const PostPage = ({ id, source, frontMatter, number }) => {
  const components = useThemedStylesWithMdx(useMDXComponents())

  return (
    <Post meta={frontMatter} number={number}>
      <MDXRemote
        {...source}
        components={{
          ...components,
          ...COMPONENTS,
          ...pageComponents[id],
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
      remarkPlugins: [remarkMdxCodeMeta],
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
