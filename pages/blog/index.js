import { Layout } from '@carbonplan/components'
import Main from '../../components/main'

const Index = () => {
  return (
    <Layout
      title={'blog / carbonplan'}
      description={'Short updates on what we do at CarbonPlan'}
      card={'https://images.carbonplan.org/social/blog.png'}
      footer={false}
      links={'local'}
      metadata={'POSTS: 9'}
    >
      <Main />
    </Layout>
  )
}

export default Index
