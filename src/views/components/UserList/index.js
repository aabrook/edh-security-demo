import React from 'react'
import User from '../User'
import {List, ListItem} from 'material-ui/List'

export default ({ children }) => (
  <List>
    {
      children && children.map((c, i) => (
        <a href={`/user?id=${c.id}`}>
          <User username={c.username} email={c.email} {...c} />
        </a>
      ))
    }
  </List>
)
