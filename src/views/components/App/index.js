import React from 'react'

export default ({ children }) => (
  <div>
    <style>
    </style>
    <div id="header">
      <ul>
        <li><a href="/users">Users</a></li>
        <li><a href="/user/new">Create User</a></li>
        <li><a href="/auth">Login</a></li>
        <li><a href="/post">Create post</a></li>
      </ul>
    </div>
    <div id="content">
      {children}
    </div>
  </div>
)
