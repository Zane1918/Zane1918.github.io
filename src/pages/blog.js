import { useEffect } from 'react'
import { navigate } from 'gatsby'

export const Head = () => (
  <>
    <title>Blog | Zeng Jia</title>
    <meta httpEquiv="refresh" content="0;url=/en/blog/" />
  </>
)

export default function BlogRedirectPage() {
  useEffect(() => {
    navigate('/en/blog/', { replace: true })
  }, [])
  return null
}
