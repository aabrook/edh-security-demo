import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { makeInvoker } from 'awilix-koa'
import { debug, getquery } from '../lib/helpers'
import { openConnection } from '../lib/mysql'
import List from '../views/components/UserList'
import User from '../views/components/User'

const userApi = ({ someService }) => {

  const listUsers = async (ctx) => {
    const client = openConnection()
    const result = await client.query('select * from users')
    ctx.response.body = ReactDOMServer.renderToString(<List children={result} />)
  }

  const getUser = async ({ request: { query }, ok }) => {
    const qry = `SELECT * from users where username = "${query['username']}"`
    const rows = await openConnection().query(qry)
    ok({ rows })
  }

  const showUser = async (ctx) => {
    const qry = `SELECT * from users where id = "${ctx.request.query['id']}"`
    const rows = await openConnection().query(qry)
    ctx.response.body = ReactDOMServer.renderToString(<User form={!rows.length} {...rows[0]} />)
  }

  const apiPostUser = async (ctx) => {
    await saveUser(ctx.request.query)
    return ctx.ok({ result })
  }

  const postUser = async (ctx) => {
    console.log(ctx.request.body)
    const result = await saveUser(ctx.request.body)
    ctx.response.redirect(`/user?id=${result.insertId}`)
  }

  const saveUser = async (query) => {
    const client = openConnection()
    const qry = `insert into users (username, password, email) values("${query['username']}", "${query['password']}", "${query['email']}")`
    await client.startTransaction()
    const result = await client.executeTransaction(qry)
    await client.stopTransaction()

    return result
  }

  return {
    showUser,
    getUser,
    listUsers,
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
}
