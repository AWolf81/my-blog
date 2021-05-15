import React, { useState, useEffect, useRef } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
  SearchBox,
  connectStateResults
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import { Root, HitsWrapper, PoweredBy } from './styles'
import Input from './input'
import * as hitComps from './hitComps'

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (refs, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  useEffect(() => {
    const detectClickOutside = event =>
      (refs.length > 0 && !refs.some(ref => ref && ref.current.contains(event.target))) && handler()
    for (const event of events) {
      document.addEventListener(event, detectClickOutside)
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, detectClickOutside)
      }
    }
  }, [refs, events])
}

export default function Search({ indices, collapse, hitsAsGrid }) {
  const searchBoxRef = useRef()
  const searchResultsRef = useRef()

  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside([searchBoxRef, searchResultsRef], () => setFocus(false))
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{Root}}
      >
      <Input
        inputRef={searchBoxRef}
        onFocus={(event) => {
          console.log(query, searchBoxRef)
          // if (!focus) {
            // set caret only if not focused      
            event.target.selectionEnd = query.length
            event.target.selectionStart = query.length
            console.log(event)
            // setCaretPosition(searchBoxRef.current, query.length)
          // }
          setFocus(true)
        }} {...{ collapse, focus }} />
      <HitsWrapper ref={searchResultsRef} show={query.length > 0 && focus} asGrid={hitsAsGrid}>
        {/* <Hits hitComponent={PostHit}></Hits> */}
        {indices.map(({ name, title, hitComp }) => (
          <Index key={name} indexName={name}>
            <header>
              <h3>{title}</h3>
              <Stats />
            </header>
            <Results>
              <Hits hitComponent={hitComps[hitComp](() => setFocus(true))} />
            </Results>
          </Index>
        ))}
        <PoweredBy />
      </HitsWrapper>
    </InstantSearch>
  )
}
