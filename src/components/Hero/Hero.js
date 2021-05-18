import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

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
