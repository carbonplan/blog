import { ImageResponse } from 'next/og'
import { getBlogPostCard } from '@carbonplan/layouts'
import { postMetadata } from '../../utils/metadata'

export const runtime = 'edge'

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const collapseCardAuthorsParam =
      searchParams.get('collapseCardAuthors') === 'true'
    const titleWidthOverrideParam = searchParams.get('titleWidthOverride')

    if (!id) {
      throw new Error('Missing id parameter')
    }

    const post = postMetadata.find((post) => post.id === id)
    if (!post) {
      throw new Error(`Post not found for id: ${id}`)
    }

    const {
      title,
      date,
      number,
      collapseCardAuthors,
      forceWrapAuthors, // fallback for old name for collapseCardAuthors
      titleWidthOverride,
    } = post
    const authors = post.authors.map((author) =>
      typeof author === 'string' ? author : author?.name || ''
    )

    const { component, fonts, options } = await getBlogPostCard({
      title,
      date,
      authors,
      number,
      collapseCardAuthors:
        collapseCardAuthorsParam || collapseCardAuthors || forceWrapAuthors,
      titleWidthOverride: titleWidthOverrideParam || titleWidthOverride,
    })

    return new ImageResponse(component, {
      ...options,
      fonts,
      headers: {
        // Vercel's CDN only caches functions on `s-maxage`; the deployment URL
        // is part of the cache key, so a redeploy refreshes these cards.
        'Vercel-CDN-Cache-Control':
          'public, s-maxage=31536000, stale-while-revalidate=86400',
        // Keep browsers revalidating since the id-based URL is stable.
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    })
  } catch (error) {
    console.log(`${error.message}`)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
