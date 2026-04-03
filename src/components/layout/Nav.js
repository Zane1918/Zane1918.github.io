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
    height: 64px;
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
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  &:hover { opacity: 0.8; color: ${({ theme }) => theme.colors.navy}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`

const LangToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 32px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileNavLang = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 12px;
  }
`

const LangOption = styled.a`
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  color: ${({ $active, theme }) => ($active ? theme.colors.bgLight : theme.colors.slate)};
  background: ${({ $active, theme }) => ($active ? theme.colors.accent : 'transparent')};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    color: ${({ $active, theme }) => ($active ? theme.colors.bgLight : theme.colors.accent)};
  }
`

const LangSep = styled.span`
  color: ${({ theme }) => theme.colors.border};
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

const MobileLangToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 16px;
`

// Converts config.js url (e.g. '/#about', '/blog') to locale-prefixed version
const localizeUrl = (url, locale) => {
  if (!locale) return url
  if (url.startsWith('/#')) return `/${locale}/${url.slice(1)}`
  if (url === '/blog') return `/${locale}/blog/`
  return `/${locale}${url}`
}

const Nav = ({ locale, alternatePath, t }) => {
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
        <Logo to={locale ? `/${locale}/` : '/'}>ZJ</Logo>

        {locale && alternatePath && (
          <LangToggle>
            <LangOption as={locale === 'en' ? 'span' : 'a'} $active={locale === 'en'} href={locale === 'en' ? undefined : alternatePath}>
              EN
            </LangOption>
            <LangSep>|</LangSep>
            <LangOption as={locale === 'zh' ? 'span' : 'a'} $active={locale === 'zh'} href={locale === 'zh' ? undefined : alternatePath}>
              中文
            </LangOption>
          </LangToggle>
        )}

        <NavLinks>
          {config.navLinks.map(({ name, url }) => {
            const localUrl = localizeUrl(url, locale)
            const isAnchor = url.startsWith('/#')
            const label = t?.nav?.[name.toLowerCase()] || name
            return (
              <li key={name}>
                {isAnchor
                  ? <a href={localUrl} className={activeSection && url.includes(activeSection) ? 'active' : ''}>{label}</a>
                  : <Link to={localUrl} activeClassName="active">{label}</Link>
                }
              </li>
            )
          })}
        </NavLinks>

        <SocialIcons>
          {config.socialMedia.map(({ name, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
              <Icon name={name} size={18} />
            </a>
          ))}
        </SocialIcons>

        {locale && alternatePath && (
          <MobileNavLang>
            <LangOption as={locale === 'en' ? 'span' : 'a'} $active={locale === 'en'} href={locale === 'en' ? undefined : alternatePath}>
              EN
            </LangOption>
            <LangSep>|</LangSep>
            <LangOption as={locale === 'zh' ? 'span' : 'a'} $active={locale === 'zh'} href={locale === 'zh' ? undefined : alternatePath}>
              中文
            </LangOption>
          </MobileNavLang>
        )}

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

        {locale && alternatePath && (
          <MobileLangToggle>
            <LangOption as={locale === 'en' ? 'span' : 'a'} $active={locale === 'en'} href={locale === 'en' ? undefined : alternatePath}>
              EN
            </LangOption>
            <LangSep>|</LangSep>
            <LangOption as={locale === 'zh' ? 'span' : 'a'} $active={locale === 'zh'} href={locale === 'zh' ? undefined : alternatePath}>
              中文
            </LangOption>
          </MobileLangToggle>
        )}

        {config.navLinks.map(({ name, url }) => {
          const localUrl = localizeUrl(url, locale)
          const label = t?.nav?.[name.toLowerCase()] || name
          return url.startsWith('/#')
            ? <a key={name} href={localUrl} onClick={closeMenu}>{label}</a>
            : <Link key={name} to={localUrl} onClick={closeMenu}>{label}</Link>
        })}
      </MobileMenu>
    </>
  )
}

export default Nav
