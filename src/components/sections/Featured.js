import React from 'react'
import styled from 'styled-components'
import Icon from '../ui/Icon'
import Tag from '../ui/Tag'
import mixins from '../../styles/mixins'
import useScrollReveal from '../../hooks/useScrollReveal'

const StyledFeatured = styled.section`
  padding: 100px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 60px 0; }
`

const Heading = styled.h2`${mixins.sectionHeading}`

const ProjectList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 60px;
`

const Project = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  &:nth-child(even) {
    direction: rtl;
    > * { direction: ltr; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    &:nth-child(even) { direction: ltr; }
  }
`

const ProjectContent = styled.div``

const FeaturedLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 8px;
`

const ProjectTitle = styled.h3`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 16px;
`

const Description = styled.div`
  background: ${({ theme }) => theme.colors.bgLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px 24px;
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.slate};
  margin-bottom: 20px;
`

const TechList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`

const Links = styled.div`
  display: flex;
  gap: 16px;
  a {
    color: ${({ theme }) => theme.colors.slate};
    transition: ${({ theme }) => theme.transition};
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
  }
`

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.colors.accentLight};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const Featured = ({ t, projects }) => {
  const ref = useScrollReveal()
  if (!projects || !projects.length) return null

  return (
    <StyledFeatured id="projects" ref={ref}>
      <Heading>{t.heading}</Heading>
      <ProjectList>
        {projects.map(({ html, frontmatter }, i) => (
          <Project key={i}>
            <ProjectContent>
              <FeaturedLabel>{t.label}</FeaturedLabel>
              <ProjectTitle>{frontmatter.title}</ProjectTitle>
              <Description dangerouslySetInnerHTML={{ __html: html }} />
              <TechList>
                {frontmatter.tech?.map(tech => <li key={tech}><Tag>{tech}</Tag></li>)}
              </TechList>
              <Links>
                {frontmatter.github && (
                  <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Icon name="GitHub" size={20} />
                  </a>
                )}
                {frontmatter.external && (
                  <a href={frontmatter.external} target="_blank" rel="noopener noreferrer" aria-label="External link">
                    <Icon name="External" size={20} />
                  </a>
                )}
              </Links>
            </ProjectContent>
            <ImagePlaceholder>Project Screenshot</ImagePlaceholder>
          </Project>
        ))}
      </ProjectList>
    </StyledFeatured>
  )
}

export default Featured
