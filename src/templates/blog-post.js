import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import Layout from '../components/Layout';
import { HeroImage, Wrapper as HeroWrapper } from '../components/Hero/Hero';
import { PrevNext } from '../components/Navigation';
import { Wrapper as MainWrapper, SectionHeadline } from '../pages';
import { GlobalStyle } from '../pages';

class BlogPostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const post = data.contentfulBlogPost;
    const { title: siteTitle } = data.site.siteMetadata;
    const disqusShortname = 'blog-awolf';
    const disqusConfig = {
      identifier: post.id,
      title: post.title,
    };
    const { prev, next } = pageContext;
    console.log('post prevNext', prev, next, pageContext);
    return (
      <Fragment>
        <GlobalStyle />
        <Layout
          location={this.props.location}
          slug={post.slug}
          title={`${post.title} | ${siteTitle}`}
          twitterCardImage={`https:${post.heroImage.fixed.srcWebp}`}
        >
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
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
            <PrevNext prev={prev} next={next} />
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
        fixed(width: 800) {
          srcWebp
        }
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
