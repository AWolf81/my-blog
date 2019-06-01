import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import { HeroImage, Wrapper as HeroWrapper } from '../components/Hero/Hero'
import { PrevNext } from '../components/Navigation'
import Footer from '../components/Footer'
import { Wrapper as MainWrapper, SectionHeadline } from '../pages'
import { GlobalStyle } from '../pages'

class BlogPostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const post = data.contentfulBlogPost
    const { title: siteTitle } = data.site.siteMetadata
    const disqusShortname = 'blog-awolf'
    const disqusConfig = {
      identifier: post.id,
      title: post.title
    }
    const { prev, next, buildDate } = pageContext
    return (
      <Fragment>
        <GlobalStyle />
        <Layout
          location={this.props.location}
          slug={post.slug}
          title={`${post.title} | ${siteTitle}`}
          twitterCardImage={
            post.heroImage && `https:${post.heroImage.fixed.srcWebp}`
          }
        >
          <MainWrapper>
            <HeroWrapper>
              {post.heroImage ? (
                <HeroImage
                  alt={post.title}
                  sizes={post.heroImage.sizes}
                  maxHeight={200}
                />
              ) : (
                <strong>Hero image missing!!</strong>
              )}
            </HeroWrapper>
            <HeadLine>
              <SectionHeadline>{post.title}</SectionHeadline>
              <p
                style={{
                  display: 'block'
                }}
              >
                {post.publishDate} -{' '}
                {post.body.childMarkdownRemark.fields.readingTime.text}
              </p>
            </HeadLine>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html
              }}
            />
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
            <PrevNext prev={prev} next={next} />
          </MainWrapper>
          <Footer date={buildDate} />
        </Layout>
      </Fragment>
    )
  }
}

const HeadLine = styled.section`
  background: rgba(200, 211, 213, 0.2);
  padding: 10px;
  margin-bottom: 15px;
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        twitterHandle
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fixed(width: 800) {
          srcWebp
        }
        sizes(maxWidth: 1920, quality: 100, background: "rgb:000000") {
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
    }
  }
`
