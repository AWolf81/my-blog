// const pageQuery = `{
//   pages: allMarkdownRemark(
//     filter: {
//       fileAbsolutePath: { regex: "/pages/" },
//     }
//   ) {
//     edges {
//       node {
//         objectID: id
//         excerpt(pruneLength: 5000)
//       }
//     }
//   }
// }`

const postQuery = `{
  posts: allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
    edges {
      node {
        # try to find a unique id for each node
        # if this field is absent, it's going to
        # be inserted by Algolia automatically
        # and will be less simple to update etc.
        objectID: id
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        body {
          childMarkdownRemark {
            fields {
              readingTime {
                text
                minutes
                time
                words
              }
            }
            excerpt(pruneLength: 5000)
          }
        }
        description {
          childMarkdownRemark {
            html
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
  // {
  //   query: pageQuery,
  //   transformer: ({ data }) => flatten(data.pages.edges),
  //   indexName: `Pages`,
  //   settings
  // },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings
  }
]

module.exports = queries
