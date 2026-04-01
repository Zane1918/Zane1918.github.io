const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Home pages for both locales
  ;['en', 'zh'].forEach(locale => {
    const other = locale === 'en' ? 'zh' : 'en'
    createPage({
      path: `/${locale}/`,
      component: path.resolve('./src/templates/home.js'),
      context: { locale, alternatePath: `/${other}/` },
    })
  })

  // Blog listing pages for both locales
  ;['en', 'zh'].forEach(locale => {
    const other = locale === 'en' ? 'zh' : 'en'
    createPage({
      path: `/${locale}/blog/`,
      component: path.resolve('./src/templates/blog-list.js'),
      context: { locale, alternatePath: `/${other}/blog/` },
    })
  })

  // Blog post pages for both locales
  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/(en|zh)/posts/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          frontmatter { slug locale }
        }
      }
    }
  `)

  if (result.errors) throw result.errors[0]

  const allPosts = result.data.allMarkdownRemark.nodes
  const enPosts = allPosts.filter(p => p.frontmatter.locale === 'en')
  const zhPosts = allPosts.filter(p => p.frontmatter.locale === 'zh')

  const zhSlugs = new Set(zhPosts.map(p => p.frontmatter.slug))
  const enSlugs = new Set(enPosts.map(p => p.frontmatter.slug))

  const createLocalePosts = (posts, locale, pairedSlugs, otherLocale) => {
    posts.forEach((post, index) => {
      const { slug } = post.frontmatter
      const prev = index === posts.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]
      const alternatePath = pairedSlugs.has(slug)
        ? `/${otherLocale}/blog/${slug}`
        : `/${otherLocale}/blog/`

      createPage({
        path: `/${locale}/blog/${slug}`,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          slug,
          locale,
          alternatePath,
          prevSlug: prev?.frontmatter.slug || null,
          nextSlug: next?.frontmatter.slug || null,
        },
      })
    })
  }

  createLocalePosts(enPosts, 'en', zhSlugs, 'zh')
  createLocalePosts(zhPosts, 'zh', enSlugs, 'en')
}
