import React from 'react'
import styled from 'styled-components'
import Button from '../ui/Button'
const config = require('../../config')

const StyledHero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - 64px);
    padding: 60px 0;
  }
`

const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
`

const Name = styled.h1`
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navy};
  line-height: 1;
  margin-bottom: 12px;
`

const Title = styled.h2`
  font-size: clamp(20px, 4vw, 36px);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.slate};
  margin-bottom: 24px;
`

const Tagline = styled.p`
  max-width: 500px;
  font-size: 18px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.slate};
  margin-bottom: 48px;
`

const CTARow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const Hero = () => (
  <StyledHero id="hero">
    <Greeting>Hi, I'm</Greeting>
    <Name>{config.name}</Name>
    <Title>Algorithm Engineer</Title>
    <Tagline>
      I build intelligent systems that bridge research and production —
      from recommendation engines to large-scale ML pipelines.
    </Tagline>
    <CTARow>
      <Button href="/#projects">View My Work</Button>
      <Button href="/resume.pdf" $variant="outline" target="_blank" rel="noopener noreferrer">
        Download Resume
      </Button>
    </CTARow>
  </StyledHero>
)

export default Hero
