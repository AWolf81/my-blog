import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { chevronLeft } from 'react-icons-kit/feather/chevronLeft';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

export const PrevNext = ({ prev, next }) => (
  <Wrapper>
    <InnerWrapper>
      <Prev
        to={`/${prev && prev.node.slug}`}
        visible={!!prev}
        title={prev && `Previous: ${prev.node.title}`}
      >
        <Icon size={32} icon={chevronLeft} />
      </Prev>
      <Spacer />
      <Next
        to={`/${next && next.node.slug}`}
        visible={!!next}
        title={next && `Next: ${next.node.title}`}
      >
        <Icon size={32} icon={chevronRight} />
      </Next>
    </InnerWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

const InnerWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-end;
  padding-top: 2em;
`;

const Spacer = styled.div`
  width: 1180px;
  margin: 0 auto;
`;

const NavItem = styled(Link)`
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
`;

const Prev = styled(NavItem)`
  margin-left: auto;
`;

const Next = styled(NavItem)`
  margin-right: auto;
`;
