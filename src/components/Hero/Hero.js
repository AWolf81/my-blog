import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const MastodonVerificationLink = () => (
  <MastodonWrapper>
    I'm also tooting on Mastodon<Link href="https://mastodontech.de/@awolf" rel="me"><MastodonLogo src="mastodon-logo.svg" title="Visit Mastodontech.de"/>@awolf@mastodontech.de</Link>
  </MastodonWrapper>
)

const Link = styled.a`
  display: flex;
  align-items:center;
`
const MastodonWrapper = styled.div`
  text-align: left;
  margin-bottom: 0.5em;
`

const MastodonLogo = styled.img`
  width: 32px;
  height: 32px;
  display: inline-block;
  padding: 0.2em;
`

export default ({ name, title, image, shortBio, readingTime }) => (
  <Wrapper>
    <HeroImage fluid={image.fluid}/>
    <HeroDetails>
      <HeroHeadline>{name}</HeroHeadline>
      <Title>
        {title}
        <span>{readingTime}</span>
      </Title>
      <div
        dangerouslySetInnerHTML={{
          __html: shortBio?.childMarkdownRemark?.html
        }}
        />
      <MastodonVerificationLink/>
    </HeroDetails>
  </Wrapper>
)

export const Wrapper = styled.div`
  position: relative;
  background: #000;
  color: #fff;
  text-align: center;
`

export const HeroImage = styled(Img)`
  /*
    Ensure golden ratio for the hero size while limiting it to some extend to
    the viewport width
  */
  height: 61.8vh;
  max-height: ${props => props.maxHeight || 400}px;
  margin-bottom: 15px;
`

const HeroDetails = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  font-size: 14px;
  padding: 0 0.5em;

  @media (min-width: 600px) {
    font-size: 16px;
  }

  @media (min-width: 1000px) {
    font-size: 20px;
  }
`

const HeroHeadline = styled.h3`
  margin: 0;
`

const Title = styled.p`
  margin: 0;
  font-size: 1.125em;
  font-weight: bold;
`
