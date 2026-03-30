import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Featured from '../components/sections/Featured'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'
import RecentPosts from '../components/sections/RecentPosts'

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
      <About />
      <Experience />
      <Featured />
      <Projects />
      <Contact />
      <RecentPosts />
    </Layout>
  )
}
