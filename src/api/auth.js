import React from 'react'
import ReactDOMServer from 'react-dom/server'
import User from '../views/components/User'
import { makeInvoker } from 'awilix-koa'
import { openConnection } from '../lib/mysql'

const authApi = ({ someService }) => {
  const showLogin = async (ctx) => {
    ctx.response.body = ReactDOMServer.renderToString(<User form={true} action="/auth" />)
  }

  const login = async (ctx) => {
    const query = ctx.request.body
    console.log(query)
    const client = openConnection()
    const haveUser = `select * from users where username = "${query['username']}" or email = "${query['email']}"`
    await client.startTransaction()
    const userExists = await client.executeTransaction(haveUser)
    await client.stopTransaction()

    if(!userExists || !userExists.length){
      ctx.response.body = 'Couldn\'t login. You do not exist'
      return
    }

    const user = userExists[0]
    if(user.password != query['password']){
      ctx.response.body = 'Nope. Wrong password'
      return
    }

    ctx.session.user = user
    ctx.redirect(`/user?id=${user.id}`)
  }

  return {
    showLogin,
    login
  }
}

export default function (router) {
  const api = makeInvoker(authApi)
  router
    .get('/auth', api('showLogin'))
    .post('/auth', api('login'))
}