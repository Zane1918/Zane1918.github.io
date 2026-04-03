import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/Layout'
import mixins from '../styles/mixins'
import { selectLocale } from '../i18n'
import config from '../config'

const StyledBlog = styled.section`
  padding: 80px 0;
`

const Heading = styled.h1`
  ${mixins.sectionHeading}
`

const PostList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const PostItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 32px;
  &:last-child { border-bottom: none; }
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`

const PostDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightSlate};
`

const TagList = styled.ul`
  list-style: none;
  display: flex;
  gap: 6px;

  li {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 11px;
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => `${theme.colors.accentLight}66`};
    padding: 1px 8px;
    border-radius: 3px;
  }
`

const PostTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 8px;
  transition: ${({ theme }) => theme.transition};

  a {
    color: inherit;
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
  }
`

const PostExcerpt = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.slate};
`

export const Head = ({ pageContext }) => {
  const t = selectLocale(pageContext.locale)
  const htmlLang = pageContext.locale === 'zh' ? 'zh-CN' : 'en'
  const altHtmlLang = pageContext.locale === 'zh' ? 'en' : 'zh-CN'
  const { siteUrl } = config
  const currentPath = `/${pageContext.locale}/blog/`
  const ogLocale = pageContext.locale === 'zh' ? 'zh_CN' : 'en_US'
  const ogLocaleAlt = pageContext.locale === 'zh' ? 'en_US' : 'zh_CN'
  const ogTitle = t.meta.blogTitle
  const ogDesc = t.meta.blogDesc
  return (
    <>
      <html lang={htmlLang} />
      <title>{ogTitle}</title>
      <meta name="description" content={ogDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:url" content={`${siteUrl}${currentPath}`} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      <meta property="og:site_name" content={config.name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDesc} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
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

export default function BlogListTemplate({ data, pageContext }) {
  const { locale, alternatePath } = pageContext
  const t = selectLocale(locale)
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout locale={locale} alternatePath={alternatePath} t={t}>
      <StyledBlog>
        <Heading>{t.blog.heading}</Heading>
        <PostList>
          {posts.map(({ frontmatter }) => (
            <PostItem key={frontmatter.slug}>
              <PostMeta>
                <PostDate>{frontmatter.date}</PostDate>
                {frontmatter.tags?.length > 0 && (
                  <TagList>
                    {frontmatter.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </TagList>
                )}
              </PostMeta>
              <PostTitle>
                <Link to={`/${locale}/blog/${frontmatter.slug}`}>{frontmatter.title}</Link>
              </PostTitle>
              {frontmatter.excerpt && <PostExcerpt>{frontmatter.excerpt}</PostExcerpt>}
            </PostItem>
          ))}
        </PostList>
      </StyledBlog>
    </Layout>
  )
}

export const query = graphql`
  query BlogListQuery($locale: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/(en|zh)/posts/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          date(formatString: "MMMM D, YYYY")
          tags
          excerpt
        }
      }
    }
  }
`
