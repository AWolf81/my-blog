import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import styles from './article-preview.module.css';

export default ({ article, readingTime }) => (
  <div className={styles.preview}>
    <Link to={`/${article.slug}`}>
      <Img alt="" sizes={article.heroImage.sizes} />
    </Link>
    <h3 className={styles.previewTitle}>
      <Link to={`/${article.slug}`}>{article.title}</Link>
    </h3>
    <small>
      {article.publishDate} - {readingTime}
    </small>
    <p
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
  </div>
);
