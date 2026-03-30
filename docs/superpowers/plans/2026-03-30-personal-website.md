# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal portfolio website for algorithm engineer Zeng Jia (Zane1918.github.io) using Gatsby v5 + styled-components v6, with a fixed left sidebar, warm coral theme, and a blog.

**Architecture:** Gatsby v5 static site with React 18. All content lives in Markdown files under `content/` and is queried via Gatsby's GraphQL layer at build time. A fixed left sidebar contains navigation; the main content area is a single long scroll page with named sections, plus `/blog` and individual post pages generated via `gatsby-node.js`.

**Tech Stack:** Gatsby v5, React 18, styled-components v6, gatsby-transformer-remark, gatsby-plugin-image, ScrollReveal, anime.js, GitHub Actions (deploy)

---

## File Map

| File | Responsibility |
|------|---------------|
| `gatsby-config.js` | Plugin config, site metadata |
| `gatsby-node.js` | Creates blog post pages from Markdown |
| `src/config.js` | Site-wide config: name, email, nav links, social links |
| `src/styles/theme.js` | Color tokens, font stacks, breakpoints, spacing scale |
| `src/styles/GlobalStyle.js` | CSS reset + base typography |
| `src/styles/mixins.js` | Reusable styled-components mixins |
| `src/styles/fonts.js` | Google Fonts import |
| `src/components/ui/Button.js` | Styled button (accent/outline variants) |
| `src/components/ui/Tag.js` | Tech stack chip |
| `src/components/ui/Icon.js` | SVG icon wrapper (GitHub, LinkedIn, External, Folder) |
| `src/components/layout/Head.js` | Gatsby Head API export — title, description, OG tags |
| `src/components/layout/Nav.js` | Fixed left sidebar: logo, nav links, social icons, hamburger |
| `src/components/layout/Layout.js` | Root wrapper: Nav + main content area |
| `src/components/layout/Footer.js` | Minimal footer |
| `src/components/sections/Hero.js` | Name, title, tagline, View My Work + Resume CTAs |
| `src/components/sections/About.js` | Bio, skills grid, profile photo |
| `src/components/sections/Experience.js` | Tabbed job list sourced from content/jobs/ |
| `src/components/sections/Featured.js` | Alternating featured project cards from content/featured/ |
| `src/components/sections/Projects.js` | Card grid from content/projects/ |
| `src/components/sections/RecentPosts.js` | 3 most recent posts preview from content/posts/ |
| `src/components/sections/Contact.js` | CTA paragraph, email button, social row |
| `src/pages/index.js` | Home page — renders all sections in order |
| `src/pages/blog.js` | Blog list page |
| `src/pages/404.js` | Not found page |
| `src/templates/blog-post.js` | Blog post template |
| `src/hooks/useScrollReveal.js` | Wraps ScrollReveal for fade-up animations |
| `src/hooks/usePrefersReducedMotion.js` | Reads prefers-reduced-motion media query |
| `content/jobs/trip-com.md` | Trip.com job entry |
| `content/featured/` | Featured project folders (stub) |
| `content/projects/` | Other project Markdown files (stubs) |
| `content/posts/hello-world.md` | Sample blog post to verify pipeline |
| `.github/workflows/deploy.yml` | GitHub Actions: build + deploy to gh-pages |

---

## Task 1: Scaffold Gatsby Project

**Files:**
- Create: `package.json`
- Create: `gatsby-config.js`
- Create: `.nvmrc`
- Create: `.gitignore` (update existing)

- [ ] **Step 1: Initialize the project**

```bash
cd /Users/ja/Desktop/project/Zane1918.github.io
npm init -y
```

- [ ] **Step 2: Install Gatsby and core dependencies**

```bash
npm install gatsby react react-dom gatsby-plugin-image gatsby-plugin-sharp gatsby-transformer-sharp gatsby-source-filesystem gatsby-transformer-remark gatsby-plugin-styled-components gatsby-plugin-sitemap gatsby-plugin-robots-txt gatsby-plugin-offline gatsby-plugin-gtag gatsby-remark-prismjs gatsby-remark-images styled-components scrollreveal animejs prismjs
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install --save-dev prettier eslint
```

- [ ] **Step 4: Create `.nvmrc`**

```
20
```

- [ ] **Step 5: Create `gatsby-config.js`** (minimal — plugins added incrementally)

