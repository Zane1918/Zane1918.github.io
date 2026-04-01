import { useEffect } from 'react'
import { navigate } from 'gatsby'

export const Head = () => (
  <>
    <title>Zeng Jia</title>
    <meta httpEquiv="refresh" content="0;url=/en/" />
  </>
)

export default function IndexPage() {
  useEffect(() => {
    navigate('/en/', { replace: true })
  }, [])
  return null
}
