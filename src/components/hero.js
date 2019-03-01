import React from 'react';
import Img from 'gatsby-image';

import styles from './hero.module.css';

export default ({ data }) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={data.name}
      sizes={data.heroImage.sizes}
    />
    <div className={styles.heroDetails}>
      <h3 className={styles.heroHeadline}>{data.name}</h3>
      <p className={styles.heroTitle}>
        {data.title}
        <span>{data.readingTime}</span>
      </p>
      <p
        dangerouslySetInnerHTML={{
          __html: data.shortBio.childMarkdownRemark.html,
        }}
      />
    </div>
  </div>
);
