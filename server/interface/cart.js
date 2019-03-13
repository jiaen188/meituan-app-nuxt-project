import Router from 'koa-router'
import axios from './utils/axios'
import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/Cart'

let router = new Router({
  prefix: '/Cart'
})

router.post('/create', async(ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + new Date().getTime()).toString()
    let { params: { id, detail } } = ctx.request.body
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    let result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

export default router
