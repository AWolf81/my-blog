import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants'

const MainPaneWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.colors.mainPane_bg};
  /*transition: background 0.4s ease;*/
`

export default ({ children }) => (
  <MainPaneWrapper>
    {children}
  </MainPaneWrapper>
)
