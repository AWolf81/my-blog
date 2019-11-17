import React from './node_modules/react'
import { connectSearchBox } from './node_modules/react-instantsearch-dom'

import { SearchIcon, Form, Input } from './styles'

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))
