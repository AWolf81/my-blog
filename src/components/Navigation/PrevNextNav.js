import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import Icon from 'react-icons-kit'
import { chevronLeft } from 'react-icons-kit/feather/chevronLeft'
import { chevronRight } from 'react-icons-kit/feather/chevronRight'

export const PrevNext = ({ prev, next }) => (
  <Wrapper>
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
  </Wrapper>
)

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 45px;
  bottom: 0;
  right: 0;
  pointer-events: none;
  display: flex;
  align-items: flex-start;

  @media (min-width: 700px) {
    /* enough space left & right - move navigation down*/
    position: fixed;
    align-items: center;
    top: 0;
  }
`

const Spacer = styled.div`
  width: 800px;
  margin: 0 auto;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const NavItem = styled(({ visible, ...props }) => <Link {...props} />)`
  opacity: ${props => (props.visible ? 1 : 0)};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};

  & :hover {
    color: hsl(210, 100%, 60%);
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  }
`

const Prev = styled(NavItem)`
  margin-left: auto;
`

const Next = styled(NavItem)`
  margin-right: auto;
`
