import { ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import '@carbonplan/maps/mapbox.css'
import theme from '@carbonplan/theme'
import { Code, Pre } from '@carbonplan/prism'

const components = {
  code: Code,
  pre: Pre,
}

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default App
