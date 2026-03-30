import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Nav from './Nav'
import Footer from './Footer'
import GlobalStyle from '../../styles/GlobalStyle'
import theme from '../../styles/theme'

const StyledMain = styled.main`
  margin-left: ${({ theme }) => theme.sidebar};
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    padding-top: 64px;
  }
`

const StyledContent = styled.div`
  flex: 1;
  max-width: ${({ theme }) => theme.contentMax};
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 24px;
  }
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Nav />
    <StyledMain>
      <StyledContent>{children}</StyledContent>
      <Footer />
    </StyledMain>
  </ThemeProvider>
)

export default Layout
