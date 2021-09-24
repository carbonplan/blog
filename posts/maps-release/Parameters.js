import { Box } from 'theme-ui'
import { Badge, Filter, Group, Slider } from '@carbonplan/components'

const sx = {
  fontFamily: 'mono',
  letterSpacing: 'mono',
  textTransform: 'uppercase',
}
const Parameters = ({ band, setBand, month, setMonth }) => {
  return (
    <Group direction='horizontal'>
      <Box sx={sx}>
        Variable
        <Filter
          values={{ prec: band === 'prec', tavg: band === 'tavg' }}
          setValues={(v) => setBand(v.tavg ? 'tavg' : 'prec')}
        />
      </Box>
      <Box sx={sx}>
        Month
        <Box>
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
              top: [1],
            }}
          >
            {month.toFixed(0)}
          </Badge>
        </Box>
      </Box>
    </Group>
  )
}

export default Parameters
