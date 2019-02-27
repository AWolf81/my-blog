import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Hero from '../components/hero';
import ArticlePreview from '../components/article-preview';
import Layout from '../components/layout';

class RootIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allContentfulBlogPost.edges;
    const [author] = data.allContentfulPerson.edges;

    return (
      <Layout location={this.props.location} style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <Hero data={author.node} />
        <div className="wrapper">
          <h2 className="section-headline">Recent articles</h2>
          <ul className="article-list">
            {posts.map(({ node }) => {
              return (
                <li key={node.slug}>
                  <ArticlePreview article={node} />
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulSizes_withWebp
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
`;
