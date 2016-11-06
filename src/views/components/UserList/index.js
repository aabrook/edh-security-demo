import React from 'react'
import User from '../User'

export default ({ children }) => (
  <ul>
    {
      children && children.map((c, i) => (<li key={i}><User username={c.username} email={c.email} {...c} /></li>))
    }
  </ul>
)
