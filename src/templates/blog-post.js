import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import Layout from '../components/Layout';
import { HeroImage, Wrapper as HeroWrapper } from '../components/Hero/Hero';
import { Wrapper as MainWrapper, SectionHeadline } from '../pages';
import Share from '../components/Share';
import { GlobalStyle } from '../pages';

class BlogPostTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const post = data.contentfulBlogPost;
    const { title: siteTitle, siteUrl, twitterHandle } = data.site.siteMetadata;
    const disqusShortname = 'blog-awolf';
    const disqusConfig = {
      identifier: post.id,
      title: post.title,
    };

    return (
      <Fragment>
        <GlobalStyle />
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <Layout location={this.props.location} slug={post.slug}>
          <MainWrapper>
            <HeroWrapper>
              {post.heroImage ? (
                <HeroImage alt={post.title} sizes={post.heroImage.sizes} />
              ) : (
                <strong>Hero image missing!!</strong>
              )}
            </HeroWrapper>
            <SectionHeadline>{post.title}</SectionHeadline>
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
            <Share
              socialConfig={{
                twitterHandle,
                config: {
                  url: `${siteUrl}${post.slug}`,
                  title: post.title,
                },
              }}
              // tags={tags}
            />
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </MainWrapper>
        </Layout>
      </Fragment>
    );
  }
}

export default BlogPostTemplate;

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
