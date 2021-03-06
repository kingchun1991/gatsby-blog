module.exports = {
  siteMetadata: {
    title: `ELELINE BLOG`,
    author: `ELELINE`,
    description: `Webフロントエンドエンジニアを目指しているELELINEが運営しているブログ、フロントのみならず様々なWeb技術について投稿していきます`,
    siteUrl: `https://eleline.netlify.com/`,
    social: {
      twitter: `eleline5`,
      github: `eleline`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ["/tags/*"],
      },
    },
    `gatsby-plugin-slug`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://eleline.netlify.com/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs-title",
            options: {
              className: "gatsby-code-title",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 0,
              icon: false,
              maintainCase: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-emojis`,
            options: {
              active: true,
              class: "emoji-icon",
              size: 64,
              styles: {
                display: "inline",
                margin: "0",
                "margin-top": "0px",
                "margin-right": "3px",
                "margin-left": "3px",
                position: "relative",
                top: "5px",
                width: "20px",
              },
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener",
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-145377089-2",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    `/${edge.node.frontmatter.slug}/`,
                  guid:
                    site.siteMetadata.siteUrl +
                    `/${edge.node.frontmatter.slug}/`,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                      slug
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "eleline's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ELELINE BLOG`,
        short_name: `BlOG`,
        start_url: `/`,
        background_color: `#fffeff`,
        theme_color: `#1d1e22`,
        display: `standalone`,
        icon: `${__dirname}/src/images/eleline.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
