import dynamic from 'next/dynamic'

// NOTE: This is a dynamically generated file assuming that every file within the folder is a
//       kebeb-case-named file exporting a single figure. You may overwrite this file if that
//       assumption does not apply.
const figures = {
  TableHundred: dynamic(() => import('./table-hundred.js')),
  TableThousand: dynamic(() => import('./table-thousand.js')),
}

export default figures
