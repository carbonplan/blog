import dynamic from 'next/dynamic'

const figures = {
  MapDemo2d: dynamic(() => import('./maps-demo-2d.js')),
  MapDemo4d: dynamic(() => import('./maps-demo-4d.js')),
}

export default figures
