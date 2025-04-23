import { Box, Flex, IconButton } from 'theme-ui'
import { Row, Column, Input, Button } from '@carbonplan/components'
import { RotatingArrow, Search, X } from '@carbonplan/icons'
import { useEffect, useState } from 'react'
import { format } from 'd3-format'
import useSWR from 'swr'

export const formatValue = (value) => {
  if (value < 1000) {
    return value
  } else {
    let result = format('.3s')(value)
    if (value >= 1e9) {
      return result.replace('G', 'B')
    }
    return result.toUpperCase(0)
  }
}

const sx = {
  row: {
    borderStyle: 'solid',
    borderWidth: '0px',
    borderTopWidth: '1px',
    borderColor: 'muted',
    height: '100%',
    py: [3, 3, 3, 4],
  },
  label: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
  },
  value: {
    fontFamily: 'faux',
    letterSpacing: 'faux',
    textTransform: 'uppercase',
    color: 'purple',
    fontSize: [3, 3, 3, 4],
  },
}

async function getTransactions([, search]) {
  try {
    const reqUrl = new URL(
      `https://carbonplan.org/research/offsets-db/api/query`
    )
    const params = new URLSearchParams()
    params.append('path', 'credits')
    params.append('per_page', 1)
    params.append('transaction_type', 'retirement')
    if (search) {
      params.append('beneficiary_search', search.trim())
      params.append(
        'beneficiary_search_fields',
        'retirement_beneficiary_harmonized'
      )
      params.append('beneficiary_search_fields', 'retirement_account')
      params.append('beneficiary_search_fields', 'retirement_beneficiary')
      params.append('beneficiary_search_fields', 'retirement_note')
      params.append('beneficiary_search_fields', 'retirement_reason')
    }
    reqUrl.search = params.toString()
    const serverRes = await fetch(reqUrl, {
      credentials: 'include',
    })
    if (!serverRes.ok) {
      throw new Error(
        `API request failed: ${serverRes.status} ${serverRes.statusText}`
      )
    }
    const result = await serverRes.json()
    return result.pagination.total_entries
  } catch (e) {
    throw new Error('Unexpected error')
  }
}

export const useDebounce = (value, delay = 100) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [value, delay])

  return debounced
}

const BeneficiarySearch = () => {
  const [search, setSearch] = useState('Delta Airlines')
  const { data: transactions, isLoading } = useSWR(
    ['/credits', useDebounce(search)],
    getTransactions,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  )
  return (
    <>
      <Row columns={6} sx={sx.row}>
        <Column start={1} width={[3, 2, 2, 2]}>
          <Box sx={sx.label}>
            <Flex
              as='label'
              htmlFor='beneficiary_search'
              sx={{ gap: 2, alignItems: 'center' }}
            >
              User <Search sx={{ width: 14 }} />
            </Flex>
          </Box>
        </Column>
        <Column start={[4, 3, 3, 3]} width={[3, 4, 4, 4]}>
          <Flex sx={{ justifyContent: 'space-between' }}>
            <Input
              id='beneficiary_search'
              placeholder='enter a search term'
              color='purple'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                ...(search ? sx.value : { fontFamily: 'mono', fontSize: 2 }),
                height: '22px',
                textTransform: 'none',
                borderBottom: 0,
                borderColor: 'muted',
                flexGrow: 1,
              }}
            />
            <IconButton
              sx={{
                cursor: 'pointer',
                p: [0],
                mt: ['3px', '3px', '3px', '4px'],
                mx: [2],
                width: 18,
                height: 18,
                flexShrink: 0,
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearch('')
                }
              }}
              onClick={() => {
                setSearch('')
              }}
            >
              <X
                sx={{
                  strokeWidth: 1.5,
                  color: 'secondary',
                  transition: 'stroke 0.15s',
                  '@media (hover: hover) and (pointer: fine)': {
                    '&:hover': {
                      stroke: 'primary',
                    },
                  },
                }}
              />
            </IconButton>
          </Flex>
        </Column>
      </Row>
      <Row columns={6} sx={sx.row}>
        <Column start={1} width={[3, 2, 2, 2]}>
          <Box sx={sx.label}>Retirements</Box>
        </Column>
        <Column start={[4, 3, 3, 3]} width={[3, 4, 4, 4]}>
          <Flex
            sx={{
              height: '100%',
              alignItems: 'baseline',
              gap: 2,
              mt: [0, 0, 0, '-6px'],
            }}
          >
            <Box sx={sx.value}>
              {!isLoading && typeof transactions === 'number'
                ? formatValue(transactions)
                : '—'}
            </Box>
            <Box sx={{ fontFamily: 'mono' }}>
              {transactions === 1 ? 'transaction' : 'transactions'}
            </Box>
          </Flex>
        </Column>
      </Row>
      <Row columns={6} sx={{ ...sx.row, pb: 0 }}>
        <Column start={[4, 3, 3, 3]} width={[3, 4, 4, 4]}>
          <Button
            suffix={<RotatingArrow />}
            size='xs'
            inverted
            href={`https://carbonplan.org/research/offsets-db/transactions${
              search ? `?beneficiary=${search}` : ''
            }`}
          >
            View in OffsetsDB
          </Button>
        </Column>
      </Row>
    </>
  )
}

export default BeneficiarySearch
