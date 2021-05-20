const queries = require('./src/utils/algolia')
let contentfulConfig
require('dotenv').config()

const isProduction = process.env.ACTIVE_ENV === 'production'

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  host: isProduction ? 'cdn.contentful.com' : 'preview.contentful.com',
  accessToken: isProduction
    ? process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken
    : process.env.CONTENTFUL_PREVIEW_TOKEN || contentfulConfig.previewToken
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

const config = {
  siteMetadata: {
    title: 'Blog - Alexander Wolf',
    description: 'Blogging about web development mainly frontend coding',
    siteUrl: 'https://blog.alexanderwolf.tech/',
    twitterHandle: '@awolf81'
  },
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // 'gatsby-plugin-favicon',
          '@johnlindquist/gatsby-remark-embed-codesandbox',
          '@weknow/gatsby-remark-twitter',
          'gatsby-remark-reading-time',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: '>',
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {
                sh: 'bash',
                js: 'javascript'
              },
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  'require("prismjs/plugins/line-numbers/prism-line-numbers.css");'
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false
            }
          }
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      }
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
            logo: file(name: {eq: "AW_Blog_Logo"}) {
              publicURL
            }
            avatar: file(name: {eq: "avatar"}) {
              childImageSharp {
                fixed(width: 400) {
                  src
                }
              }
            }
          }
        `,
        // mostly copied from default in gatsby-plugin-feed source code
        // but adding a custom namespace
        setup: ({
          query: {
            site: { siteMetadata },
            avatar,
            logo,
            ...rest
          }
        }) => {
          return {
            ...siteMetadata,
            ...rest,
            custom_namespaces: {
              webfeeds: 'http://webfeeds.org/rss/1.0'
            },
            custom_elements: [
              {
                'webfeeds:icon': siteMetadata.siteUrl + logo.publicURL
              },
              { 'webfeeds:logo': siteMetadata.siteUrl + logo.publicURL }
            ]
          }
        },
        feeds: [
          {
            serialize: ({ query: { site, allContentfulBlogPost } }) => {
              return allContentfulBlogPost.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description:
                    edge.node.childContentfulBlogPostDescriptionTextNode
                      .childMarkdownRemark.excerpt,
                  date: edge.node.updatedAt,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug,
                  image_url: edge.node.heroImage.fixed.srcWebp,
                  custom_elements: [].concat(
                    {
                      'content:encoded': edge.node.body.childMarkdownRemark.html
                    },
                    edge.node.tags.map(tag => ({ category: tag }))
                  )
                })
              })
            },
            query: `
    {
      allContentfulBlogPost(limit: 1000, sort: { order: DESC, fields: [updatedAt]}) {
        edges {
          node {
            id
            title
            slug
            tags
            heroImage {
              fixed(width: 400) {
                srcWebp
              }
            }
            updatedAt
            childContentfulBlogPostDescriptionTextNode {
              childMarkdownRemark {
                excerpt
              }
            }
            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
            `,
            output: '/rss.xml',
            title: 'RSS Feed'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000 // default: 1000
      }
    }
  ]
}

// optional plugins or production only plugins

if (isProduction) {
  // Tracking only in production
  // we're tracking with-out ip logging
  // Todo: Add an opt-out button
  const trackingId = process.env.GOOGLE_TRACKING_ID

  if (trackingId) {
    config.plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: trackingId,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        cookieDomain: process.env.GOOGLE_COOKIE_DOMAIN
      }
    })
  }
}

module.exports = config
