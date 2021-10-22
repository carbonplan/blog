import contents from '../../contents'

const contentsRssXml = () => {
  let latestPostDate
  let rssItemsXml = ''
  contents
    .filter(({ id }) => id)
    .forEach(({ id, date, title, summary }) => {
      const [month, day, year] = date.split('-').map((s, i) =>
        i === 0
          ? Number(s) - 1 // handle 0-indexed months
          : Number(s)
      )
      const postDate = new Date(year, month, day)

      const postHref = `https://carbonplan.org/blog/${id}`

      if (!latestPostDate || postDate > latestPostDate) {
        latestPostDate = postDate
      }

      rssItemsXml += `
        <item>
          <title><![CDATA[${title}]]></title>
          <link>${postHref}</link>
          <pubDate>${postDate.toUTCString()}</pubDate>
          <guid isPermaLink="false">${postHref}</guid>
          <description>
          <![CDATA[${summary}]]>
          </description>
      </item>`
    })
  return {
    rssItemsXml,
    latestPostDate,
  }
}

const getRssXml = () => {
  const { rssItemsXml, latestPostDate } = contentsRssXml()

  return `<?xml version="1.0" ?>
        <rss
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:content="http://purl.org/rss/1.0/modules/content/"
          xmlns:atom="http://www.w3.org/2005/Atom"
          version="2.0"
        >
          <channel>
              <title><![CDATA[blog / carbonplan]]></title>
              <link>https://carbonplan.org/blog</link>
              <atom:link href="https://carbonplan.org/blog/rss.xml" rel="self" type="application/rss+xml" />
              <description>
                <![CDATA[Short posts from our team on topics in climate and technology.]]>
              </description>
              <language>en</language>
              <lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>
              ${rssItemsXml}
          </channel>
        </rss>`
}

const RSS = () => {}

export async function getServerSideProps(context) {
  const res = context.res
  if (!res) {
    return
  }
  const xml = getRssXml()
  res.setHeader('Content-Type', 'application/xml')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default RSS
