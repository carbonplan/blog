import { useState } from 'react'
import { Layout } from '@carbonplan/components'
import Main from '../../components/main'
import { getPostMetadata } from '../../utils/mdx-utils'

const Index = ({ posts }) => {
  const [showMobileSettings, setShowMobileSettings] = useState(false)

  return (
    <Layout
      title={'Blog – CarbonPlan'}
      description={
        'Short posts from our team on topics in climate and technology.'
      }
      card={'https://images.carbonplan.org/social/blog.png'}
      footer={true}
      links={'local'}
      nav={'blog'}
      settings={{
        value: showMobileSettings,
        onClick: () => setShowMobileSettings(!showMobileSettings),
      }}
    >
      <Main posts={posts} showMobileSettings={showMobileSettings} />
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getPostMetadata()
  return { props: { posts } }
}

export default Index
