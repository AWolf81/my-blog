import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants'

const MainPaneWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.colors.mainPane_bg};
`

export default ({ children }) => (
  <MainPaneWrapper>
    {children}
  </MainPaneWrapper>
)
