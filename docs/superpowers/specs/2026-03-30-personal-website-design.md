# Personal Website Design Spec
**Date:** 2026-03-30
**Owner:** Zeng Jia
**Repo:** Zane1918.github.io
**Reference:** brittanychiang.com (v4)

---

## Overview

A personal portfolio website for an algorithm engineer. Goals: showcase work, display experience and projects, and make it easy for recruiters and clients to make contact. Built from scratch (inspired by v4 structure but fully custom code).

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Gatsby v5 + React 18 |
| Styling | styled-components v6 |
| Content | Markdown files (gatsby-transformer-remark) |
| Data layer | Gatsby GraphQL (build-time queries) |
| Deployment | GitHub Pages via GitHub Actions |
| Animations | ScrollReveal + anime.js (loader) |

---

## Visual Design

### Color Tokens
```js
colors: {
  accent:      '#DA7756',  // coral — links, highlights, active states
  accentLight: '#F0C4B0',  // soft coral — hover backgrounds, tags
  bg:          '#F8F5F1',  // cream white — page background
  bgLight:     '#FFFFFF',  // pure white — cards, sidebar
  navy:        '#1E293B',  // dark slate — headings, primary text
  slate:       '#64748B',  // medium — body text, secondary labels
  lightSlate:  '#94A3B8',  // light — timestamps, meta info
  border:      '#E5E7EB',  // dividers, card borders
}
```

### Typography
- **Headings:** Plus Jakarta Sans — 800 for hero/section titles, 600 for sub-headings
- **Body:** DM Sans — 400 for paragraphs, 500 for labels
- **Code:** SF Mono / Fira Code (monospace) — tech tags, blog code blocks

### Layout
- Fixed left sidebar (`260px`) containing logo, nav links, and social icons
- Content area: max-width `900px`, centered in remaining space
- Section padding: `100px 0` desktop, `60px 0` mobile
- Sidebar collapses to top hamburger menu on mobile (breakpoint: `768px`). On mobile, tapping the hamburger opens a full-screen overlay menu with nav links centered vertically; tapping a link or the close button dismisses it.

---

## Pages

### `/` — Home (single scroll page)

Sections in order:

1. **Hero** — Greeting, name (large, Plus Jakarta Sans 800), title "Algorithm Engineer", 2-line tagline, two CTAs: "View My Work" (scroll to projects) + "Download Resume" (PDF)
2. **About** — Bio paragraph (2-3 sentences), skills/tech grid, profile photo on the right (sourced from `src/images/profile.jpg`, recommended size 500×500px, square crop)
3. **Experience** — Tabbed job timeline. Each entry: company, role, date range, bullet-point responsibilities. Active tab switches on click.
4. **Featured Projects** — 2-3 highlighted projects in alternating left/right layout. Each: name, description, tech stack tags, GitHub + live links, screenshot image. Section component renders with `id="projects"` (matches nav link `/#projects`).
5. **Other Projects** — Card grid of smaller projects sorted by `date` descending. Each card: name, description, tech tags, GitHub/external links. Section component renders with `id="other-projects"`.
6. **Recent Posts** — Preview of the 3 most recent blog posts (title, date, excerpt). Links to `/blog` for full list.
7. **Contact** — Short CTA paragraph, large email button, social links row.

### `/blog` — Blog List
All posts sorted by date. Each entry: title, date, short excerpt, tags. Clean minimal list layout.

### `/blog/{slug}` — Blog Post
Title, date, tags, Markdown content with Prism syntax highlighting (via `gatsby-transformer-remark` + `gatsby-remark-prismjs`). Prev/next post navigation at bottom. **No MDX** — plain Markdown only.

### `/404` — Not Found
Simple page with back-to-home link.

---

## Project Structure

```
src/
  components/
    layout/      # Layout.js, Nav.js (sidebar), Head.js, Footer.js
    sections/    # Hero.js, About.js, Experience.js, Featured.js, Projects.js, RecentPosts.js, Contact.js
    ui/          # Button.js, Tag.js, Icon.js (reusable primitives)
  styles/        # theme.js, GlobalStyle.js, mixins.js, fonts.js
  pages/         # index.js, blog.js, 404.js
  templates/     # blog-post.js
  hooks/         # useScrollReveal.js, usePrefersReducedMotion.js
  images/        # profile.jpg (500×500px, square crop — used by About section)
  config.js      # name, email, siteUrl, socialMedia, navLinks
content/
  jobs/          # One .md file per job
  projects/      # One .md file per project
  featured/      # One .md file per featured project + co-located cover.png image
  posts/         # One .md file per blog post
static/
  og.png         # OG image for social sharing
  resume.pdf     # Downloadable resume
```

