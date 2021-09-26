import { Box } from 'theme-ui'
import { Badge, Group, Select, Slider } from '@carbonplan/components'

const sx = {
  fontFamily: 'mono',
  fontSize: [1, 1, 1, 2],
  letterSpacing: 'mono',
  textTransform: 'uppercase',
  position: 'absolute',
}
const Parameters = ({ band, setBand, month, setMonth }) => {
  return (
    <>
      <Box sx={{ ...sx, bottom: 18, left: 20 }}>
        <Group spacing='sm'>
          <Box>
            Variable
            <Box sx={{ mt: ['1px'] }}>
              <Select
                value={band}
                onChange={(e) => setBand(e.target.value)}
                sx={{ display: 'block' }}
                size='xs'
              >
                <option value='prec'>Precipitation</option>
                <option value='tavg'>Temperature</option>
              </Select>
            </Box>
          </Box>
          <Box>
            Month
            <Box sx={{ mt: ['-1px'] }}>
              <Slider
                min={1}
                max={12}
                step={1}
                sx={{ width: '175px', display: 'inline-block' }}
                value={month}
                onChange={(e) => setMonth(parseFloat(e.target.value))}
              />
              <Badge
                sx={{
                  bg: 'primary',
                  color: 'background',
                  display: 'inline-block',
                  position: 'relative',
                  ml: [3],
                  top: ['2px', '2px', '2px', '3px'],
                  fontSize: [1, 1, 1, 2],
                  height: ['21px', '21px', '21px', '24px'],
                }}
              >
                {month.toFixed(0)}
              </Badge>
            </Box>
          </Box>
        </Group>
      </Box>
    </>
  )
}

export default Parameters
