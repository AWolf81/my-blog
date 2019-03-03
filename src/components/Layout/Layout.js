import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import MainPane from '../MainPane';
import Navigation from '../Navigation';

class Template extends React.Component {
  render() {
    const { children, location, slug } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query {
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
            <Helmet>
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:image"
                content={`${
                  data.site.siteMetadata.siteUrl
                }${slug}twitter-card.jpg`}
              />
            </Helmet>
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