---

## Content Schemas

### `content/jobs/*.md`
```yaml
---
date: 2026-03-30
title: Algorithm Engineer
company: Trip.com
location: Shanghai, China
range: Mar 2024 - Present
url: https://trip.com
---
- Bullet point responsibilities
- Another bullet point
```

### `content/featured/*.md`
Cover image is co-located alongside the `.md` file (e.g., `content/featured/my-project/index.md` + `content/featured/my-project/cover.png`). Processed by `gatsby-plugin-image` via `gatsby-transformer-remark` with `gatsby-remark-images`.

```yaml
---
date: 2024-01-01
title: Project Name
cover: ./cover.png
github: https://github.com/...
external: https://live-demo.com
tech:
  - Python
  - PyTorch
---
Project description paragraph.
```

### `content/projects/*.md`
Cards are sorted by `date` descending in the GraphQL query. The `external` field is optional.

```yaml
---
date: 2024-01-01
title: Project Name
github: https://github.com/...
external: https://live-demo.com  # optional
tech:
  - Python
  - FastAPI
---
Short project description.
```

### `content/posts/*.md`
```yaml
---
date: 2024-03-01
title: Post Title
slug: post-slug
tags:
  - Machine Learning
  - Python
excerpt: One-line summary shown on blog list page.
---
Full Markdown content...
```

---

## Data Flow

1. Gatsby reads all Markdown files at build time via `gatsby-source-filesystem`
2. `gatsby-transformer-remark` parses frontmatter and body
3. `gatsby-node.js` creates individual pages for each blog post using the `blog-post` template
4. Section components query data via GraphQL `useStaticQuery` hooks
5. Output: fully static HTML — no server required, works on GitHub Pages

---

## Deployment & SEO

**GitHub Actions workflow:**
- Trigger: push to `main`
- Steps: `npm install` → `gatsby build` → deploy `public/` to `gh-pages` branch

**Gatsby plugins:**
- **Gatsby Head API** (built-in, Gatsby v5) — replaces `gatsby-plugin-react-helmet`; use the exported `Head` function in each page for `<title>`, meta, and OG tags
- `gatsby-plugin-sitemap` — auto-generates `sitemap.xml`
- `gatsby-plugin-robots-txt` — generates `robots.txt`
- `gatsby-plugin-image` + `gatsby-plugin-sharp` + `gatsby-transformer-sharp` — responsive images
- `gatsby-plugin-offline` — PWA service worker (**Note:** assumes root-domain GitHub Pages — `https://zane1918.github.io/` with no `pathPrefix`; safe for this repo name pattern)
- `gatsby-plugin-gtag` — Google Analytics 4 (optional; replaces deprecated `gatsby-plugin-google-analytics`)
- `gatsby-remark-prismjs` — syntax highlighting in blog posts
- `gatsby-remark-images` — processes co-located images in Markdown (used by featured projects)

**`src/config.js`:**
> **Note:** Replace `email` and social media URLs with real values before first deploy.

```js
module.exports = {
  name:     'Zeng Jia',            // display name on the site
  email:    'jiazeng1918@outlook.com',    // replace before deploy
  siteUrl:  'https://zane1918.github.io',
  socialMedia: [
    { name: 'GitHub',   url: 'https://github.com/Zane1918' },
    { name: 'LinkedIn', url: 'www.linkedin.com/in/jia-zeng-a88364254' },  // replace before deploy
  ],
  navLinks: [
    { name: 'About',      url: '/#about' },
    { name: 'Experience', url: '/#experience' },
    { name: 'Work',       url: '/#projects' },
    { name: 'Blog',       url: '/blog' },
    { name: 'Contact',    url: '/#contact' },
  ],
}
```

---

## Animations

- **ScrollReveal:** fade-up on section/card entry (same `srConfig` helper pattern as v4)
- **Sidebar active state:** IntersectionObserver tracks which section is in view, highlights matching nav link
- **Page loader:** brief anime.js fade-in sequence on first visit (optional — can be skipped)
- **Reduced motion:** `usePrefersReducedMotion` hook disables animations when OS setting is on

---

## Out of Scope

- CMS integration (Contentful, Sanity) — Markdown files are sufficient
- Server-side features (comments, contact form backend) — contact is email-link only
- Dark mode toggle — light theme only
- i18n / multi-language support
