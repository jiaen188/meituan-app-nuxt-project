import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'

let router = new Router({ prefix: '/search' })

const sign = 'a3c9fe0782107295ee9f1709edd15218'

router.get('/top', async (ctx) => {
  let { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

export default router
