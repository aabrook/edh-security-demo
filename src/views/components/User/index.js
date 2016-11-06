import React from 'react'

export default ({ id, username, email }) => (
  <div>
    <p><a href={`/posts?user_id=${id}`}>{username}</a></p>
    <p>{email}</p>
  </div>
)
