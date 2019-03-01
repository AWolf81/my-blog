import React from 'react';
import IconBase from 'react-icons-kit';
import { chevronLeft } from 'react-icons-kit/feather/chevronLeft';
import styled from 'styled-components';

/* <li className={styles.navigationItem}> */
export default ({ children }) => (
  <Wrapper>
    <Icon size={20} icon={chevronLeft} />
    {children}
  </Wrapper>
);

const Wrapper = styled.li`
  display: inline-flex;
  align-items: center;
  margin: 0 1em;
  background: rgba(255, 255, 255, 0.7);
  padding: 1em;
  border-radius: 5px;
`;

const Icon = styled(IconBase)`
  transform: translateY(-1px);
`;
