import React, { useState } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import mixins from '../../styles/mixins'

const StyledExperience = styled.section`
  padding: 100px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 60px 0; }
`

const Heading = styled.h2`${mixins.sectionHeading}`

const TabsWrapper = styled.div`
  display: flex;
  gap: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const TabList = styled.ul`
  list-style: none;
  border-right: 2px solid ${({ theme }) => theme.colors.border};
  min-width: 160px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-right: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    display: flex;
    overflow-x: auto;
    min-width: unset;
  }
`

const TabButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  background: none;
  border: none;
  border-right: 2px solid transparent;
  margin-right: -2px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ $active, theme }) => $active ? theme.colors.accent : theme.colors.slate};
  border-right-color: ${({ $active, theme }) => $active ? theme.colors.accent : 'transparent'};
  background: ${({ $active, theme }) => $active ? theme.colors.accentLight + '33' : 'transparent'};
  transition: ${({ theme }) => theme.transition};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentLight}22;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-right: none;
    border-bottom: 2px solid transparent;
    margin-right: 0;
    margin-bottom: -2px;
    border-bottom-color: ${({ $active, theme }) => $active ? theme.colors.accent : 'transparent'};
  }
`

const Panel = styled.div`
  padding: 8px 32px;
  flex: 1;
`

const JobTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 4px;

  a {
    color: ${({ theme }) => theme.colors.accent};
    &:hover { text-decoration: underline; }
  }
`

const Range = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.lightSlate};
  margin-bottom: 20px;
`

const Duties = styled.div`
  ul {
    list-style: none;
    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 1.6;
      color: ${({ theme }) => theme.colors.slate};
      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.accent};
        font-size: 12px;
        top: 3px;
      }
    }
  }
`

const Experience = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          html
          frontmatter { title company range url }
        }
      }
    }
  `)

  const jobs = data.allMarkdownRemark.nodes
  const [activeTab, setActiveTab] = useState(0)

  if (!jobs.length) return null

  const job = jobs[activeTab]

  return (
    <StyledExperience id="experience">
      <Heading>Where I've Worked</Heading>
      <TabsWrapper>
        <TabList>
          {jobs.map(({ frontmatter }, i) => (
            <li key={i}>
              <TabButton $active={activeTab === i} onClick={() => setActiveTab(i)}>
                {frontmatter.company}
              </TabButton>
            </li>
          ))}
        </TabList>
        <Panel>
          <JobTitle>
            {job.frontmatter.title}{' '}
            <a href={job.frontmatter.url} target="_blank" rel="noopener noreferrer">
              @ {job.frontmatter.company}
            </a>
          </JobTitle>
          <Range>{job.frontmatter.range}</Range>
          <Duties dangerouslySetInnerHTML={{ __html: job.html }} />
        </Panel>
      </TabsWrapper>
    </StyledExperience>
  )
}

export default Experience
