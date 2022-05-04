import dynamic from 'next/dynamic'

const figures = {
  Map: dynamic(() => import('./figure.js')),
}

export default figures
