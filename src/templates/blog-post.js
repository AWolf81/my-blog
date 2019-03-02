import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { HeroImage, Wrapper as HeroWrapper } from '../components/Hero/Hero';

class BlogPostTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const post = data.contentfulBlogPost;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} style={{ background: '#fff' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <HeroWrapper>
          {post.heroImage ? (
            <HeroImage alt={post.title} sizes={post.heroImage.sizes} />
          ) : (
            <strong>Hero image missing!!</strong>
          )}
        </HeroWrapper>
        <div className="wrapper">
          <h1 className="section-headline">{post.title}</h1>
          <p
            style={{
              display: 'block',
            }}
          >
            {post.publishDate} -{' '}
            {post.body.childMarkdownRemark.fields.readingTime.text}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        sizes(maxWidth: 1180, background: "rgb:000000") {
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
`;