```js
module.exports = {
  siteMetadata: {
    title: 'Zeng Jia',
    description: 'Algorithm Engineer',
    siteUrl: 'https://zane1918.github.io',
    image: '/og.png',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: `${__dirname}/src/images` },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'content', path: `${__dirname}/content` },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          { resolve: 'gatsby-remark-images', options: { maxWidth: 700 } },
          { resolve: 'gatsby-remark-prismjs' },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-offline',
  ],
}
```

- [ ] **Step 6: Update `package.json` scripts**

```json
"scripts": {
  "develop": "gatsby develop",
  "build": "gatsby build",
  "serve": "gatsby serve",
  "clean": "gatsby clean"
}
```

- [ ] **Step 7: Create minimal `src/pages/index.js` so Gatsby can build**

```jsx
import React from 'react'
export default function IndexPage() {
  return <main><h1>Hello</h1></main>
}
```

- [ ] **Step 8: Create content directory stubs**

```bash
mkdir -p content/jobs content/featured content/projects content/posts
mkdir -p src/images src/components/layout src/components/sections src/components/ui src/styles src/pages src/templates src/hooks
```

- [ ] **Step 9: Verify the project builds**

```bash
npm run build
```
Expected: Build completes with no errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Gatsby v5 project with core plugins"
```

---

## Task 2: Theme, Styles, and Config

**Files:**
- Create: `src/styles/theme.js`
- Create: `src/styles/GlobalStyle.js`
- Create: `src/styles/mixins.js`
- Create: `src/styles/fonts.js`
- Create: `src/config.js`

- [ ] **Step 1: Create `src/styles/theme.js`**

```js
const theme = {
  colors: {
    accent:      '#DA7756',
    accentLight: '#F0C4B0',
    bg:          '#F8F5F1',
    bgLight:     '#FFFFFF',
    navy:        '#1E293B',
    slate:       '#64748B',
    lightSlate:  '#94A3B8',
    border:      '#E5E7EB',
  },
  fonts: {
    heading: "'Plus Jakarta Sans', sans-serif",
    body:    "'DM Sans', sans-serif",
    mono:    "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  sidebar: '260px',
  contentMax: '900px',
  transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
}

export default theme
```

- [ ] **Step 2: Create `src/styles/GlobalStyle.js`**

```js
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
```

- [ ] **Step 3: Create `src/styles/mixins.js`**

```js
import { css } from 'styled-components'

const mixins = {
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexBetween: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  sectionHeading: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(24px, 5vw, 32px);
    font-weight: 800;
    color: ${({ theme }) => theme.colors.navy};
    margin-bottom: 40px;
    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: ${({ theme }) => theme.colors.accent};
      border-radius: 2px;
      margin-top: 12px;
    }
  `,
  link: css`
    color: ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: ${({ theme }) => theme.transition};
    &:hover { opacity: 0.8; }
  `,
}

export default mixins
```

- [ ] **Step 4: Create `src/styles/fonts.js`** (exported as a component inserted in Layout)

```js
import React from 'react'

const Fonts = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=DM+Sans:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
)

export default Fonts
```

- [ ] **Step 5: Create `src/config.js`**

```js
module.exports = {
  name:    'Zeng Jia',
  email:   'jiazeng1918@outlook.com',
  siteUrl: 'https://zane1918.github.io',

  socialMedia: [
    { name: 'GitHub',   url: 'https://github.com/Zane1918' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jia-zeng-a88364254' },
  ],

  navLinks: [
    { name: 'About',      url: '/#about' },
    { name: 'Experience', url: '/#experience' },
    { name: 'Work',       url: '/#projects' },
    { name: 'Blog',       url: '/blog' },
    { name: 'Contact',    url: '/#contact' },
  ],

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
  }),
}
```

- [ ] **Step 6: Verify build still passes**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add theme, global styles, and site config"
```

---

## Task 3: UI Primitives

**Files:**
- Create: `src/components/ui/Button.js`
- Create: `src/components/ui/Tag.js`
- Create: `src/components/ui/Icon.js`

- [ ] **Step 1: Create `src/components/ui/Button.js`**

```jsx
import styled, { css } from 'styled-components'

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  text-decoration: none;

  ${({ variant }) =>
    variant === 'outline'
      ? css`
          border: 2px solid ${({ theme }) => theme.colors.accent};
          color: ${({ theme }) => theme.colors.accent};
          background: transparent;
          &:hover { background: ${({ theme }) => theme.colors.accentLight}; opacity: 1; }
        `
      : css`
          background: ${({ theme }) => theme.colors.accent};
          color: #fff;
          border: 2px solid transparent;
          &:hover { opacity: 0.85; }
        `}
`

export default Button
```

- [ ] **Step 2: Create `src/components/ui/Tag.js`**

```jsx
import styled from 'styled-components'

const Tag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.accentLight};
  color: ${({ theme }) => theme.colors.navy};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  font-weight: 500;
`

export default Tag
```

- [ ] **Step 3: Create `src/components/ui/Icon.js`**

```jsx
import React from 'react'

const icons = {
  GitHub: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.68.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  LinkedIn: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z"/>
    </svg>
  ),
  External: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  Folder: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
}

