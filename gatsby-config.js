module.exports = {
  siteMetadata: {
    title: `Gatsby Plugin Transitions`
  },
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
