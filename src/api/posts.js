import env from '../lib/env'
import { makeInvoker } from 'awilix-koa'
import { openConnection } from '../lib/mysql'
import { debug, getParams } from '../lib/helpers'

const { assign } = Object

const postsApi = ({ someService }) => {
  const getPosts = async ({ req: { _parsedUrl: { query }}, ok }) => {
    const params = getParams(query)

    const qry = `SELECT * from posts where user_id = "${params['user_id']}"`
    const rows = await openConnection().query(qry)
    debug(rows)
    ok({ rows })
  }

  const getPost = async ({ req: { _parsedUrl: { query }}, ok }) => {
    const params = getParams(query)

    const qry = `SELECT * from posts where id = "${params['id']}"`
    const rows = await openConnection().query(qry)
    ok({ rows })
  }

  const postPost = async ({ req: { _parsedUrl: { query }}, ok }) => {
    const params = getParams(query)

    const client = openConnection()
    const qry = `insert into posts (user_id, post, title) values("${params['user_id']}", "${params['post']}", "${params['title']}")`
    await client.startTransaction()
    const result = await client.executeTransaction(qry)
    await client.stopTransaction()

    return ok({ result })
  }

  return {
    getPosts,
    getPost,
    postPost
  }
}

export default function (router) {
  const api = makeInvoker(postsApi)
  router
    .get('/api/posts', api('getPosts'))
    .get('/api/post', api('getPost'))
    .post('/api/post', api('postPost'))
}
