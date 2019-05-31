import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import MainPane from '../MainPane';
import Logo from '../Logo';
// import Navigation from '../Navigation';

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
                <script type="text/javascript">
                  {`
                  var addthis_share = {
                    url: "${data.site.siteMetadata.siteUrl}${slug}",
                    title: "${title.split('|')[0].trim()}",
                    passthrough : {
                      twitter: {
                        via: "awolf81",
                        // hashtags: "javascript,react"
                      }
                    },
                    media: "${twitterCardImage}"
                  }
                `}
                </script>
              </Helmet>
            )}
            <MainPane>
              {/* {location.pathname !== '/' && <Navigation />} */}
              <Logo>
                <span>
                  Blog <sub>AWolf</sub>
                </span>
              </Logo>
              {children}
            </MainPane>
          </Fragment>
        )}
      />
    );
  }
}

export default Template;
