import React, { useState } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Icon from '../ui/Icon'
import Tag from '../ui/Tag'
import mixins from '../../styles/mixins'

const StyledProjects = styled.section`
  padding: 100px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 60px 0; }
`

const Heading = styled.h2`${mixins.sectionHeading}`

const SHOW_MORE_INCREMENT = 6

const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`

const Card = styled.li`
  background: ${({ theme }) => theme.colors.bgLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  transition: ${({ theme }) => theme.transition};
  &:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  a {
    color: ${({ theme }) => theme.colors.slate};
    transition: ${({ theme }) => theme.transition};
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
  }
`

const CardIconLinks = styled.div`
  display: flex;
  gap: 12px;
`

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 10px;
`

const CardDesc = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.slate};
  flex: 1;
  margin-bottom: 20px;
`

const CardTech = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const ShowMoreButton = styled.button`
  display: block;
  margin: 40px auto 0;
  padding: 12px 28px;
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  &:hover { background: ${({ theme }) => `${theme.colors.accentLight}33`}; }
`

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          excerpt(pruneLength: 120)
          frontmatter { title github external tech }
        }
      }
    }
  `)

  const projects = data.allMarkdownRemark.nodes
  const [showCount, setShowCount] = useState(SHOW_MORE_INCREMENT)

  if (!projects.length) return null

  return (
    <StyledProjects id="other-projects">
      <Heading>Other Projects</Heading>
      <Grid>
        {projects.slice(0, showCount).map(({ excerpt, frontmatter }, i) => (
          <Card key={i}>
            <CardHeader>
              <Icon name="Folder" size={36} style={{ color: '#DA7756' }} />
              <CardIconLinks>
                {frontmatter.github && (
                  <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Icon name="GitHub" size={18} />
                  </a>
                )}
                {frontmatter.external && (
                  <a href={frontmatter.external} target="_blank" rel="noopener noreferrer" aria-label="External link">
                    <Icon name="External" size={18} />
                  </a>
                )}
              </CardIconLinks>
            </CardHeader>
            <CardTitle>{frontmatter.title}</CardTitle>
            <CardDesc>{excerpt}</CardDesc>
            <CardTech>
              {frontmatter.tech?.map(t => <li key={t}><Tag>{t}</Tag></li>)}
            </CardTech>
          </Card>
        ))}
      </Grid>
      {showCount < projects.length && (
        <ShowMoreButton onClick={() => setShowCount(c => c + SHOW_MORE_INCREMENT)}>
          Show More
        </ShowMoreButton>
      )}
    </StyledProjects>
  )
}

export default Projects