const Icon = ({ name, size = 20, ...props }) => (
  <span
    style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
    {...props}
  >
    {icons[name]}
  </span>
)

export default Icon
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Button, Tag, and Icon UI primitives"
```

---

## Task 4: Layout and Navigation

**Files:**
- Create: `src/components/layout/Layout.js`
- Create: `src/components/layout/Nav.js`
- Create: `src/components/layout/Footer.js`
- Modify: `src/pages/index.js`

- [ ] **Step 1: Create `src/components/layout/Footer.js`**

```jsx
import React from 'react'
import styled from 'styled-components'
const config = require('../../config')

const StyledFooter = styled.footer`
  padding: 20px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightSlate};
`

const Footer = () => (
  <StyledFooter>
    <p>Designed &amp; Built by {config.name}</p>
  </StyledFooter>
)

export default Footer
```

- [ ] **Step 2: Create `src/components/layout/Nav.js`**

```jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Icon from '../ui/Icon'
const config = require('../../config')

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ theme }) => theme.sidebar};
  height: 100vh;
  background: ${({ theme }) => theme.colors.bgLight};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  padding: 40px 32px;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 48px;
  letter-spacing: -0.5px;
  &:hover { opacity: 0.8; color: ${({ theme }) => theme.colors.navy}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`

const NavLinks = styled.ul`
  list-style: none;
  flex: 1;

  li { margin-bottom: 8px; }

  a {
    display: block;
    padding: 8px 12px;
    border-radius: 6px;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.slate};
    transition: ${({ theme }) => theme.transition};
    &:hover, &.active {
      color: ${({ theme }) => theme.colors.accent};
      background: ${({ theme }) => theme.colors.accentLight}33;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: auto;

  a {
    color: ${({ theme }) => theme.colors.slate};
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.navy};
  padding: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
  }
`

const MobileMenu = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    position: fixed;
    inset: 0;
    background: ${({ theme }) => theme.colors.bgLight};
    z-index: 200;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;

    a {
      font-family: ${({ theme }) => theme.fonts.heading};
      font-size: 24px;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.navy};
      &:hover { color: ${({ theme }) => theme.colors.accent}; }
    }

    button {
      position: absolute;
      top: 24px;
      right: 24px;
      background: none;
      border: none;
      font-size: 32px;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.navy};
    }
  }
`

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <StyledNav>
        <Logo to="/">ZJ</Logo>
        <NavLinks>
          {config.navLinks.map(({ name, url }) => (
            <li key={name}>
              <a href={url}>{name}</a>
            </li>
          ))}
        </NavLinks>
        <SocialIcons>
          {config.socialMedia.map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
              <Icon name={name} size={18} />
            </a>
          ))}
        </SocialIcons>
        <HamburgerButton onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </HamburgerButton>
      </StyledNav>

      <MobileMenu open={menuOpen}>
        <button onClick={closeMenu} aria-label="Close menu">×</button>
        {config.navLinks.map(({ name, url }) => (
          <a key={name} href={url} onClick={closeMenu}>{name}</a>
        ))}
      </MobileMenu>
    </>
  )
}

export default Nav
```

- [ ] **Step 3: Create `src/components/layout/Layout.js`**

```jsx
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
    padding-top: 64px; /* height of mobile nav bar */
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
```

- [ ] **Step 4: Update `src/pages/index.js` to use Layout**

```jsx
import React from 'react'
import Layout from '../components/layout/Layout'

export default function IndexPage() {
  return (
    <Layout>
      <h1 style={{ padding: '100px 0' }}>Coming soon</h1>
    </Layout>
  )
}
```

- [ ] **Step 5: Verify the site renders with sidebar**

```bash
npm run develop
```
Open http://localhost:8000. Expected: cream white page, left sidebar with "ZJ" logo and nav links visible. Mobile view: hamburger menu opens full-screen overlay.

- [ ] **Step 6: Verify production build passes**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Layout, Nav sidebar, and Footer"
```

