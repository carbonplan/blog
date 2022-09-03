import { Column, Row, Table } from '@carbonplan/components'
import { Box } from 'theme-ui'
import SpaceChunking from './space-chunking'
import TimeChunking from './time-chunking'

const Color = ({ color, children }) => (
  <Box as='span' sx={{ color }}>
    {children}
  </Box>
)

const ArrayDiagram = ({ chunking }) => {
  let diagram
  let arrayData
  let chunkData
  switch (chunking) {
    case 'time':
      diagram = <TimeChunking />
      arrayData = {
        bytes: '1.42 GiB',
        shape: (
          <Box key='shape'>
            (<Color color='pink'>366</Color>, <Color color='red'>721</Color>,{' '}
            <Color color='orange'>1440</Color>)
          </Box>
        ),
        count: '746 Tasks',
        type: 'float32',
      }
      chunkData = {
        bytes: '3.96 MiB',
        shape: (
          <Box key='shape'>
            (<Color color='pink'>1</Color>, <Color color='red'>721</Color>,{' '}
            <Color color='orange'>1440</Color>)
          </Box>
        ),
        count: '366 Chunks',
        type: 'numpy.ndarray',
      }

      break
    case 'space':
      diagram = <SpaceChunking />
      arrayData = {
        bytes: '1.42 GiB',
        shape: (
          <Box key='shape'>
            (<Color color='pink'>366</Color>, <Color color='red'>721</Color>,{' '}
            <Color color='orange'>1440</Color>)
          </Box>
        ),
        count: '2076672 Tasks',
        type: 'float32',
      }
      chunkData = {
        bytes: '1.43 kiB',
        shape: (
          <Box key='shape'>
            (<Color color='pink'>366</Color>, <Color color='red'>1</Color>,{' '}
            <Color color='orange'>1</Color>)
          </Box>
        ),
        count: '1038240 Chunks',
        type: 'numpy.ndarray',
      }
      break

    default:
      throw new Error(`Unexpected chunking: ${chunking}`)
  }

  return (
    <Row columns={6}>
      <Column
        start={[2, 2, 1, 1]}
        width={[4, 4, 3, 3]}
        sx={{ mb: [2, 3, 3, 4] }}
      >
        {diagram}
      </Column>
      <Column start={1} width={[6, 6]}>
        <Table
          columns={[8, 6, 15, 6]}
          start={[
            [1, 1, 1, 1],
            [1, 2, 3, 2],
            [3, 3, 6, 3],
            [5, 5, 10, 5],
            [7, 6, 13, 6],
          ]}
          width={[
            [8, 1, 2, 1],
            [2, 1, 3, 1],
            [2, 2, 4, 2],
            [2, 1, 3, 1],
            [2, 1, 3, 1],
          ]}
          data={[
            ['', 'Bytes', 'Shape', 'Count', 'Type'],
            [
              'Array',
              arrayData.bytes,
              arrayData.shape,
              arrayData.count,
              arrayData.type,
            ],
            [
              'Chunk',
              chunkData.bytes,
              chunkData.shape,
              chunkData.count,
              chunkData.type,
            ],
          ]}
          sx={{ display: ['none', 'none', 'initial', 'initial'] }}
        />

        <Table
          columns={[4, 6, 6, 6]}
          start={[
            [1, 1, 1, 1],
            [1, 2, 2, 2],
            [3, 4, 4, 4],
          ]}
          width={[
            [1, 1, 1, 1],
            [2, 2, 2, 2],
            [2, 2, 2, 2],
          ]}
          data={[
            ['', 'Array', 'Chunk'],
            ['Bytes', arrayData.bytes, chunkData.bytes],
            ['Shape', arrayData.shape, chunkData.shape],
            ['Count', arrayData.count, chunkData.count],
            ['Type', arrayData.type, chunkData.type],
          ]}
          sx={{ display: ['initial', 'initial', 'none', 'none'] }}
        />
      </Column>
    </Row>
  )
}

export default ArrayDiagram
