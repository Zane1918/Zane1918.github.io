import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.slate};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.navy};
    font-weight: 800;
    line-height: 1.2;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: ${({ theme }) => theme.transition};
    &:hover { color: ${({ theme }) => theme.colors.accent}; opacity: 0.8; }
  }

  img { max-width: 100%; display: block; }

  ::selection {
    background: ${({ theme }) => theme.colors.accentLight};
    color: ${({ theme }) => theme.colors.navy};
  }
`

export default GlobalStyle
