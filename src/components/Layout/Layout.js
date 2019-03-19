import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import MainPane from '../MainPane';
import Navigation from '../Navigation';

class Template extends React.Component {
  render() {
    const { children, location, title, slug, twitterCardImage } = this.props;

    console.log('slug', slug);
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
                siteUrl
              }
            }
          }
        `}
        render={data => (
          <Fragment>
            {!slug ? (
              <Helmet title={data.site.siteMetadata.title} />
            ) : (
              <Helmet title={title}>
                <meta
                  property="twitter:widgets:new-embed-design"
                  content="on"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:image:src" content={twitterCardImage} />
                <meta name="twitter:creator" content="@awolf81" />
                <meta
                  property="og:url"
                  content={`${data.site.siteMetadata.siteUrl}${slug}`}
                />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={twitterCardImage} />
              </Helmet>
            )}
            <MainPane>
              {location.pathname !== '/' && <Navigation />}
              {children}
            </MainPane>
          </Fragment>
        )}
      />
    );
  }
}

export default Template;
