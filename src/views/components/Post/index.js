import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const view = ({ title, post }) => (
  <div>
    <div>{title}</div>
    <div dangerouslySetInnerHTML={{__html: post}} />
  </div>
)

const form = ({ title, post }) => (
  <form method='post'>
    <div>
      <TextField value={title} floatingLabelFixed={true} floatingLabelText="Title" id="title" name="title" />
    </div>
    <div>
      <TextField value={post} floatingLabelFixed={true} floatingLabelText="Post" id="post" name="post"
        multiLine={true}
        rows={4}
        rowsMax={4}
        fullWidth={true}
      />
    </div>
    <div>
      <RaisedButton primary={true} label="Submit" type="submit" />
    </div>
  </form>
)

export default (props) => (
  props.form ? form(props) : view(props)
)
