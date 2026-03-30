import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/Layout'

const Article = styled.article`
  padding: 80px 0;
`

const PostHeader = styled.header`
  margin-bottom: 48px;
`

const TagList = styled.ul`
  list-style: none;
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  li {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 12px;
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => `${theme.colors.accentLight}66`};
    padding: 2px 10px;
    border-radius: 4px;
  }
`

const PostTitle = styled.h1`
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navy};
  line-height: 1.2;
  margin-bottom: 16px;
`

const PostDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.lightSlate};
`

const PostBody = styled.div`
  h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.navy};
    margin: 40px 0 16px;
  }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }

  p {
    font-size: 17px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.slate};
    margin-bottom: 20px;
  }

  ul, ol {
    padding-left: 24px;
    margin-bottom: 20px;
    li {
      font-size: 17px;
      line-height: 1.8;
      color: ${({ theme }) => theme.colors.slate};
      margin-bottom: 8px;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 14px;
    background: ${({ theme }) => `${theme.colors.accentLight}44`};
    padding: 2px 6px;
    border-radius: 4px;
  }

  pre {
    background: ${({ theme }) => theme.colors.navy};
    color: #e2e8f0;
    padding: 24px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 24px;
    code {
      background: none;
      padding: 0;
      font-size: 14px;
      color: inherit;
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.accent};
    padding: 8px 24px;
    margin: 24px 0;
    p { color: ${({ theme }) => theme.colors.lightSlate}; font-style: italic; }
  }
`

const NavRow = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 80px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  a {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.accent};
    &:hover { opacity: 0.8; }
  }
`

export const Head = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} | Zeng Jia</title>
    <meta name="description" content={data.markdownRemark.frontmatter.excerpt || ''} />
  </>
)

const BlogPost = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark
  const { prevSlug, nextSlug } = pageContext

  return (
    <Layout>
      <Article>
        <PostHeader>
          {frontmatter.tags?.length > 0 && (
            <TagList>
              {frontmatter.tags.map(tag => <li key={tag}>{tag}</li>)}
            </TagList>
          )}
          <PostTitle>{frontmatter.title}</PostTitle>
          <PostDate>{frontmatter.date}</PostDate>
        </PostHeader>
        <PostBody dangerouslySetInnerHTML={{ __html: html }} />
        <NavRow>
          <div>{prevSlug && <Link to={`/blog/${prevSlug}`}>← Previous</Link>}</div>
          <div>{nextSlug && <Link to={`/blog/${nextSlug}`}>Next →</Link>}</div>
        </NavRow>
      </Article>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        tags
        excerpt
      }
    }
  }
`

export default BlogPost
