import React from 'react'

export default ({ children }) => (
  <ul>
    {children && children.map((c, i) =>
      <li key={i}>
        <a href={`/post?id=${c.id}`}>
          {c.title}
        </a>
      </li>
      )}
  </ul>
)