---

## Task 5: Hero Section

**Files:**
- Create: `src/components/sections/Hero.js`
- Modify: `src/pages/index.js`

- [ ] **Step 1: Create `src/components/sections/Hero.js`**

```jsx
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
      <Button href="/resume.pdf" variant="outline" target="_blank" rel="noopener noreferrer">
        Download Resume
      </Button>
    </CTARow>
  </StyledHero>
)

export default Hero
```

- [ ] **Step 2: Add Hero to `src/pages/index.js`**

```jsx
import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
    </Layout>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run develop
```
Expected: Full-viewport hero with name, title, tagline, and two buttons. Responsive on mobile.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section"
```

---

## Task 6: About Section

**Files:**
- Create: `src/components/sections/About.js`
- Create: `src/images/profile.jpg` (placeholder — replace with real photo)
- Modify: `src/pages/index.js`

- [ ] **Step 1: Add a placeholder profile image**

Download any 500×500px placeholder image and save it to `src/images/profile.jpg`. You can use:
```bash
curl -o src/images/profile.jpg "https://via.placeholder.com/500x500"
```
Replace with your real photo later.

- [ ] **Step 2: Create `src/components/sections/About.js`**

```jsx
import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import mixins from '../../styles/mixins'

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
  overflow: hidden;
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
    z-index: -1;
  }
`

const skills = [
  'Python', 'PyTorch', 'TensorFlow',
  'Spark', 'Kafka', 'SQL',
  'C++', 'Docker', 'Git',
]

const About = () => (
  <StyledAbout id="about">
    <Heading>About Me</Heading>
    <Inner>
      <Bio>
        <p>
          I'm an algorithm engineer based in Shanghai, currently at Trip.com where I
          work on large-scale recommendation and ranking systems that serve millions of users.
        </p>
        <p>
          I enjoy working at the intersection of research and engineering — designing
          machine learning systems that are both theoretically sound and production-ready.
        </p>
        <SkillsLabel>Technologies I work with:</SkillsLabel>
        <SkillsGrid>
          {skills.map(skill => <li key={skill}>{skill}</li>)}
        </SkillsGrid>
      </Bio>
      <PhotoWrapper>
        <StaticImage
          src="../images/profile.jpg"
          alt="Zeng Jia"
          width={300}
          height={300}
          style={{ borderRadius: 8 }}
        />
      </PhotoWrapper>
    </Inner>
  </StyledAbout>
)

export default About
```

- [ ] **Step 3: Add About to `src/pages/index.js`**

```jsx
import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
      <About />
    </Layout>
  )
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run develop
```
Expected: About section below hero with bio text, skills grid, and profile photo with coral border offset.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add About section with profile photo and skills grid"
```

---

## Task 7: Sample Content + Experience Section

**Files:**
- Create: `content/jobs/trip-com.md`
- Create: `src/components/sections/Experience.js`
- Modify: `src/pages/index.js`

- [ ] **Step 1: Create `content/jobs/trip-com.md`**

```markdown
---
date: 2024-03-01
title: Algorithm Engineer
company: Trip.com
location: Shanghai, China
range: Mar 2024 - Present
url: https://trip.com
---

- Designed and maintained large-scale recommendation systems serving millions of daily active users
- Improved CTR by 12% through feature engineering and model architecture optimization
- Built real-time data pipelines using Kafka and Spark for online model serving
- Collaborated with cross-functional teams to productionize ML models with sub-100ms latency
```

- [ ] **Step 2: Create `src/components/sections/Experience.js`**

```jsx
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
  color: ${({ active, theme }) => active ? theme.colors.accent : theme.colors.slate};
  border-right-color: ${({ active, theme }) => active ? theme.colors.accent : 'transparent'};
  background: ${({ active, theme }) => active ? theme.colors.accentLight + '33' : 'transparent'};
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
    border-bottom-color: ${({ active, theme }) => active ? theme.colors.accent : 'transparent'};
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

const Duties = styled.ul`
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
  const job = jobs[activeTab]

  if (!jobs.length) return null

  return (
    <StyledExperience id="experience">
      <Heading>Where I've Worked</Heading>
      <TabsWrapper>
        <TabList>
          {jobs.map(({ frontmatter }, i) => (
            <li key={i}>
              <TabButton active={activeTab === i} onClick={() => setActiveTab(i)}>
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
```

