import { useState, useEffect } from 'react'
import zarr from 'zarr-js'

const useZarr = (uri, variables = [], options = {}) => {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [metadata, setMetadata] = useState()

  let { array, async } = options

  array = array === undefined ? 'auto' : array
  async = async || false

  const open = () => {
    zarr().open(uri, (error, data) => {
      if (error) setError(error)
      setData(data)
    })
  }

  const load = () => {
    zarr().load(uri, (error, data) => {
      if (error) setError(error)
      setData(data)
    })
  }

  const openGroup = (metadata) => {
    zarr().openGroup(uri, (error, data, metadata) => {
      if (error) setError(error)
      setMetadata(metadata)
      setData(data)
    }, variables, metadata)
  }

  const loadGroup = (metadata) => {
    zarr().loadGroup(uri, (error, data, metadata) => {
      if (error) setError(error)
      setMetadata(metadata)
      setData(data)
    }, variables, metadata)
  }

  useEffect(() => {
    if (array === 'auto') {
      fetch(uri + '/.zmetadata').then(res => {
        if (res.status === 200) {
          res.json().then(metadata => {
            if (async) {
              openGroup(metadata)
            } else {
              loadGroup(metadata)
            }
            
          })
        } else {
          if (async) {
            open()
          } else {
            load()
          }
        }
      })
    } else if (array) {
      if (async) {
        open()
      } else {
        load()
      }
    } else {
      if (async) {
        openGroup()
      } else {
        loadGroup()
      }
    }
  }, [uri])

  return { data, error, metadata }
}

export default useZarr
