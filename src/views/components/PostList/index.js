import React from 'react'

export default ({ children }) => (
  <ul>
    {children && children.map((c, i) => <li key={i}>{c.title}</li>)}
  </ul>
)