- [ ] **Step 3: Add Experience to `src/pages/index.js`**

Add `import Experience from '../components/sections/Experience'` and `<Experience />` after `<About />`.

- [ ] **Step 4: Verify in browser**

```bash
npm run develop
```
Expected: Experience section with Trip.com tab. Clicking tabs switches the active panel.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Experience section with tabbed job timeline"
```

---

## Task 8: Featured Projects Section

**Files:**
- Create: `content/featured/sample-project/index.md`
- Create: `src/components/sections/Featured.js`
- Modify: `src/pages/index.js`

- [ ] **Step 1: Create a sample featured project**

```bash
mkdir -p content/featured/sample-project
```

Create `content/featured/sample-project/index.md`:

```markdown
---
date: 2024-01-01
title: Recommendation Engine
github: https://github.com/Zane1918
external: ''
tech:
  - Python
  - PyTorch
  - Kafka
  - Redis
---

A large-scale real-time recommendation system that serves personalized content to millions of users. Implemented a two-tower model for candidate retrieval with sub-50ms latency using FAISS vector search.
```

- [ ] **Step 2: Create `src/components/sections/Featured.js`**

```jsx
import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Icon from '../ui/Icon'
import Tag from '../ui/Tag'
import mixins from '../../styles/mixins'

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

  &:nth-child(even) { direction: rtl; > * { direction: ltr; } }

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
`

const Featured = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          html
          frontmatter { title github external tech }
        }
      }
    }
  `)

  const projects = data.allMarkdownRemark.nodes
  if (!projects.length) return null

  return (
    <StyledFeatured id="projects">
      <Heading>Featured Work</Heading>
      <ProjectList>
        {projects.map(({ html, frontmatter }, i) => (
          <Project key={i}>
            <ProjectContent>
              <FeaturedLabel>Featured Project</FeaturedLabel>
              <ProjectTitle>{frontmatter.title}</ProjectTitle>
              <Description dangerouslySetInnerHTML={{ __html: html }} />
              <TechList>
                {frontmatter.tech?.map(t => <li key={t}><Tag>{t}</Tag></li>)}
              </TechList>
              <Links>
                {frontmatter.github && (
                  <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Icon name="GitHub" size={20} />
                  </a>
                )}
                {frontmatter.external && (
                  <a href={frontmatter.external} target="_blank" rel="noopener noreferrer" aria-label="External">
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
```

- [ ] **Step 3: Add Featured to `src/pages/index.js`**

Add `import Featured from '../components/sections/Featured'` and `<Featured />` after `<Experience />`.

- [ ] **Step 4: Verify in browser**

```bash
npm run develop
```
Expected: Featured Projects section with alternating layout (even items reverse direction).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Featured Projects section"
```

---

## Task 9: Other Projects Section

**Files:**
- Create: `content/projects/sample-project.md`
- Create: `src/components/sections/Projects.js`
- Modify: `src/pages/index.js`

- [ ] **Step 1: Create sample project files**

`content/projects/sample-project.md`:
```markdown
---
date: 2024-06-01
title: ML Pipeline Framework
github: https://github.com/Zane1918
external: ''
tech:
  - Python
  - Airflow
  - Docker
---
A modular ML pipeline framework for automating model training, evaluation, and deployment workflows.
```

- [ ] **Step 2: Create `src/components/sections/Projects.js`**

```jsx
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
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
  }
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

const ShowMore = styled.button`
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
  &:hover { background: ${({ theme }) => theme.colors.accentLight}33; }
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
              <div style={{ display: 'flex', gap: 12 }}>
                {frontmatter.github && (
                  <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Icon name="GitHub" size={18} />
                  </a>
                )}
                {frontmatter.external && (
                  <a href={frontmatter.external} target="_blank" rel="noopener noreferrer" aria-label="External">
                    <Icon name="External" size={18} />
                  </a>
                )}
              </div>
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
        <ShowMore onClick={() => setShowCount(c => c + SHOW_MORE_INCREMENT)}>
          Show More
        </ShowMore>
      )}
    </StyledProjects>
  )
}

export default Projects
```

- [ ] **Step 3: Add Projects to `src/pages/index.js`**

Add `import Projects from '../components/sections/Projects'` and `<Projects />` after `<Featured />`.

- [ ] **Step 4: Verify in browser** — cards visible with tech tags and icons.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Other Projects card grid"
```

---

## Task 10: Contact Section

**Files:**
- Create: `src/components/sections/Contact.js`
- Modify: `src/pages/index.js`

- [ ] **Step 1: Create `src/components/sections/Contact.js`**

```jsx
import React from 'react'
import styled from 'styled-components'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import mixins from '../../styles/mixins'
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
```

- [ ] **Step 2: Add Contact to `src/pages/index.js`**

Add `import Contact from '../components/sections/Contact'` and `<Contact />` as the last section.

- [ ] **Step 3: Verify in browser** — centered contact section with email button and social icons.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Contact section"
```

---

## Task 11: Blog — Sample Post, List Page, Post Template, gatsby-node.js

**Files:**
- Create: `content/posts/hello-world.md`
- Create: `src/pages/blog.js`
- Create: `src/templates/blog-post.js`
- Create: `gatsby-node.js`
- Create: `src/components/sections/RecentPosts.js`
- Modify: `src/pages/index.js`

- [ ] **Step 1: Create `content/posts/hello-world.md`**

```markdown
---
date: 2026-03-30
title: Hello World
slug: hello-world
tags:
  - Personal
excerpt: My first blog post — an introduction to what I'll be writing about.
---

Welcome to my blog. I'm Zeng Jia, an algorithm engineer based in Shanghai.

I'll be writing about machine learning, systems engineering, and anything I find interesting along the way.

## What to expect

- Technical deep-dives on ML topics
- Engineering notes from production systems
- Occasional personal reflections
```

- [ ] **Step 2: Create `gatsby-node.js`**

```js
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter { slug }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.nodes

  posts.forEach((post, index) => {
    const prev = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]

    createPage({
      path: `/blog/${post.frontmatter.slug}`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: post.frontmatter.slug,
        prevSlug: prev?.frontmatter.slug || null,
        nextSlug: next?.frontmatter.slug || null,
      },
    })
  })
}
```

- [ ] **Step 3: Create `src/templates/blog-post.js`**

```jsx
import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/Layout'
import Tag from '../components/ui/Tag'

