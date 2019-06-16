import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import MainPane from '../MainPane'
import Logo from '../Logo'
// import Navigation from '../Navigation' // old back button --> not needed anymore

class Template extends React.Component {
  componentDidMount() {
    window.addEventListener(
      'CookiebotOnAccept',
      function(e) {
        const gaProperty = process.env.GOOGLE_TRACKING_ID

        console.log('on accept', gaProperty)
        // Disable tracking if consent statistics is false.
        const disableStr = 'ga-disable-' + gaProperty

        if (!Cookiebot.consent.statistics) {
          // opt-out
          // Set to the same value as the web property used on the site

          // no need to store disableStr in a cookie as Cookiebot.consent is already stored
          // document.cookie =
          //   disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
          window[disableStr] = true
        } else {
          // google analyitics is added by gatsby plugin
          window[disableStr] = false
        }

        if (Cookiebot.consent.marketing) {
          //Execute code that sets marketing cookies
        }
      },

      false
    )
  }
  render() {
    const { children, location, title, slug, twitterCardImage } = this.props

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
                <script
                  id="Cookiebot"
                  src="https://consent.cookiebot.com/uc.js"
                  data-cbid="e20953e6-301a-40a9-8fd2-b5e53901021b"
                  type="text/javascript"
                  async
                />
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
              <Logo />
              {children}
            </MainPane>
          </Fragment>
        )}
      />
    )
  }
}

export default Template
