import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  if (code) { // code 和 有效时间 是存在 redis，不然内存爆炸，而且不利于 一一对应
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) { // 验证码对上了
      if (new Date().getTime - saveExpire > 0) { // 验证码对上了，但是过期了
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else { // 如果验证码没有对上
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else { // 如果没有验证码 （前端应该做限制，但这个是以防万一的特殊处理）
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  let user = await User.find({
    username
  })
  if (user.length) { // 判断用户名有无重复
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  let newUser = await User.create({
    username,
    password,
    email
  })
  if (newUser) { // 如果注册成功，就尝试 登陆
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) { // 登陆成功
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else { // 登陆失败
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else { // 注册失败
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})
