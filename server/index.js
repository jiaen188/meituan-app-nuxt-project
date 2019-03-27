
// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser' // 处理post请求，获取参数相关
import session from 'koa-generic-session' // 用于操作 cookie
import Redis from 'koa-redis'
import json from 'koa-json' // 服务端向客户端发送json时，美化json
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'
import cart from './interface/cart'
import order from './interface/order'


const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['mt', 'keyskeys'] // 密钥
app.proxy = true
app.use(session({key: 'mt', prefix: 'mt:uid', store: new Redis()}))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs, { // 连接数据库
  useNewUrlParser: true
})
app.use(passport.initialize()) // passport 相关配置
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(users.routes()).use(users.allowedMethods()) // 引入路由
  app.use(geo.routes()).use(geo.allowedMethods()) // 引入路由
  app.use(search.routes()).use(search.allowedMethods()) // 引入路由
  app.use(categroy.routes()).use(categroy.allowedMethods()) // 引入路由
  app.use(cart.routes()).use(cart.allowedMethods()) // 引入路由
  app.use(order.routes()).use(order.allowedMethods()) // 引入路由

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
