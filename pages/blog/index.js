import { useState } from 'react'
import { Layout } from '@carbonplan/components'

import Main from '../../components/main'
import { postMetadata } from '../../utils/metadata'

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
      url={'https://carbonplan.org/blog'}
      settings={{
        value: showMobileSettings,
        onClick: () => setShowMobileSettings(!showMobileSettings),
      }}
    >
      <Main showMobileSettings={showMobileSettings} posts={posts} />
    </Layout>
  )
}

export function getStaticProps() {
  return { props: { posts: postMetadata } }
}

export default Index
