const fs = require('fs')
const glob = require('glob')

glob.sync('./components/mdx/figures.js').forEach((f) => {
  if (fs.rmSync) return fs.rmSync(f)
})

const createMissingFigures = () => {
  const posts = fs.readdirSync('./posts').filter((p) => !p.match(/\.md/))
  const existingFigures = glob
    .sync('./posts/**/figures.js')
    .map((figurePath) => figurePath.match(/[^/]+(?=\/figures\.js)/)[0])

  const postsMissingFigures = posts.filter(
    (id) => !existingFigures.includes(id)
  )
  postsMissingFigures.forEach((id) => {
    const figurePaths = glob.sync(`./posts/${id}/**.js`)
    const figureMapping = figurePaths.map((figurePath) => {
      const [fileName] = figurePath.match(/[^/]+(?=\.js)/)
      const componentName = fileName.replace(/(^\w|-\w)/g, (text) =>
        text.replace(/-/, '').toUpperCase()
      )
      const relativePath = `./${fileName}.js`

      return { componentName, relativePath }
    })

    const file = `
    import dynamic from 'next/dynamic'
    
    // NOTE: This is a dynamically generated file assuming that every file within the folder is a
    //       kebeb-case-named file exporting a single figure. You may overwrite this file if that
    //       assumption does not apply.
    const figures = {
      ${figureMapping
        .map(
          ({ componentName, relativePath }) =>
            `${componentName}: dynamic(() => import('${relativePath}'))`
        )
        .join(',')}
    }
    
    export default figures
    `
    fs.writeFileSync(`./posts/${id}/figures.js`, file)
  })
}

const combineFigures = () => {
  const figurePaths = glob.sync('./posts/**/figures.js')
  const figureMapping = figurePaths.map((figurePath) => {
    const [postId] = figurePath.match(/[^/]+(?=\/figures\.js)/)
    const importPath = figurePath.replace(/\.\//, '../../').replace(/\.js/, '')
    const importName = postId.replace(/-\w/g, (text) =>
      text.replace(/-/, '').toUpperCase()
    )
    return { postId, importPath, importName }
  })

  const file = `
${figureMapping
  .map(
    ({ importPath, importName }) =>
      `import { default as ${importName} } from '${importPath}'`
  )
  .join('\n')}

const postFigures = {
${figureMapping
  .map(({ postId, importName }) => `'${postId}': ${importName}`)
  .join(',\n')}
}

export default postFigures
`
  fs.writeFileSync('./components/mdx/figures.js', file)
}

createMissingFigures()
combineFigures()
