import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import styled, { createGlobalStyle, css } from 'styled-components'
import baseStyles from '../styles/base.css'

import Hero from '../components/Hero'
import ArticlePreview from '../components/ArticlePreview'
import Layout from '../components/Layout'

import { COLORS } from '../constants'

class RootIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allContentfulBlogPost.edges
    const [author] = data.allContentfulPerson.edges
    const postReadingTime = node =>
      `${node.body.childMarkdownRemark.fields.readingTime.text}`

    return (
      <Fragment>
        <GlobalStyle />
        <Layout location={this.props.location}>
          <Hero data={author.node} />
          <Wrapper>
            <SectionHeadline>Recent articles</SectionHeadline>
            <ArticleList>
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview
                      article={node}
                      readingTime={postReadingTime(node)}
                    />
                  </li>
                )
              })}
            </ArticleList>
          </Wrapper>
        </Layout>
      </Fragment>
    )
  }
}

export const GlobalStyle = createGlobalStyle`
  /* ${css(baseStyles)}; */

  @font-face {
  font-family: 'Avenir';
  font-weight: 400;
  font-style: normal;
  src: url('/avenir-400.woff2') format('woff2');
  font-display: swap;
}

body {
  font-family: 'Avenir', Tahoma, Arial, Helvetica, sans-serif;
  font-size: 1em;
  line-height: 1.65;
  color: ${COLORS.black[100]};
  /* color: #373f49; */
  /* background: #eee; */
  background: ${COLORS.lightGray[100]};
  margin: 0;
}
`

export const Wrapper = styled.div`
  width: calc(100% - 10vmin);
  margin: 0 auto;
  padding: 5vmin 0;
`

export const SectionHeadline = styled.h2`
  padding: 0 0 0.4em 0;
  margin: 0 0 5vmin 0;
  border-bottom: 1px solid #ddd;
`

const ArticleList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 5vmin;
`

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(
      sort: { fields: [publishDate], order: DESC }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(
              maxWidth: 350
              maxHeight: 196
              quality: 80
              resizingBehavior: SCALE
            ) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
          body {
            childMarkdownRemark {
              html
              fields {
                readingTime {
                  text
                }
              }
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
    allContentfulPerson(
      filter: { id: { eq: "3c56de93-d279-5889-8563-5298ad412080" } }
    ) {
      edges {
        node {
          name
          shortBio {
            childMarkdownRemark {
              html
            }
          }
          title
          heroImage: image {
            sizes(
              maxWidth: 1180
              maxHeight: 480
              quality: 100
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
        }
      }
    }
  }
`
