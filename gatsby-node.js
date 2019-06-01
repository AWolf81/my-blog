const Promise = require('bluebird')
const path = require('path')

const buildDate = Date.now()

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost(
              sort: { order: DESC, fields: [publishDate] }
            ) {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              buildDate,
              prev: index === 0 ? null : posts[index - 1],
              next: index === posts.length - 1 ? null : posts[index + 1]
            }
          })
        })
      })
    )
  })
}
