import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { makeInvoker } from 'awilix-koa'
import { openConnection } from '../lib/mysql'
import { debug, getParams } from '../lib/helpers'

import List from '../views/components/PostList'
import Post from '../views/components/Post'

const postsApi = ({ someService }) => {
  const getPosts = async ({ request: { query }, ok }) => {
    const qry = `SELECT * from posts where user_id = "${query['user_id']}"`
    const rows = await openConnection().query(qry)
    debug(rows)
    ok({ rows })
  }

  const listPosts = async (ctx) => {
    const qry = `SELECT * from posts where user_id = "${ctx.request.query['user_id']}"`
    const result = await openConnection().query(qry)
    if (!result.title) {
      ctx.response.body = ({ message: 'Error obtaining post', result })
      return
    }

    ctx.response.body = ReactDOMServer.renderToString(<List children={result} />)
  }

  const getPost = async ({ request: { query }, ok }) => {
    const qry = `SELECT * from posts where id = "${query['id']}"`
    const rows = await openConnection().query(qry)
    ok({ rows })
  }

  const showPost = async (ctx) => {
    const qry = `SELECT * from posts where id = "${ctx.request.query['id']}"`
    const rows = await openConnection().query(qry)
    ctx.response.body = ReactDOMServer.renderToString(<Post {...rows[0]} />)
  }

  const postPost = async ({ request: { query }, ok }) => {
    const client = openConnection()
    const qry = `insert into posts (user_id, post, title) values("${query['user_id']}", "${query['post']}", "${query['title']}")`
    await client.startTransaction()
    const result = await client.executeTransaction(qry)
    await client.stopTransaction()

    return ok({ result })
  }

  return {
    getPosts,
    getPost,
    listPosts,
    postPost,
    showPost
  }
}

export default function (router) {
  const api = makeInvoker(postsApi)
  router
    .get('/posts', api('listPosts'))
    .get('/post', api('showPost'))
    .get('/api/posts', api('getPosts'))
    .get('/api/post', api('getPost'))
    .post('/api/post', api('postPost'))
}
