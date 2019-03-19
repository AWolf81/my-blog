import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { chevronLeft } from 'react-icons-kit/feather/chevronLeft';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

export const PrevNext = ({ prev, next }) => (
  <Wrapper>
    {prev && (
      <Prev to={`/${prev.node.slug}`}>
        <Icon size={32} icon={chevronLeft} />
      </Prev>
    )}
    {next && (
      <Next to={`/${next.node.slug}`}>
        <Icon size={32} icon={chevronRight} />
      </Next>
    )}
  </Wrapper>
);

const Wrapper = styled.div`
  position: fixed;
  top: 50vh;
  border: 1px solid black;
  width: 1200px;
`;

const Prev = styled(Link)`
  margin-left: -60px;
`;

const Next = styled(Link)``;
