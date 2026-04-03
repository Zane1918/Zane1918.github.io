# Mobile UX + Open Graph Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the mobile nav language toggle so it's always visible, align nav height with layout padding, and add Open Graph / Twitter Card meta tags to all three page templates.

**Architecture:** All changes are isolated edits to existing files. Nav.js gets a new `MobileNavLang` styled component rendered inline in the mobile header. The three Gatsby `Head` exports each get OG + Twitter meta tags added. `siteUrl` is already in `config.js` — templates will import it from there instead of hardcoding it.

**Tech Stack:** Gatsby 5, React 18, styled-components, gatsby-plugin-react-helmet (Gatsby's built-in `Head` API)

---

## File Map

| File | Change |
|------|--------|
| `src/components/layout/Nav.js` | Add `MobileNavLang` styled component; show in header; fix `MobileMenu` lang toggle; add mobile `height: 64px` |
| `src/templates/home.js` | Import `config`; add OG + Twitter tags to `Head` |
| `src/templates/blog-list.js` | Import `config`; add OG + Twitter tags to `Head` |
| `src/templates/blog-post.js` | Import `config`; add OG + Twitter tags + article tags to `Head`; add `dateISO` GraphQL alias |
| `static/og-image.png` | Already in place ✅ |

---

## Task 1: Fix mobile nav — language toggle + height

**Files:**
- Modify: `src/components/layout/Nav.js`

- [ ] **Step 1: Add `MobileNavLang` styled component**

  In `Nav.js`, add this styled component after the existing `LangToggle` definition (around line 46):

  ```js
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
  ```

- [ ] **Step 2: Add mobile height to `StyledNav`**

  In `StyledNav`'s mobile media query (around line 20), add `height: 64px`:

  ```js
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
  ```

- [ ] **Step 3: Render `MobileNavLang` in the nav bar JSX**

  In the `StyledNav` JSX (around line 211), insert `MobileNavLang` between `Logo` and `HamburgerButton`:

  ```jsx
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
      {/* ...unchanged... */}
    </NavLinks>

    <SocialIcons>
      {/* ...unchanged... */}
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
      {/* ...unchanged... */}
    </HamburgerButton>
  </StyledNav>
  ```

- [ ] **Step 4: Fix `MobileMenu` lang toggle to use `LangOption`**

  Replace the inline-styled lang section in `MobileMenu` JSX (around line 261) with:

  ```jsx
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
  ```

  Also update `MobileLangToggle` to match the font size used in `LangToggle`:

  ```js
  const MobileLangToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 16px;
  `
  ```

- [ ] **Step 5: Verify build succeeds**

  ```bash
  cd /Users/ja/Projects/Zane1918.github.io
  npx gatsby build 2>&1 | tail -20
  ```

  Expected: `success Building production JavaScript and CSS bundles` with no errors.

- [ ] **Step 6: Visual check on mobile viewport**

  ```bash
  npx gatsby develop
  ```

  Open `http://localhost:8000/en/` in Chrome DevTools with a 375px viewport. Confirm:
  - The `EN | 中文` toggle appears in the nav bar between the logo and hamburger
  - The toggle is hidden on desktop (≥768px)
  - The hamburger menu also shows the lang toggle, styled consistently with a filled background for the active locale

- [ ] **Step 7: Commit**

  ```bash
  git add src/components/layout/Nav.js
  git commit -m "fix(mobile): show language toggle in nav bar on mobile; unify MobileMenu styles"
  ```

---

## Task 2: Add OG + Twitter tags to home template

**Files:**
- Modify: `src/templates/home.js`

- [ ] **Step 1: Import `config` at the top of the file**

  Add this import after the existing imports in `home.js`:

  ```js
  const config = require('../config')
  ```

- [ ] **Step 2: Replace the `Head` export**

  Replace the entire `Head` export with:

  ```jsx
  export const Head = ({ pageContext }) => {
    const t = selectLocale(pageContext.locale)
    const htmlLang = pageContext.locale === 'zh' ? 'zh-CN' : 'en'
    const altLang = pageContext.locale === 'zh' ? 'en' : 'zh'
    const altHtmlLang = altLang === 'zh' ? 'zh-CN' : 'en'
    const { siteUrl } = config
    const currentPath = `/${pageContext.locale}/`
    const ogLocale = pageContext.locale === 'zh' ? 'zh_CN' : 'en_US'
    const ogLocaleAlt = pageContext.locale === 'zh' ? 'en_US' : 'zh_CN'
    const ogTitle = t.meta.homeTitle
    const ogDesc = t.meta.homeDesc
    return (
      <>
        <html lang={htmlLang} />
        <title>{ogTitle}</title>
        <meta name="description" content={ogDesc} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:url" content={`${siteUrl}${currentPath}`} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={ogLocaleAlt} />
        <meta property="og:site_name" content={config.name} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        {pageContext.alternatePath && (
          <>
            <link rel="alternate" hreflang={htmlLang} href={`${siteUrl}${currentPath}`} />
            <link rel="alternate" hreflang={altHtmlLang} href={`${siteUrl}${pageContext.alternatePath}`} />
            <link rel="alternate" hreflang="x-default" href={`${siteUrl}/en/`} />
          </>
        )}
      </>
    )
  }
  ```

- [ ] **Step 3: Verify build succeeds**

  ```bash
  npx gatsby build 2>&1 | tail -20
  ```

  Expected: no errors.

- [ ] **Step 4: Verify OG tags in built HTML**

  ```bash
  grep -A2 "og:title\|og:image\|twitter:card" public/en/index.html | head -30
  ```

  Expected output contains:
  ```html
  <meta property="og:title" content="..."/>
  <meta property="og:image" content="https://zane1918.github.io/og-image.png"/>
  <meta name="twitter:card" content="summary"/>
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/templates/home.js
  git commit -m "feat(seo): add Open Graph and Twitter Card meta tags to home template"
  ```

---

## Task 3: Add OG + Twitter tags to blog-list template

**Files:**
- Modify: `src/templates/blog-list.js`

- [ ] **Step 1: Import `config`**

  Add after the existing imports in `blog-list.js`:

  ```js
  const config = require('../config')
  ```

- [ ] **Step 2: Replace the `Head` export**

  Replace the entire `Head` export with:

  ```jsx
  export const Head = ({ pageContext }) => {
    const t = selectLocale(pageContext.locale)
    const htmlLang = pageContext.locale === 'zh' ? 'zh-CN' : 'en'
    const altLang = pageContext.locale === 'zh' ? 'en' : 'zh'
    const altHtmlLang = altLang === 'zh' ? 'zh-CN' : 'en'
    const { siteUrl } = config
    const currentPath = `/${pageContext.locale}/blog/`
    const ogLocale = pageContext.locale === 'zh' ? 'zh_CN' : 'en_US'
    const ogLocaleAlt = pageContext.locale === 'zh' ? 'en_US' : 'zh_CN'
    const ogTitle = t.meta.blogTitle
    const ogDesc = t.meta.blogDesc
    return (
      <>
        <html lang={htmlLang} />
        <title>{ogTitle}</title>
        <meta name="description" content={ogDesc} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:url" content={`${siteUrl}${currentPath}`} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={ogLocaleAlt} />
        <meta property="og:site_name" content={config.name} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        {pageContext.alternatePath && (
          <>
            <link rel="alternate" hreflang={htmlLang} href={`${siteUrl}${currentPath}`} />
            <link rel="alternate" hreflang={altHtmlLang} href={`${siteUrl}${pageContext.alternatePath}`} />
            <link rel="alternate" hreflang="x-default" href={`${siteUrl}/en/`} />
          </>
        )}
      </>
    )
  }
  ```

  Note: `t.meta.blogTitle` and `t.meta.blogDesc` must exist in both `src/i18n/en.js` and `src/i18n/zh.js`. If they don't, check the actual key names with `grep -n "blog" src/i18n/en.js` and update accordingly.

- [ ] **Step 3: Verify build and OG tags**

  ```bash
  npx gatsby build 2>&1 | tail -20
  grep -A2 "og:title\|og:image" public/en/blog/index.html | head -20
  ```

  Expected: no build errors; OG tags present in built HTML.

- [ ] **Step 4: Commit**

  ```bash
  git add src/templates/blog-list.js
  git commit -m "feat(seo): add Open Graph and Twitter Card meta tags to blog-list template"
  ```

---

## Task 4: Add OG + Twitter + article tags to blog-post template

**Files:**
- Modify: `src/templates/blog-post.js`

- [ ] **Step 1: Import `config`**

  Add after the existing imports in `blog-post.js`:

  ```js
  const config = require('../config')
  ```

- [ ] **Step 2: Add `dateISO` alias to GraphQL query**

  In the `query` at the bottom of `blog-post.js`, add `dateISO` alongside the existing `date`:

  ```graphql
  export const query = graphql`
    query BlogPostQuery($slug: String!, $locale: String!) {
      markdownRemark(
        frontmatter: { slug: { eq: $slug }, locale: { eq: $locale } }
      ) {
        html
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          dateISO: date(formatString: "YYYY-MM-DD")
          tags
          excerpt
        }
      }
    }
  `
  ```

