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
    const { title: siteTitle, url, twitterHandle } = data.site.siteMetadata;
    const disqusShortname = 'blog-awolf';
    const disqusConfig = {
      identifier: post.id,
      title: post.title,
    };

    return (
<<<<<<< HEAD
      <Layout location={this.props.location} style={{ background: '#fff' }}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <HeroWrapper>
          {post.heroImage ? (
            <HeroImage alt={post.title} sizes={post.heroImage.sizes} />
          ) : (
            <strong>Hero image missing!!</strong>
          )}
        </HeroWrapper>
        <MainWrapper>
          <SectionHeadline>{post.title}</SectionHeadline>
          <p
            style={{
              display: 'block',
            }}
          >
            {post.publishDate}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </MainWrapper>
      </Layout>
=======
      <Fragment>
        <GlobalStyle />
        <Layout location={this.props.location}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <HeroWrapper>
            {post.heroImage ? (
              <HeroImage alt={post.title} sizes={post.heroImage.sizes} />
            ) : (
              <strong>Hero image missing!!</strong>
            )}
          </HeroWrapper>
          <MainWrapper>
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
                  url: `${url}${post.slug}`,
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
>>>>>>> ea6de32... added share & comments
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        url
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
        }
      }
    }
  }
`;
