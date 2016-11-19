import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

const listItem = ({ href, label }) => (
  <li style={{textAlign: "center", display: "block", float: "left", width: "25%"}}>
    <a href={href}>
      {label}
    </a>
  </li>
)

export default ({ children, ctx }) => (
  <div>
    <style>
    </style>
    <div id="header">
      <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: 'all' })}>
        <div>
          <AppBar title="Shitty App is Shitty"  />
          <Paper zState={1}>
            <ul style={{listStyleType: "none", width: "100%", height: "3em"}}>
              {listItem({ href: '/users', label: 'Users' })}
              {listItem({ href: '/user/new', label: 'Create User' })}
              {ctx.session.user ? listItem({ href: '/auth/logout', label: 'Logout' }) : listItem({ href: '/auth', label: 'Login' })}
              {listItem({ href: '/post', label: 'Create Post' })}
            </ul>
          </Paper>
          <div id="content">
            <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: 'all' })}>
              <div>
                {children}
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      </MuiThemeProvider>
    </div>
  </div>
)
