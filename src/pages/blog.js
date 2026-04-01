import { useEffect } from 'react'
import { navigate } from 'gatsby'

export default function BlogRedirectPage() {
  useEffect(() => {
    navigate('/en/blog/', { replace: true })
  }, [])
  return null
}
