import dynamic from 'next/dynamic'

const figures = {
  Chart: dynamic(() => import('./figure.js')),
}

export default figures
