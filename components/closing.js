import { Divider } from 'theme-ui'
import { Row, Column, Callout } from '@carbonplan/components'

const Closing = () => {
  return (
    <>
      <Divider sx={{ mt: [6, 6, 7, 7] }} />
      <Row as='section' columns={[6]} sx={{ mt: [6, 6, 7, 8] }}>
        <Column start={[1]} width={[3, 3, 3, 3]}>
          <Callout href='mailto:hello@carbonplan.org' label={'email us'}>
            Questions? Interested in collaborating on these problems?
          </Callout>
        </Column>
        <Column start={[4, 5, 5, 5]} width={[3, 2, 2, 2]}>
          <Callout href='/blog' label={'blog'}>
            Want to read more from our team?
          </Callout>
        </Column>
      </Row>
    </>
  )
}

export default Closing
