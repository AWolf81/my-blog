import React from 'react';
import Link from 'gatsby-link';
import BackButton from './BackButton';

import styles from './navigation.module.css';

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <Link to="/">
        <BackButton>back</BackButton>
      </Link>
    </ul>
  </nav>
);
