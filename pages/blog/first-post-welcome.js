import Index, { meta } from '../../posts/first-post-welcome.md'
import { Post } from '@carbonplan/layouts'

const Content = () => (
  <Post meta={meta} number={0}>
    <Index />
  </Post>
)

export default Content
