import React from 'react'

const view = ({ title, post }) => (
  <div>
    <div>{title}</div>
    <div dangerouslySetInnerHTML={{__html: post}} />
  </div>
)

const form = ({ title, post }) => (
  <form method='post'>
    <p><label for='title'>Title</label><input type='text' name='title' id='title' value={title} /></p>
    <p><label for='post'>Post</label><textarea name='post' id='post' value={post} /></p>
    <input type='submit' value='Save' />
  </form>
)

export default (props) => (
  props.form ? form(props) : view(props)
)
