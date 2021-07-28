import Index, { meta } from '../../posts/test-post-2.md'
import Post from '../../components/post'

const Content = () => (
  <Post meta={meta}>
    <Index />
  </Post>
)

export default Content
