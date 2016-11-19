import React from 'react'
import {List, ListItem} from 'material-ui/List'

export default ({ children }) => (
  <List>
    {children && children.map((c, i) =>
      <a href={`/post?id=${c.id}`}>
        <ListItem key={i} primaryText={c.title} />
      </a>
    )}
  </List>
)
