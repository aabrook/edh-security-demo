import React from 'react'

const view = ({ id, username, email }) => (
  <div>
    <p><a href={`/user?id=${id}`}>{username}</a></p>
    <p>{email}</p>
  </div>
)

const form = ({ id, username, email, password, target }) => (
  <form method="post">
    <p><label for='username'>Username</label><input type="text" name="username" id="username" value={username} /></p>
    <p><label for='password'>Password</label><input type="password" name="password" id="password" value={password} /></p>
    <p><label for='email'>Email</label><input type="text" name="email" id="email" value={email} /></p>
    <input type="submit" value="Submit" />
  </form>
)

export default (props) => (
  props.form ? form(props) : view(props)
)