export const Head = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} | Zeng Jia</title>
    <meta name="description" content={data.markdownRemark.frontmatter.excerpt} />
  </>
)

const Wrapper = styled.article`
  padding: 80px 0;
  max-width: 680px;
`

const PostDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.lightSlate};
  margin-bottom: 12px;
`

const PostTitle = styled.h1`
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 20px;
`

const TagRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 48px;
`

const PostContent = styled.div`
  h2, h3 { color: ${({ theme }) => theme.colors.navy}; margin: 32px 0 16px; }
  p { margin-bottom: 20px; line-height: 1.8; }
  ul, ol { margin: 0 0 20px 24px; li { margin-bottom: 8px; } }
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 13px;
    background: ${({ theme }) => theme.colors.accentLight}44;
    padding: 2px 6px;
    border-radius: 3px;
  }
  pre { margin-bottom: 24px; border-radius: 8px; overflow-x: auto; }
`

const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  a {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.accent};
    &:hover { text-decoration: underline; }
  }
`

const BlogPost = ({ data, pageContext }) => {
  const { frontmatter, html } = data.markdownRemark
  const { prevSlug, nextSlug } = pageContext

  return (
    <Layout>
      <Wrapper>
        <PostDate>{frontmatter.date}</PostDate>
        <PostTitle>{frontmatter.title}</PostTitle>
        <TagRow>
          {frontmatter.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </TagRow>
        <PostContent dangerouslySetInnerHTML={{ __html: html }} />
        <NavRow>
          {prevSlug ? <Link to={`/blog/${prevSlug}`}>← Previous</Link> : <span />}
          {nextSlug ? <Link to={`/blog/${nextSlug}`}>Next →</Link> : <span />}
        </NavRow>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter { title date tags excerpt }
    }
  }
`

export default BlogPost
```

- [ ] **Step 4: Create `src/pages/blog.js`**

```jsx
import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout/Layout'
import Tag from '../components/ui/Tag'
import mixins from '../styles/mixins'

export const Head = () => <title>Blog | Zeng Jia</title>

const Wrapper = styled.div`padding: 80px 0;`

const Heading = styled.h1`${mixins.sectionHeading}`

const PostList = styled.ul`list-style: none;`

const PostItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 32px 0;
  &:first-child { padding-top: 0; }

  a:hover h2 { color: ${({ theme }) => theme.colors.accent}; }
`

const PostDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightSlate};
  margin-bottom: 8px;
`

const PostTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 8px;
  transition: ${({ theme }) => theme.transition};
`

const Excerpt = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.slate};
  margin-bottom: 12px;
`

const TagRow = styled.div`display: flex; gap: 8px; flex-wrap: wrap;`

const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Wrapper>
        <Heading>Blog</Heading>
        <PostList>
          {posts.map(({ frontmatter }) => (
            <PostItem key={frontmatter.slug}>
              <Link to={`/blog/${frontmatter.slug}`}>
                <PostDate>{frontmatter.date}</PostDate>
                <PostTitle>{frontmatter.title}</PostTitle>
                <Excerpt>{frontmatter.excerpt}</Excerpt>
                <TagRow>
                  {frontmatter.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </TagRow>
              </Link>
            </PostItem>
          ))}
        </PostList>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter { title slug date tags excerpt }
      }
    }
  }
`

export default BlogPage
```

- [ ] **Step 5: Create `src/components/sections/RecentPosts.js`**

```jsx
import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Tag from '../ui/Tag'
import mixins from '../../styles/mixins'

const StyledRecentPosts = styled.section`
  padding: 100px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { padding: 60px 0; }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 40px;

  a {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.accent};
    &:hover { text-decoration: underline; }
  }
`

const Heading = styled.h2`${mixins.sectionHeading}; margin-bottom: 0;`

const PostList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PostCard = styled.li`
  background: ${({ theme }) => theme.colors.bgLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 24px 28px;
  transition: ${({ theme }) => theme.transition};
  &:hover { border-color: ${({ theme }) => theme.colors.accent}; transform: translateY(-2px); }

  a:hover h3 { color: ${({ theme }) => theme.colors.accent}; }
`

const PostDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.lightSlate};
  margin-bottom: 6px;
`

const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 8px;
  transition: ${({ theme }) => theme.transition};
`

const Excerpt = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.slate};
  margin-bottom: 12px;
`

const TagRow = styled.div`display: flex; gap: 6px; flex-wrap: wrap;`

const RecentPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 3
      ) {
        nodes {
          frontmatter { title slug date tags excerpt }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.nodes
  if (!posts.length) return null

  return (
    <StyledRecentPosts id="blog">
      <Header>
        <Heading>Recent Posts</Heading>
        <Link to="/blog">View all →</Link>
      </Header>
      <PostList>
        {posts.map(({ frontmatter }) => (
          <PostCard key={frontmatter.slug}>
            <Link to={`/blog/${frontmatter.slug}`}>
              <PostDate>{frontmatter.date}</PostDate>
              <PostTitle>{frontmatter.title}</PostTitle>
              <Excerpt>{frontmatter.excerpt}</Excerpt>
              <TagRow>
                {frontmatter.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </TagRow>
            </Link>
          </PostCard>
        ))}
      </PostList>
    </StyledRecentPosts>
  )
}

export default RecentPosts
```

- [ ] **Step 6: Add RecentPosts to `src/pages/index.js`**

Add `import RecentPosts from '../components/sections/RecentPosts'` and `<RecentPosts />` after `<Projects />` and before `<Contact />`.

Final `src/pages/index.js`:

```jsx
import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Featured from '../components/sections/Featured'
import Projects from '../components/sections/Projects'
import RecentPosts from '../components/sections/RecentPosts'
import Contact from '../components/sections/Contact'

export const Head = () => (
  <>
    <title>Zeng Jia | Algorithm Engineer</title>
    <meta name="description" content="Algorithm Engineer at Trip.com. I build intelligent systems at scale." />
  </>
)

export default function IndexPage() {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Featured />
      <Projects />
      <RecentPosts />
      <Contact />
    </Layout>
  )
}
```

- [ ] **Step 7: Verify the full site**

```bash
npm run build && npm run serve
```
Open http://localhost:9000. Verify:
- All 7 home page sections render in order
- `/blog` lists the hello-world post
- `/blog/hello-world` renders the full post with prev/next nav

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add blog list, post template, RecentPosts section, and sample content"
```

---

## Task 12: Hooks and ScrollReveal Animations

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.js`
- Create: `src/hooks/useScrollReveal.js`
- Modify: each section component (add `ref` + `useScrollReveal`)

- [ ] **Step 1: Create `src/hooks/usePrefersReducedMotion.js`**

```js
import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = e => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

export default usePrefersReducedMotion
```

- [ ] **Step 2: Create `src/hooks/useScrollReveal.js`**

```js
import { useEffect, useRef } from 'react'
import ScrollReveal from 'scrollreveal'
import usePrefersReducedMotion from './usePrefersReducedMotion'
const config = require('../config')

const useScrollReveal = (srConfig = config.srConfig()) => {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return
    ScrollReveal().reveal(ref.current, srConfig)
  }, [])

  return ref
}

