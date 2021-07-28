import { useState } from 'react'
import { Layout } from '@carbonplan/components'
import Main from '../../components/main'

const Index = () => {
  const [showMobileSettings, setShowMobileSettings] = useState(false)

  return (
    <Layout
      title={'blog / carbonplan'}
      description={'Short updates on what we do at CarbonPlan'}
      card={'https://images.carbonplan.org/social/blog.png'}
      footer={false}
      links={'local'}
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
