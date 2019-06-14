import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import styled, { createGlobalStyle, css } from 'styled-components'
import baseStyles from '../styles/base.css'

import Layout from '../components/Layout'
import { GlobalStyle, Wrapper } from './index'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { COLORS } from '../constants'

class RootIndex extends React.Component {
  render() {
    const {
      data: { allContentfulSiteContent }
    } = this.props
    return (
      <Fragment>
        <GlobalStyle />
        <Layout location={this.props.location}>
          <Wrapper>
            <Tabs>
              <TabList>
                <Tab>English</Tab>
                <Tab>Deutsch</Tab>
              </TabList>
              {allContentfulSiteContent.edges.map(privacy => (
                <TabPanel
                  dangerouslySetInnerHTML={{
                    __html: privacy.node.body.childMarkdownRemark.html
                  }}
                />
              ))}
            </Tabs>
          </Wrapper>
        </Layout>
      </Fragment>
    )
  }
}

export const SectionHeadline = styled.h2`
  padding: 0 0 0.4em 0;
  margin: 0 0 5vmin 0;
  border-bottom: 1px solid #ddd;
`

export default RootIndex

export const query = graphql`
  query PrivacyQuery {
    allContentfulSiteContent(filter: { slug: { eq: "privacy-policy" } }) {
      edges {
        node {
          node_locale
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
