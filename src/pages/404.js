import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/Layout'

export const Head = () => <title>404 | Zeng Jia</title>

const Wrapper = styled.div`
  padding: 150px 0;
  text-align: center;
`

const Code = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 16px;
`

const Title = styled.h1`
  font-size: clamp(32px, 6vw, 52px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 20px;
`

const Body = styled.p`
  color: ${({ theme }) => theme.colors.slate};
  margin-bottom: 40px;
`

const HomeLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.colors.accent};
  padding: 14px 28px;
  border-radius: 6px;
  transition: ${({ theme }) => theme.transition};
  &:hover { opacity: 0.85; color: #fff; }
`

const NotFoundPage = () => (
  <Layout>
    <Wrapper>
      <Code>404 — Page Not Found</Code>
      <Title>Oops.</Title>
      <Body>The page you're looking for doesn't exist.</Body>
      <HomeLink to="/">Go Home</HomeLink>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
