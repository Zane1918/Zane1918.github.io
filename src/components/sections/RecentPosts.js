import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import mixins from '../../styles/mixins'
import useScrollReveal from '../../hooks/useScrollReveal'

const StyledRecentPosts = styled.section`
  padding: 100px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 60px 0; }
`

const HeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 40px;
`

const Heading = styled.h2`
  ${mixins.sectionHeading}
  margin-bottom: 0;
`

const ViewAll = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.accent};
  white-space: nowrap;
  &:hover { opacity: 0.8; }
`

const PostList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PostItem = styled.li`
  display: flex;
  gap: 20px;
  align-items: baseline;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 4px;
  }
`

const PostDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightSlate};
  flex-shrink: 0;
  min-width: 100px;
`

const PostTitle = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.navy};
  transition: ${({ theme }) => theme.transition};
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`

const RecentPosts = ({ t, posts, locale }) => {
  const ref = useScrollReveal()
  if (!posts || !posts.length) return null

  return (
    <StyledRecentPosts id="blog" ref={ref}>
      <HeaderRow>
        <Heading>{t.heading}</Heading>
        <ViewAll to={`/${locale}/blog/`}>{t.viewAll}</ViewAll>
      </HeaderRow>
      <PostList>
        {posts.map(({ frontmatter }) => (
          <PostItem key={frontmatter.slug}>
            <PostDate>{frontmatter.date}</PostDate>
            <PostTitle to={`/${locale}/blog/${frontmatter.slug}`}>{frontmatter.title}</PostTitle>
          </PostItem>
        ))}
      </PostList>
    </StyledRecentPosts>
  )
}

export default RecentPosts
