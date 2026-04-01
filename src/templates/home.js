import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Featured from '../components/sections/Featured'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'
import RecentPosts from '../components/sections/RecentPosts'
import { selectLocale } from '../i18n'

export const Head = ({ pageContext }) => {
  const t = selectLocale(pageContext.locale)
  const htmlLang = pageContext.locale === 'zh' ? 'zh-CN' : 'en'
  const altLang = pageContext.locale === 'zh' ? 'en' : 'zh'
  const altHtmlLang = altLang === 'zh' ? 'zh-CN' : 'en'
  const siteUrl = 'https://zane1918.github.io'
  const currentPath = `/${pageContext.locale}/`
  return (
    <>
      <html lang={htmlLang} />
      <title>{t.meta.homeTitle}</title>
      <meta name="description" content={t.meta.homeDesc} />
      {pageContext.alternatePath && (
        <>
          <link rel="alternate" hreflang={htmlLang} href={`${siteUrl}${currentPath}`} />
          <link rel="alternate" hreflang={altHtmlLang} href={`${siteUrl}${pageContext.alternatePath}`} />
          <link rel="alternate" hreflang="x-default" href={`${siteUrl}/en/`} />
        </>
      )}
    </>
  )
}

export default function HomeTemplate({ data, pageContext }) {
  const { locale, alternatePath } = pageContext
  const t = selectLocale(locale)

  return (
    <Layout locale={locale} alternatePath={alternatePath} t={t}>
      <Hero t={t.hero} />
      <About t={t.about} />
      <Experience t={t.experience} jobs={data.jobs.nodes} />
      <Featured t={t.featured} projects={data.featured.nodes} />
      <Projects t={t.projects} projects={data.projects.nodes} />
      <Contact t={t.contact} />
      <RecentPosts t={t.recentPosts} posts={data.recentPosts.nodes} locale={locale} />
    </Layout>
  )
}

export const query = graphql`
  query HomeQuery($locale: String!) {
    jobs: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/(en|zh)/jobs/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        html
        frontmatter { title company range url }
      }
    }
    featured: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/(en|zh)/featured/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        html
        frontmatter { title github external tech }
      }
    }
    projects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/(en|zh)/projects/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 120)
        frontmatter { title github external tech }
      }
    }
    recentPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/(en|zh)/posts/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        frontmatter {
          title
          slug
          date(formatString: "MMM D, YYYY")
        }
      }
    }
  }
`
