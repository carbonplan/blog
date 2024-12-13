import { formatDate } from '@carbonplan/components'
import theme from '@carbonplan/theme'
import { ImageResponse } from '@vercel/og'

import { AUTHOR_COLORS } from '../../constants'

export const config = {
  runtime: 'edge',
}

const getFonts = async () => {
  const [relativeMedium, faux, mono] = await Promise.all([
    fetch(
      'https://fonts.carbonplan.org/relative/relative-medium-pro-convert.otf',
      {
        next: { revalidate: false },
      }
    ).then((res) => res.arrayBuffer()),
    fetch('https://fonts.carbonplan.org/relative/relative-faux-book-pro.otf', {
      next: { revalidate: false },
    }).then((res) => res.arrayBuffer()),
    fetch(
      'https://fonts.carbonplan.org/relative/relative-mono-11-pitch-pro.otf',
      {
        next: { revalidate: false },
      }
    ).then((res) => res.arrayBuffer()),
  ])

  return [
    {
      name: 'heading',
      data: relativeMedium,
    },
    {
      name: 'faux',
      data: faux,
    },
    {
      name: 'mono',
      data: mono,
    },
  ]
}

export default async function handler(req) {
  try {
    const fonts = await getFonts()

    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')
    const authorsString = searchParams.get('authors')
    let authors = []
    if (authorsString.includes(',')) {
      authors = authorsString.split(',')
    } else {
      authors = [authorsString]
    }

    const date = searchParams.get('date')
    const number = searchParams.get('number')
    const wrapAuthors = searchParams.get('wrapAuthors') === 'true'

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '100vh',
            width: '100vw',
            paddingLeft: '78px',
            paddingRight: '78px',
            paddingTop: '54px',
            paddingBottom: '64px',
            backgroundColor: theme.colors.background,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            id='left'
          >
            <div
              style={{ display: 'flex', flexDirection: 'column' }}
              id='upper'
            >
              <div
                style={{
                  color: theme.colors.secondary,
                  fontFamily: 'faux',
                  fontSize: '34px',
                  letterSpacing: '0.07em',
                }}
              >
                blog / carbonplan
              </div>
              <h1
                style={{
                  maxWidth: '800px',
                  fontSize: '64px',
                  marginTop: '42px',
                  marginBottom: '42px',
                  color: theme.colors.primary,
                  fontFamily: 'heading',
                  letterSpacing: '-0.015em',
                  lineHeight: '1.05',
                }}
              >
                {title}
              </h1>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: wrapAuthors ? 'row' : 'column',
                flexWrap: 'wrap',
                // gap: '16px',
                fontFamily: 'mono',
                textTransform: 'uppercase',
                fontSize: '34px',
                marginBottom: '-6px',
                lineHeight: '1.35',
                letterSpacing: '0.07em',
                maxWidth: '800px',
              }}
            >
              {authors.map((author, i) => (
                <div
                  key={author}
                  style={{
                    display: 'flex',
                    color: theme.colors[AUTHOR_COLORS[(number + i) % 4]],
                  }}
                >
                  {author}
                  {i < authors.length - 1 && (
                    <span
                      style={{
                        color: theme.colors.primary,
                        marginLeft: '16px',
                        marginRight: '16px',
                      }}
                    >
                      +
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: '100%',
            }}
            id='right'
          >
            <svg
              stroke='none'
              fill={theme.colors.primary}
              viewBox='0 0 32 32'
              width='160'
              height='160'
              style={{ marginTop: '-10px', marginRight: '-10px' }}
            >
              <path d='M21.9395,14.9395 L17.5005,19.3785 L17.5005,7.0005 L14.5005,7.0005 L14.5005,19.3785 L10.0605,14.9395 L7.9395,17.0605 L14.9395,24.0605 C15.2325,24.3535 15.6165,24.5005 16.0005,24.5005 C16.3835,24.5005 16.7675,24.3535 17.0605,24.0605 L24.0605,17.0605 L21.9395,14.9395 Z'></path>
              <path d='M27.5986,4 L22.8966,4 C26.5556,6.303 28.9996,10.366 28.9996,15 C28.9996,20.4 25.6896,25.039 20.9926,27 L26.5586,27 C29.8886,24.068 31.9996,19.785 31.9996,15 C31.9996,10.734 30.3196,6.868 27.5986,4'></path>
              <path d='M3,15 C3,10.366 5.444,6.303 9.104,4 L4.401,4 C1.68,6.868 0,10.734 0,15 C0,19.785 2.112,24.068 5.441,27 L11.008,27 C6.311,25.039 3,20.4 3,15'></path>
            </svg>

            <div
              style={{
                fontFamily: 'mono',
                textTransform: 'uppercase',
                color: theme.colors.secondary,
                fontSize: '34px',
                letterSpacing: '0.07em',
                transform: 'rotate(90deg)',
                transformOrigin: 'right',
                marginRight: '12px',
                marginBottom: '-20px',
              }}
            >
              {formatDate(date, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      ),
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
