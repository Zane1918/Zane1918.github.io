import React from 'react'
import styled from 'styled-components'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
const config = require('../../config')

const StyledContact = styled.section`
  padding: 100px 0;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 60px 0; }
`

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
`

const Heading = styled.h2`
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 20px;
`

const Body = styled.p`
  max-width: 500px;
  margin: 0 auto 40px;
  font-size: 17px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.slate};
`

const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;

  a {
    color: ${({ theme }) => theme.colors.slate};
    transition: ${({ theme }) => theme.transition};
    &:hover { color: ${({ theme }) => theme.colors.accent}; transform: translateY(-2px); }
  }
`

const Contact = () => (
  <StyledContact id="contact">
    <Label>What's Next?</Label>
    <Heading>Get In Touch</Heading>
    <Body>
      I'm currently open to new opportunities. Whether you have a project in mind,
      a question, or just want to say hi — my inbox is always open.
    </Body>
    <Button href={`mailto:${config.email}`}>Say Hello</Button>
    <SocialRow>
      {config.socialMedia.map(({ name, url }) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
          <Icon name={name} size={22} />
        </a>
      ))}
    </SocialRow>
  </StyledContact>
)

export default Contact
