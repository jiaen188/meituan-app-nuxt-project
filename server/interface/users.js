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
    // 从 redis中获取
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
  // 我们在 possport中引用的是passport-local 策略
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

router.post('/verify', async(ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟1次'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false, // true的话就是监听465端口，false的话就是其他端口
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《高仿美团网全栈实战》注册码',
    html: `您在《高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error')
    } else {
      // 在redis中存储
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email )
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延迟，有效期1分钟'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout() // 注销操作
  if (!ctx.isAuthenticated()) { // 二次验证是否已经注销
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    // passport 会把用户信息 session放到参数对象中
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
