module.exports = {
  siteMetadata: {
    title: `Gatsby Plugin Transitions`,
    siteUrl: `https://andreasfaust.github.io/gatsby-plugin-transitions/`,
    description: `gatsby-plugin-transitions enables smooth page-transitions.`
  },
  pathPrefix: `/gatsby-plugin-transitions`,
  plugins: [
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [
          'src/components',
          'src/layout',
          'src/transitions'
        ]
      }
    }
  ]
}
