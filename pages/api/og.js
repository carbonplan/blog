import React from 'react'
import { ImageResponse } from 'next/og'
import { BlogPostOG, getBlogPostFonts } from '@carbonplan/layouts'
import { postMetadata } from '../../utils/post-metadata'

export const runtime = 'edge'

export default async function handler(req) {
  try {
    const fonts = await getBlogPostFonts()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      throw new Error('Missing id parameter')
    }

    const post = postMetadata.find((post) => post.id === id)
    if (!post) {
      throw new Error(`Post not found for id: ${id}`)
    }

    const { title, date } = post
    const authors = post.authors.map((author) =>
      typeof author === 'string' ? author : author?.name || ''
    )

    return new ImageResponse(
      <BlogPostOG title={title} date={date} authors={authors} />,
      {
        width: 1200,
        height: 630,
        fonts,
      }
    )
  } catch (error) {
    console.log(`${error.message}`)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
