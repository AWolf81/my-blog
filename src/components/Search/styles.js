import React from 'react'
import styled, { css } from 'styled-components'
import { Search } from '@styled-icons/fa-solid/Search'
import { Algolia } from '@styled-icons/fa-brands/Algolia'

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
`

const focus = css`
  background: white;
  color: ${props => props.theme.darkBlue};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  cursor: text;
  width: 15em;
  padding: 0.4em;
  + ${SearchIcon} {
    color: ${props => props.theme.darkBlue};
    margin: 0.3em;
  }
`

const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  + ${SearchIcon} {
    color: black;
  }
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`

const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${props => props.theme.timing.shortTrans};
  border-radius: ${props => props.theme.styles.smallBorderRadius};
  ${props => (props.collapse ? collapse : expand)};
`

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 0.5em;
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  right: 1vw;
  top: 60px;
  width: 80vw;
  max-width: 40em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: ${props => props.theme.colors.searchResults_bg};
  border-radius: ${props => props.theme.styles.smallBorderRadius};
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid ${props => props.theme.colors.darkGray};
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    padding-bottom: 0.7em;
    border-top: 1px solid ${props => props.theme.colors.lightGray};
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${props => props.theme.colors.highlight};
    background: ${props => props.theme.colors.highlight_bg}; 
    padding: 0.4em 0;
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      background: ${props => props.theme.colors.gray};
      padding: 0.1em 0.4em;
      border-radius: ${props => props.theme.styles.smallBorderRadius};
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`

export const PoweredBy = () => (
  <span css="font-size: 0.6em; text-align: end; padding: 0;">
    Powered by{` `}
    <a href="https://algolia.com" rel="noreferrer">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
)