- [ ] **Step 3: Replace the `Head` export**

  Replace the entire `Head` export with:

  ```jsx
  export const Head = ({ data, pageContext }) => {
    const t = selectLocale(pageContext.locale)
    const htmlLang = pageContext.locale === 'zh' ? 'zh-CN' : 'en'
    const altLang = pageContext.locale === 'zh' ? 'en' : 'zh'
    const altHtmlLang = altLang === 'zh' ? 'zh-CN' : 'en'
    const { siteUrl } = config
    const currentPath = `/${pageContext.locale}/blog/${pageContext.slug}`
    const ogLocale = pageContext.locale === 'zh' ? 'zh_CN' : 'en_US'
    const ogLocaleAlt = pageContext.locale === 'zh' ? 'en_US' : 'zh_CN'
    const { title, excerpt, dateISO, tags } = data.markdownRemark.frontmatter
    const ogTitle = `${title} | ${t.meta.homeTitle.split('|')[0].trim()}`
    const ogDesc = excerpt || ''
    return (
      <>
        <html lang={htmlLang} />
        <title>{ogTitle}</title>
        <meta name="description" content={ogDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:url" content={`${siteUrl}${currentPath}`} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={ogLocaleAlt} />
        <meta property="og:site_name" content={config.name} />
        <meta property="article:published_time" content={dateISO} />
        {tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        {pageContext.alternatePath && (
          <>
            <link rel="alternate" hreflang={htmlLang} href={`${siteUrl}${currentPath}`} />
            <link rel="alternate" hreflang={altHtmlLang} href={`${siteUrl}${pageContext.alternatePath}`} />
            <link rel="alternate" hreflang="x-default" href={`${siteUrl}/en/`} />
          </>
        )}
      </>
    )
  }
  ```

