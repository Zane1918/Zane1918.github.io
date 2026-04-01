import { useEffect } from 'react'
import { navigate } from 'gatsby'

export default function IndexPage() {
  useEffect(() => {
    navigate('/en/', { replace: true })
  }, [])
  return null
}
