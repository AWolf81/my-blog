import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';

export default ({ article, readingTime }) => (
  <div>
    <Link to={`/${article.slug}`}>
      <Img alt="" sizes={article.heroImage.sizes} />
    </Link>
    <PreviewTitle>
      <Link to={`/${article.slug}`}>{article.title}</Link>
    </PreviewTitle>
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

const PreviewTitle = styled.h3`
  font-size: 1.5em;
`;

/*
 // wasn't used in starter
.tag {
  color: #A0A0A0;
  text-decoration: none;
  display: inline-block;
  padding: .33333rem .5rem;
  line-height: 1;
  border-radius: 2px;
  border: 1px solid #A0A0A0;
  margin-right: .5em;
}
*/
