module.exports = {
  siteMetadata: {
    title: "!Complicated",
    description: `Technical notes about frontend, nodejs and javascript in general by Franco Sirena.`,
    author: `@francosirena`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/tech-posts`,
        name: `tech-posts`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `not-complicated`,
        short_name: `no-comp`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/blog-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
