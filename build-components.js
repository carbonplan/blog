const fs = require('fs')
const glob = require('glob')
const { postMetadata } = require('./utils/metadata.js')

glob.sync('./components/mdx/page-components.js').forEach((f) => {
  if (fs.rmSync) return fs.rmSync(f)
})

const buildComponents = () => {
  const componentMapping = postMetadata.map(({ id, components = [] }) => ({
    id,
    imports: components.map(({ name, src, exportName }) => ({
      name,
      exportName,
      src: src
        .replace(/^\.\//, `../../posts/${id}/`)
        .replace('../../components/', '../'),
    })),
  }))

  const file = `
  import dynamic from 'next/dynamic'
  
  // NOTE: This is a dynamically generated file based on the config specified under the
  //       \`components\` key in each post's frontmatter.
  const components = {
    ${componentMapping
      .map(
        ({ id, imports }) => `
      '${id}': {${imports
          .map(
            ({ name, src, exportName }) =>
              `${name}: dynamic(() => import('${src}').then((mod) => mod.${
                exportName ?? name
              } || mod.default))`
          )
          .join(',')}}
      `
      )
      .join(',')}
  }
  
  export default components
  `

  fs.writeFileSync('./components/mdx/page-components.js', file)
}

buildComponents()
