import React from 'react';
import { COLORS } from '../../constants';

export default ({ children }) => (
  <div
    style={{ maxWidth: 1180, margin: '0 auto', background: COLORS.snow[100] }}
  >
    {children}
  </div>
);
