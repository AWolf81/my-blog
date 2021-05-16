import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';

const PageNotFound = ({ location }) => (
  <Layout location={location}>
    <Wrapper>
      <NotFoundNumber>404</NotFoundNumber>
      <Message>Oops! Sorry, looks like there is nothing here</Message>
    </Wrapper>
  </Layout>
)
export default PageNotFound;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  padding: 0;
  background: rgba(255, 255, 255, 0.6);
`;

const NotFoundNumber = styled.h1`
  font-size: 5em;
  font-weight: bold;
`;

const Message = styled.p`
  color: gray;
  font-size: 1.25em;
`;
