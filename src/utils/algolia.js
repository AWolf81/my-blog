// const pageQuery = `{
//     pages: allMarkdownRemark(
//       filter: {
//         fileAbsolutePath: { regex: "/pages/" },
//         frontmatter: {purpose: {eq: "page"}}
//       }
//     ) {
//       edges {
//         node {
//           objectID: id
//           frontmatter {
//             title
//             slug
//           }
//           excerpt(pruneLength: 5000)
//         }
//       }
//     }
//   }`
const postQuery = `{
    posts:
        allContentfulBlogPost(filter: {node_locale: {eq: "en-US"}}) {
            edges {
            node {
                title
                slug
                publishDate(formatString: "MMMM Do, YYYY")
                tags
                body {
                childMarkdownRemark {
                    fields {
                        readingTime {
                            text
                        }
                    }
                    rawMarkdownBody
                }
                }
                description {
                    childMarkdownRemark {
                        rawMarkdownBody
                    }
                }
            }
            }
        }
  }`
const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }
const queries = [
  //   {
  //     query: pageQuery,
  //     transformer: ({ data }) => flatten(data.pages.edges),
  //     indexName: `Pages`,
  //     settings
  //   },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings
  }
]
module.exports = queries
