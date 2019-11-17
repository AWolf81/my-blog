import React, { Fragment } from './node_modules/react'
import { Highlight, Snippet } from './node_modules/react-instantsearch-dom'
import { Link } from './node_modules/gatsby'
import { Calendar } from './node_modules/styled-icons/octicons/Calendar'
import { Tags } from './node_modules/styled-icons/fa-solid/Tags'

export const PageHit = clickHandler => ({ hit }) =>
  hit && (
    <div>
      <Link to={hit.slug} onClick={clickHandler}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  )

export const PostHit = clickHandler => ({ hit }) =>
  hit.tags && (
    <div>
      <Link to={`/` + hit.slug} onClick={clickHandler}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
      <div>
        <Calendar size="1em" />
        &nbsp;
        <Highlight attribute="date" hit={hit} tagName="mark" />
        &emsp;
        <Tags size="1em" />
        &nbsp;
        {hit.tags.map((tag, index) => (
          <Fragment key={tag}>
            {index > 0 && `, `}
            {tag}
          </Fragment>
        ))}
      </div>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  )