- [ ] **Step 4: Verify build and OG tags on a blog post page**

  ```bash
  npx gatsby build 2>&1 | tail -20
  ```

  Then find a built blog post HTML file and check its tags:

  ```bash
  find public/en/blog -name "index.html" | head -3
  # pick one path, e.g. public/en/blog/hello-world/index.html
  grep -A2 "og:\|twitter:\|article:" public/en/blog/hello-world/index.html | head -40
  ```

  Expected: `og:type` = `article`, `article:published_time` present, `article:tag` entries present for each tag.

- [ ] **Step 5: Commit**

  ```bash
  git add src/templates/blog-post.js
  git commit -m "feat(seo): add Open Graph, Twitter Card, and article meta tags to blog-post template"
  ```

---

## Task 5: Commit the OG image and design docs

**Files:**
- `static/og-image.png` (already copied)
- `docs/superpowers/specs/2026-04-03-mobile-og-improvements-design.md`
- `docs/superpowers/plans/2026-04-03-mobile-og-improvements.md`

- [ ] **Step 1: Check `.gitignore` for `.superpowers/`**

  ```bash
  grep superpowers /Users/ja/Projects/Zane1918.github.io/.gitignore
  ```

  If no match, add it:

  ```bash
  echo ".superpowers/" >> /Users/ja/Projects/Zane1918.github.io/.gitignore
  git add .gitignore
  ```

- [ ] **Step 2: Commit OG image and docs**

  ```bash
  git add static/og-image.png docs/
  git commit -m "chore: add og-image to static; add design spec and implementation plan"
  ```
