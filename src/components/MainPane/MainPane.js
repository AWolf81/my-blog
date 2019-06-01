import React from 'react'
import { COLORS } from '../../constants'

export default ({ children }) => (
  <div
    style={{
      maxWidth: 800,
      margin: '0 auto',
      background: COLORS.snow[100]
    }}
  >
    {children}
  </div>
)
