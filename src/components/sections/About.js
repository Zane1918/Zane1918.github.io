import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import mixins from '../../styles/mixins'
import useScrollReveal from '../../hooks/useScrollReveal'

const StyledAbout = styled.section`
  padding: 100px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 60px 0; }
`

const Heading = styled.h2`
  ${mixins.sectionHeading}
`

const Inner = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 60px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Bio = styled.div`
  p {
    margin-bottom: 16px;
    font-size: 17px;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.slate};
  }
`

const SkillsLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.accent};
  margin: 24px 0 12px;
`

const SkillsGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 16px;

  li {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.slate};
    display: flex;
    align-items: center;
    gap: 8px;
    &::before {
      content: '▸';
      color: ${({ theme }) => theme.colors.accent};
      font-size: 10px;
    }
  }
`

const PhotoWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid ${({ theme }) => theme.colors.accent};
    border-radius: 8px;
    transform: translate(8px, 8px);
    z-index: 1;
    pointer-events: none;
  }
`

const skills = [
  'Python', 'PyTorch', 'TensorFlow',
  'Spark', 'Kafka', 'SQL',
  'C++', 'Docker', 'Git',
]

const About = ({ t }) => {
  const ref = useScrollReveal()
  return (
    <StyledAbout id="about" ref={ref}>
      <Heading>{t.heading}</Heading>
      <Inner>
        <Bio>
          <p>{t.bio1}</p>
          <p>{t.bio2}</p>
          <SkillsLabel>{t.techHeading}</SkillsLabel>
          <SkillsGrid>
            {skills.map(skill => <li key={skill}>{skill}</li>)}
          </SkillsGrid>
        </Bio>
        <PhotoWrapper>
          <StaticImage
            src="../../images/profile.jpg"
            alt="Zeng Jia"
            width={300}
            height={300}
            style={{ borderRadius: 8 }}
          />
        </PhotoWrapper>
      </Inner>
    </StyledAbout>
  )
}

export default About
