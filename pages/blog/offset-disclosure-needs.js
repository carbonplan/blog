import Index, { meta } from '../../posts/offset-disclosure-needs.md'
import { Post } from '@carbonplan/layouts'

const Content = () => (
  <Post meta={meta} number={10}>
    <Index />
  </Post>
)

export default Content
