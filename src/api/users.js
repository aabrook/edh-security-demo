import env from '../lib/env'
import { makeInvoker } from 'awilix-koa'
import { debug, getParams } from '../lib/helpers'
import { openConnection } from '../lib/mysql'

const { assign } = Object

const userApi = ({ someService }) => {
  const getUser = async ({ req: { _parsedUrl: { query }}, ok }) => {
    const params = getParams(query)
    debug(params)

    const qry = `SELECT * from users where username = "${params['username']}"`
    const rows = await openConnection().query(qry)
    ok({ rows })
  }

  const postUser = async ({ req: { _parsedUrl: { query }}, ok }) => {
    const params = getParams(query)
    const client = openConnection()
    const qry = `insert into users (username, email, password) values("${params['username']}", "${params['password']}", "${params['email']}")`
    await client.startTransaction()
    const result = await client.executeTransaction(qry)
    await client.stopTransaction()
    return ok({ result })
  }

  return {
    getUser,
    postUser
  }
}

export default function (router) {
  const api = makeInvoker(userApi)
  router
    .get('/api/user', api('getUser'))
    .post('/api/user', api('postUser'))
}
