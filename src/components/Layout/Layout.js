import React, { Fragment, useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider, createGlobalStyle, css } from 'styled-components'
import ReactToggleButton from '../ReactThemeToggle'; //"react-theme-toggle-button";
// import "react-theme-toggle-button/dist/index.css";

import * as baseStyles from '../../styles/base.module.css'
import * as postStyles from '../../styles/blog-post.module.css'
import * as codeStyles from '../../styles/code-highlight.module.css'

import { light, dark } from '../../theme'
import MainPane from '../MainPane'
import Logo from '../Logo'
import Search from '../Search'
import DEFAULTS from '../../defaults';
import useHasMounted from '../../utils/useHasMounted.js'

const ToggleButton = styled(ReactToggleButton)`
  padding-top: 10px;
  border: 1px solid white;
`

export const GlobalStyles = createGlobalStyle`
${css(baseStyles)}
${css(postStyles)}
${css(codeStyles)}

:root {
  --color-toggle-light: yellow;
  --color-toggle-dark: bisque;
}

@font-face {
  font-family: 'Avenir';
  font-weight: 400;
  font-style: normal;
  src: url('/avenir-400.woff2') format('woff2');
  font-display: swap;
}

body {
  font-family: 'Avenir', Tahoma, Arial, Helvetica, sans-serif;
  font-size: 1em;
  line-height: 1.65;
  color: ${props => props.theme.colors.text};
  /* color: #373f49; */
  /* background: #000; */
  background: ${props => props.theme.colors.body};
  /*transition: background 0.4s ease;*/
  margin: 0;
}
`

const searchIndices = [
  // { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` }
]

const Template = ({ children, location, title, slug, twitterCardImage }) => {
  const hasMounted = useHasMounted();
  const [theme, setTheme] = useState(DEFAULTS.initialTheme)
  
  useEffect(() => {
    const loadTheme = () => {
      const storedTheme = window.localStorage.getItem(`${DEFAULTS.blogStorageKey}selectedTheme`);
      console.log("load theme", storedTheme);
      const theme = storedTheme ? ( storedTheme === 'light' ? light: dark ) : DEFAULTS.initialTheme;
      console.log("theme", theme);
      setTheme(theme);
    }

    loadTheme();
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
          // Execute code that sets marketing cookies
        }
      },
  
      false
    )
  }, [])

  if (!hasMounted) {
    return null;
  }
  
  const toggleTheme = () => {
    const storeTheme = theme => {
      const value = theme === light ? 'light': 'dark'
      window.localStorage.setItem(`${DEFAULTS.blogStorageKey}selectedTheme`, value)
    }

    setTheme(state => {
      const draftState = state === light ? dark : light;
      
      storeTheme(draftState)
      return draftState;
    })
  }
  
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
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyles/>
            {!slug ? (
              <Helmet title={data.site.siteMetadata.title} />
            ) : (
              <Helmet title={title}>
                <meta
                  property="twitter:widgets:new-embed-design"
                  content="on"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                  property="twitter:image:src"
                  content={twitterCardImage}
                />
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
              <Header>
                <Logo />
                <ToggleButton isDark={theme === dark} onChange={toggleTheme} />
                <div></div>
                <Search collapse indices={searchIndices} />
              </Header>
              {children}
            </MainPane>
          </Fragment>
        </ThemeProvider>
      )}
    />
  )
}

const Header = styled.div`
  display: grid;
  grid-template-columns: 200px 50px auto 100px;
  padding-top: 3vmin;
  // padding-right: 3vmin;
`

export default Template
