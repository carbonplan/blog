import { useState } from 'react'
import { Layout } from '@carbonplan/components'
import Main from '../../components/main'

const Index = () => {
  const [showMobileSettings, setShowMobileSettings] = useState(false)

  return (
    <Layout
      title={'blog / carbonplan'}
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
      <Main showMobileSettings={showMobileSettings} />
    </Layout>
  )
}

export default Index
