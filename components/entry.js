import { memo } from 'react'
import { Box, Grid, Text, Heading } from 'theme-ui'
import { Link, Tag } from '@carbonplan/components'
import Icon from './icon'

const Entry = ({ info, final }) => {
  let {
    title,
    color,
    tags,
    authors,
    version,
    date,
    icon,
    summary,
    links,
  } = info

  color = color || 'text'

  return (
    <Box sx={{}}>
      <Box
        id='box'
        sx={{
          pt: [4, 4, 4],
          pb: [4, 4, 4],
          borderStyle: 'solid',
          borderColor: 'muted',
          borderWidth: '0px',
          borderBottomWidth: final ? '0px' : '1px',
          color: 'text',
        }}
      >
        <Grid
          id='grid'
          columns={[
            1,
            icon ? '1fr 175px' : '1fr 150px',
            icon ? '1fr 175px' : '1fr 150px',
          ]}
          gap={[0, 0, 16]}
        >
          <Box>
            <Text
              sx={{
                color: 'secondary',
                fontFamily: 'mono',
                letterSpacing: '0.05em',
                fontSize: [2],
                userSelect: 'none',
              }}
            >
              {date}{' '}
              {false && (
                <>
                  <Text
                    as='span'
                    sx={{
                      color: 'text',
                      fontFamily: 'mono',
                      letterSpacing: '0.05em',
                      fontSize: [2],
                    }}
                  >
                    /
                  </Text>{' '}
                  v{version}
                </>
              )}
            </Text>
            <Heading
              sx={{
                mb: ['2px'],
                mt: ['10px'],
                ml: ['-1px'],
                fontSize: [5],
                color: color,
              }}
            >
              {title}
            </Heading>
            <Text sx={{ my: [2], fontSize: [2], lineHeight: 1.3 }}>
              {summary}
            </Text>
            <Box sx={{ mt: [3], fontSize: [2], userSelect: 'none' }}>
              <Box sx={{ mt: [0, 0, '-4px'] }}>
                {links.map((link, ix) => {
                  const pad = links.length > 1 && ix < links.length - 1
                  return (
                    <Link key={ix} href={link.url}>
                      <Text
                        as='span'
                        sx={{
                          color: 'secondary',
                          mr: [4],
                          mb: [pad ? 2 : 0, pad ? 2 : 0, 0],
                          mt: [0, 0, 1],
                          cursor: 'pointer',
                          transition: '0.15s',
                          display: ['block', 'block', 'inline-block'],
                          float: ['left', 'left', 'initial'],
                          clear: ['left', 'left', 'initial'],
                          '&:hover': {
                            color: 'text',
                          },
                        }}
                      >
                        {link.label}
                        <Box as='span' sx={{ position: 'relative' }}>
                          <Text
                            as='span'
                            sx={{
                              position: 'absolute',
                              top: '-5px',
                              left: '3px',
                              fontSize: [4],
                            }}
                          >
                            ↗
                          </Text>
                        </Box>
                      </Text>
                    </Link>
                  )
                })}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                textAlign: 'right',
                display: ['none', 'none', 'block'],
                mt: ['-1px'],
              }}
            >
              {tags
                .sort((a, b) => (a > b ? 1 : -1))
                .map((tag) => (
                  <Tag
                    key={tag}
                    label={tag}
                    sx={{
                      ml: [2],
                      mr: [0],
                      color: 'secondary',
                    }}
                  />
                ))}
            </Box>
            {icon && (
              <Link href={links[0].url}>
                <Icon icon={icon} color={color} />
              </Link>
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default memo(Entry)
