import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {List, ListItem} from 'material-ui/List'

const view = ({ id, username, email }) => (
  <ListItem key={id} primaryText={username} secondaryText={email} />
)

const form = ({ id, username, email, password, action }) =>
  (<form method="post" action={action}>
    <div>
      <TextField value={username} floatingLabelFixed={true} floatingLabelText="Username" id="username" name="username" />
    </div>
    <div>
      <TextField value={password} floatingLabelFixed={true} floatingLabelText="Password" id="password" name="password" type="password" />
    </div>
    <div>
      <TextField value={email} floatingLabelFixed={true} floatingLabelText="Email" id="email" name="email" />
    </div>
    <div>
      <RaisedButton primary={true} label="Submit" type="submit" />
    </div>
  </form>)

export default (props) => (
  props.form ? form(props) : view(props)
)
