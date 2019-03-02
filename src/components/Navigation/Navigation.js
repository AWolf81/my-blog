import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import BackButton from '../BackButton';

// Note: We could also rename/refactor this as it is only the back navigation from a post to the index page
//       If we're having a main navigation we need to modify this.
export default () => (
  <nav role="navigation">
    <Wrapper>
      <Link to="/">
        <BackButton>back</BackButton>
      </Link>
    </Wrapper>
  </nav>
);

const Wrapper = styled.ul`
  position: absolute;
  top: 1em;
  display: flex;
  justify-content: left;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 20vh;
  max-height: 60px;
  font-size: 1.25em;
  z-index: +1;
`;
