import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { makeInvoker } from 'awilix-koa'
import { debug, getquery } from '../lib/helpers'
import { openConnection } from '../lib/mysql'
import List from '../views/components/UserList'
import PostList from '../views/components/PostList'
import User from '../views/components/User'
import App from '../views/components/App'

const userApi = ({ someService }) => {
  const createUser = async (ctx) => {
    ctx.response.body = ReactDOMServer.renderToString(<App><User form={true} action="/user" /></App>)
  }

  const listUsers = async (ctx) => {
    const client = openConnection()
    const result = await client.query('select * from users')
    ctx.response.body = ReactDOMServer.renderToString(<App><List children={result} /></App>)
  }

  const apiListUsers = async (ctx) => {
    const client = openConnection()
    const rows = await client.query('select * from users')
    ctx.ok({ rows })
  }

  const getUser = async ({ request: { query }, ok }) => {
    const qry = `SELECT * from users where username = "${query['username']}"`
    console.log({ qry })
    const rows = await openConnection().query(qry)
    ok({ rows })
  }

  const showUser = async (ctx) => {
    const qry = `SELECT * from users where id = "${ctx.request.query['id']}"`
    const rows = await openConnection().query(qry)
    const posts = rows[0] ?
      await openConnection().query(`select * from posts where user_id = ${rows[0].id}`) :
      []

    const toDraw = (
      <App>
        <div>
          <User form={!rows.length} {...rows[0]} />
          <PostList children={posts} />
        </div>
      </App>
    )
    ctx.response.body = ReactDOMServer.renderToString(toDraw)
  }

  const apiPostUser = async (ctx) => {
    const rows = await saveUser(ctx.request.query)
    return ctx.ok({ rows })
  }

  const postUser = async (ctx) => {
    console.log(ctx.request.body)
    try{
      const result = await saveUser(ctx.request.body)
      ctx.response.redirect(`/user?id=${result.insertId}`)
    }catch(e){
      ctx.response.body = `Looks like bad things happened: ${e.message}`
    }
  }

  const saveUser = async (query) => {
    const client = openConnection()
    const haveUser = `select * from users where username = "${query['username']}" or email = "${query['email']}"`
    await client.startTransaction()
    const userExists = await client.executeTransaction(haveUser)
    await client.stopTransaction()
    if(userExists.length){
      console.log(userExists)
      console.log(haveUser)
      throw new Error('Nope. Account Exists')
    }

    const qry = `insert into users (username, password, email) values("${query['username']}", "${query['password']}", "${query['email']}")`
    await client.startTransaction()
    const result = await client.executeTransaction(qry)
    await client.stopTransaction()

    return result
  }

  return {
    createUser,
    showUser,
    getUser,
    listUsers,
    apiListUsers,
    postUser
  }
}

export default function (router) {
  const api = makeInvoker(userApi)
  router
    .get('/user/new', api('createUser'))
    .get('/user', api('showUser'))
    .post('/user', api('postUser'))
    .get('/users', api('listUsers'))

    .get('/api/user', api('getUser'))
    .post('/api/user', api('apiPostUser'))
    .get('/api/users', api('apiListUsers'))
}
