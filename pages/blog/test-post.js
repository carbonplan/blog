import Index, { meta } from '../../posts/test-post.md'
import Post from '../../components/post'

const Content = () => (
  <Post meta={meta} number={1}>
    <Index />
  </Post>
)

export default Content
