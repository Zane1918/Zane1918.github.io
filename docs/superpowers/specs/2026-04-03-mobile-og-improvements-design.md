# Design: Mobile UX + Open Graph Improvements

**Date:** 2026-04-03  
**Scope:** Two focused improvements — mobile nav language toggle visibility, and Open Graph / Twitter Card meta tags across all templates.

---

## Background

The site is a bilingual (EN/ZH) Gatsby portfolio with a fixed sidebar nav on desktop that collapses to a top bar + hamburger menu on mobile. Three page templates exist: `home.js`, `blog-list.js`, `blog-post.js`. None of them include Open Graph or Twitter Card meta tags, meaning social shares (WeChat, Twitter, LinkedIn) show no preview image or structured description.

---

## Section 1: Mobile Navigation

### Problem

The `LangToggle` component is `display: none` at `max-width: 768px`. On mobile, the only way to switch language is to open the hamburger menu — a non-obvious interaction for a core feature of a bilingual site.

Additionally, `MobileMenu`'s language toggle uses raw inline `opacity` styles inconsistent with the desktop `LangOption` styled component.

### Changes

**1. Expose language toggle in mobile nav bar**

In `Nav.js`, render a compact `LangToggle` between the Logo and the HamburgerButton on mobile. Currently `LangToggle` is hidden via CSS; instead, keep the desktop version hidden and add a second compact version visible only on mobile:

```jsx
// In StyledNav, between Logo and HamburgerButton
<MobileNavLang>  {/* display: none on desktop, flex on mobile */}
  <LangOption as={locale === 'en' ? 'span' : 'a'} $active={locale === 'en'} ...>EN</LangOption>
  <LangSep>|</LangSep>
  <LangOption as={locale === 'zh' ? 'span' : 'a'} $active={locale === 'zh'} ...>中文</LangOption>
</MobileNavLang>
```

**2. Unify MobileMenu language toggle**

Replace the inline-styled language links in `MobileMenu` with the existing `LangOption` component for visual consistency.

**3. Verify nav height / layout padding alignment**

`Layout.js` applies `padding-top: 64px` on mobile. The `StyledNav` has no explicit `height` declaration. Confirm the rendered nav bar height matches 64px; add `height: 64px` to `StyledNav`'s mobile media query if needed.

---

## Section 2: Open Graph & Twitter Card Meta Tags

### Problem

All three `Head` exports (`home.js`, `blog-list.js`, `blog-post.js`) include only `<title>` and `<meta name="description">`. No OG or Twitter Card tags exist.

### OG Image

`src/images/profile.png` copied to `static/og-image.png` — Gatsby outputs `static/` contents to the build root, making it accessible at `https://zane1918.github.io/og-image.png`.

### Tags to Add

**All three templates:**

| Tag | Value |
|-----|-------|
| `og:title` | Same as `<title>` |
| `og:description` | Same as `<meta name="description">` |
| `og:url` | `https://zane1918.github.io` + current path |
| `og:image` | `https://zane1918.github.io/og-image.png` |
| `og:locale` | `en_US` (EN) or `zh_CN` (ZH) |
| `og:locale:alternate` | The other locale |
| `og:site_name` | `Zane Zhang` |
| `twitter:card` | `summary` |
| `twitter:title` | Same as `og:title` |
| `twitter:description` | Same as `og:description` |
| `twitter:image` | Same as `og:image` |

**`blog-post.js` only:**

| Tag | Value |
|-----|-------|
| `og:type` | `article` |
| `article:published_time` | `frontmatter.date` (ISO string) |
| `article:tag` | One `<meta>` per tag in `frontmatter.tags` |

**`home.js` and `blog-list.js`:** `og:type` = `website` (default, can be omitted).

### Locale Mapping

```js
const ogLocale = locale === 'zh' ? 'zh_CN' : 'en_US'
const ogLocaleAlt = locale === 'zh' ? 'en_US' : 'zh_CN'
```

### Site URL Constant

`siteUrl = 'https://zane1918.github.io'` is already declared in `home.js`. Extract to `src/config.js` and import in all three templates.

---

## Files to Change

| File | Change |
|------|--------|
| `src/components/layout/Nav.js` | Add `MobileNavLang`, update `MobileMenu` lang toggle |
| `src/templates/home.js` | Add OG + Twitter tags to `Head`; export `siteUrl` to config |
| `src/templates/blog-list.js` | Add OG + Twitter tags to `Head` |
| `src/templates/blog-post.js` | Add OG + Twitter tags (incl. article tags) to `Head` |
| `src/config.js` | Add `siteUrl` constant |
| `static/og-image.png` | Already copied ✅ |

---

## Out of Scope

- OG image auto-generation per blog post
- Dark mode
- Search / RSS
- Comments system
