import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

export default ({ children }) => (
  <Wrapper>
    <Link to="/">{children}</Link>
  </Wrapper>
);

const Wrapper = styled.h1`
  margin: 0;
  padding: 0;
  padding-left: 5vmin;
`;
