import { Table } from '@carbonplan/components'

const EmissionsTable = ({ data }) => {
  const titles = [
    'Scenario',
    'Net Zero date',
    'CDR in 2045 (million tCO₂e)',
    'CDR in 2045 (percent)',
    'Emission Reductions in 2045 (percent)',
  ]
  return (
    <Table
      columns={[4, 5, 5, 5]}
      index={false}
      start={[
        [1, 1, 1, 1],
        [1, 2, 2, 2],
        [2, 3, 3, 3],
        [3, 4, 4, 4],
        [4, 5, 5, 5],
      ]}
      width={[
        [4, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ]}
      data={[titles].concat(data)}
    />
  )
}

export default EmissionsTable
