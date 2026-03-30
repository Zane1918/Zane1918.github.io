import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from './usePrefersReducedMotion'
const config = require('../config')

const useScrollReveal = (srConfig = config.srConfig()) => {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return
    const ScrollReveal = require('scrollreveal').default
    ScrollReveal().reveal(ref.current, srConfig)
  }, [])

  return ref
}

export default useScrollReveal