export default useScrollReveal
```

- [ ] **Step 3: Apply useScrollReveal to each section**

For each of: `About.js`, `Experience.js`, `Featured.js`, `Projects.js`, `RecentPosts.js`, `Contact.js`:

1. Import `useScrollReveal`
2. Add `const ref = useScrollReveal()` inside the component
3. Add `ref={ref}` to the root `<section>` element

Example in `About.js`:
```jsx
import useScrollReveal from '../../hooks/useScrollReveal'

const About = () => {
  const ref = useScrollReveal()
  return (
    <StyledAbout id="about" ref={ref}>
      {/* ... */}
    </StyledAbout>
  )
}
```

- [ ] **Step 4: Verify animations in browser**

```bash
npm run develop
```
Expected: Sections fade up as you scroll down. No animations on first load without scrolling.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add ScrollReveal animations and reduced-motion support"
```

---

## Task 13: 404 Page

**Files:**
- Create: `src/pages/404.js`

- [ ] **Step 1: Create `src/pages/404.js`**

```jsx
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
  padding: 12px 24px;
  border-radius: 6px;
  transition: ${({ theme }) => theme.transition};
  &:hover { opacity: 0.85; }
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
```

- [ ] **Step 2: Verify by navigating to a nonexistent route**

```bash
npm run develop
```
Open http://localhost:8000/does-not-exist. Expected: custom 404 page.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add 404 page"
```

---

## Task 14: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```bash
mkdir -p .github/workflows
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

- [ ] **Step 2: Enable GitHub Pages in repository settings**

In the GitHub repo settings → Pages → Source: select `gh-pages` branch.

- [ ] **Step 3: Do a final local build to confirm no errors**

```bash
npm run build
```
Expected: Build succeeds, no warnings about missing files.

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "feat: add GitHub Actions deploy workflow"
git push origin main
```

Expected: GitHub Actions workflow runs, deploys to https://zane1918.github.io.

---

## Task 15: Final Polish — Active Nav, SEO Head

**Files:**
- Modify: `src/components/layout/Nav.js` (IntersectionObserver active state)
- Modify: `gatsby-config.js` (add sitemap, robots.txt with full config)

- [ ] **Step 1: Add IntersectionObserver to Nav for active section highlighting**

In `src/components/layout/Nav.js`, add:

```jsx
const [activeSection, setActiveSection] = useState('')

useEffect(() => {
  const sections = document.querySelectorAll('section[id]')
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    },
    { rootMargin: '-40% 0px -50% 0px' }
  )
  sections.forEach(s => observer.observe(s))
  return () => observer.disconnect()
}, [])
```

Then in the `NavLinks` component, change the link active class logic:
```jsx
<a
  href={url}
  className={url.includes(activeSection) && activeSection ? 'active' : ''}
>
  {name}
</a>
```

- [ ] **Step 2: Add head metadata to `src/pages/blog.js`** (already done in Task 11)

- [ ] **Step 3: Verify active nav highlights scroll position**

```bash
npm run develop
```
Scroll through the page — nav links should highlight as corresponding sections enter view.

- [ ] **Step 4: Run a final build**

```bash
npm run build
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: add active nav section tracking via IntersectionObserver"
```

---

## Done

At this point you have a fully functional personal website with:

- ✅ Fixed left sidebar with active nav highlighting
- ✅ Hero, About, Experience, Featured Projects, Other Projects, Recent Posts, Contact sections
- ✅ Blog list + individual post pages (Markdown-driven)
- ✅ Warm coral theme, Plus Jakarta Sans + DM Sans typography
- ✅ ScrollReveal fade-up animations
- ✅ Mobile-responsive with full-screen hamburger menu
- ✅ GitHub Actions auto-deploy to GitHub Pages
- ✅ 404 page, sitemap, robots.txt

**Next steps (content):**
1. Replace `src/images/profile.jpg` with your actual photo
2. Add your real job history to `content/jobs/`
3. Add featured and other projects to `content/featured/` and `content/projects/`
4. Write your first real blog post in `content/posts/`
5. Add `static/og.png` (1200×630px) for social sharing
6. Add `static/resume.pdf`
