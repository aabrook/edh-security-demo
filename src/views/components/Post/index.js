import React from 'react'

export default ({ title, post }) => (
  <div>
    <div>{title}</div>
    <div dangerouslySetInnerHTML={{__html: post}} />
  </div>
)
