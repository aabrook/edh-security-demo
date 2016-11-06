import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { makeInvoker } from 'awilix-koa'
import { debug, getquery } from '../lib/helpers'
import { openConnection } from '../lib/mysql'
import List from '../views/components/UserList'
import User from '../views/components/User'

const userApi = ({ someService }) => {
  const createUser = async(ctx) => {
    console.log(ctx.request.query)
    ctx.response.body = ReactDOMServer.renderToString(<List />)
  }

  const listUsers = async (ctx) => {
    const client = openConnection()
    const result = await client.query('select * from users')
    console.log(result)
    ctx.response.body = ReactDOMServer.renderToString(<List children={result} />)
  }

  const getUser = async ({ request: { query }, ok }) => {
    debug(query)

    const qry = `SELECT * from users where username = "${query['username']}"`
    const rows = await openConnection().query(qry)
    ok({ rows })
  }

  const postUser = async ({ request: { query }, ok }) => {
    const client = openConnection()
    const qry = `insert into users (username, password, email) values("${query['username']}", "${query['password']}", "${query['email']}")`
    await client.startTransaction()
    const result = await client.executeTransaction(qry)
    await client.stopTransaction()
    return ok({ result })
  }

  return {
    createUser,
    getUser,
    listUsers,
    postUser
  }
}

export default function (router) {
  const api = makeInvoker(userApi)
  router
    .get('/user', api('createUser'))
    .get('/users', api('listUsers'))
    .get('/api/user', api('getUser'))
    .post('/api/user', api('postUser'))
}
