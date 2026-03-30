import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'

export const Head = () => (
  <>
    <title>Zeng Jia | Algorithm Engineer</title>
    <meta name="description" content="Algorithm Engineer at Trip.com. I build intelligent systems at scale." />
  </>
)

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
    </Layout>
  )
}
