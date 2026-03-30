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
      background: ${({ theme }) => `${theme.colors.accentLight}33`};
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
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
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
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <StyledNav>
        <Logo to="/">ZJ</Logo>
        <NavLinks>
          {config.navLinks.map(({ name, url }) => (
            <li key={name}>
              {url.startsWith('/') && !url.startsWith('/#')
                ? <Link to={url} activeClassName="active">{name}</Link>
                : <a href={url} className={activeSection && url.includes(activeSection) ? 'active' : ''}>{name}</a>}
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

      <MobileMenu $open={menuOpen} aria-hidden={!menuOpen}>
        <button onClick={closeMenu} aria-label="Close menu">×</button>
        {config.navLinks.map(({ name, url }) => (
          url.startsWith('/') && !url.startsWith('/#')
            ? <Link key={name} to={url} onClick={closeMenu}>{name}</Link>
            : <a key={name} href={url} onClick={closeMenu}>{name}</a>
        ))}
      </MobileMenu>
    </>
  )
}

export default Nav
