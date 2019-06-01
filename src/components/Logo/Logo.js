import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

export default () => (
  <Wrapper>
    <Link to="/">
      <span>
        Blog <Sub>A.Wolf</Sub>
      </span>
    </Link>
  </Wrapper>
)

const Wrapper = styled.h1`
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
  padding-left: 5vmin;
`

const Sub = styled.sub`
  /* Specified in % so that the sup/sup is the
     right size relative to the surrounding text */
  font-size: 75%;

  /* Zero out the line-height so that it doesn't
    interfere with the positioning that follows */
  line-height: 0;

  /* Where the magic happens: makes all browsers position
    the sup/sup properly, relative to the surrounding text */
  position: relative;

  /* Note that if you're using Eric Meyer's reset.css, this
    is already set and you can remove this rule */
  vertical-align: baseline;

  bottom: -0.5em;
  left: -0.25em;
`

const Link = styled(GatsbyLink)`
  text-decoration: none;
`
