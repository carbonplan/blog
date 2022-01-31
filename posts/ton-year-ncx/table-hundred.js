import { Table } from '@carbonplan/components'

const table = [
  [
    '',
    'Emission at t=0',
    'Emission at t=1',
    'Benefit of delay',
    'Equivalence ratio',
  ],
  ['Units', 'ton-years', 'ton-years', 'ton-years', 'unitless'],
  ['Undiscounted', '53.07', '52.66', '0.41', '129.61'],
  ['Discounted', '18.69', '18.07', '0.62', '30.08'],
]

const TableHundred = () => {
  return (
    <Table
      as='figure'
      sx={{ mt: [6, 6, 6, 7], mb: [4, 4, 4, 5] }}
      columns={[4, 6, 6, 6]}
      start={[
        [1, 1, 1, 1],
        [1, 3, 3, 3],
        [2, 4, 4, 4],
        [3, 5, 5, 5],
        [4, 6, 6, 6],
      ]}
      width={[
        [4, 2, 2, 2],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ]}
      data={table}
    />
  )
}

export default TableHundred
