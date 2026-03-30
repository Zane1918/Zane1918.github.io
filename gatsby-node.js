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

  if (result.errors) throw result.errors[0]

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
