import { ImageResponse } from 'next/og'
import { getBlogPostCard } from '@carbonplan/layouts'
import { postMetadata } from '../../utils/post-metadata'

export const runtime = 'edge'

export default async function handler(req) {
  try {
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
    const forceWrapAuthors = searchParams.get('forceWrapAuthors') === 'true'

    const { component, fonts, options } = await getBlogPostCard({
      title,
      date,
      authors,
      forceWrapAuthors,
    })

    return new ImageResponse(component, {
      ...options,
      fonts,
    })
  } catch (error) {
    console.log(`${error.message}`)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
