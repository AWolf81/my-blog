import React from 'react'
import styled from 'styled-components'

export default ({ date }) => (
  <Wrapper>&#169;{new Date(date).getFullYear()} Alexander Wolf</Wrapper>
)

const Wrapper = styled.span`
  padding: 5px;
  color: hsl(0, 0%, 60%);
`
