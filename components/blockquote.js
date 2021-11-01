import { Box } from 'theme-ui'

const Blockquote = ({ children }) => {
  const firstChar = children.props.children.slice(0, 1)
  const textIndent = firstChar === '“' ? ['-0.4em'] : [0]
  return (
    <Box
      sx={{
        bg: 'hinted',
        color: 'primary',
        fontFamily: 'body',
        lineHeight: '1.35',
        fontSize: [3, 3, 3, 4],
        borderRadius: '1px',
        mx: [0],
        my: [4, 4, 4, 5],
        p: [3, 3, 3, 4],
        textIndent: textIndent,
        '> p': {
          m: [0],
        },
      }}
    >
      {children}
    </Box>
  )
}

export default Blockquote
