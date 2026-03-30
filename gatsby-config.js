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
    // Optional: uncomment and add your GA4 tracking ID to enable analytics
    // { resolve: 'gatsby-plugin-gtag', options: { trackingId: 'G-XXXXXXXXXX' } },
  ],
}
