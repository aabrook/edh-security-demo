import { compose, map, reduce, split } from 'ramda'
const { assign } = Object

const splitParams = compose(split('&'))
const splitField = split('=')
const mapFields = map(splitField)
const paramsList = compose(mapFields, splitParams)
const buildParams = (acc, p) => assign({}, acc, { [p[0]]: p[1] })

export const log = (label) => (...args) => {
  const h = args.shift()
  if(typeof(h) != 'function'){
    console.log(label, h, ...args)
  }else{
    console.log(...args)
    return fn(...args)
  }
}

export const debug = log('[DEBUG]')

export const getParams = compose(reduce(buildParams, {}), paramsList, unescape)

