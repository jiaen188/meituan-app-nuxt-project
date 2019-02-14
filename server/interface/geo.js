import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({
  prefix: '/geo'
})

const sign = 'a3c9fe0782107295ee9f1709edd15218'

router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: { 
      province,
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if(status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/province', async (ctx) => {
  // let province = await Province.find()
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  let { status, data: { province } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx) => {
  // let city = await city.findOne({ id: ctx.params.id })
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name
  //     }
  //   })
  // }

  let { status , data: { city } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/menu', async (ctx) => {
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }
  let { status, data: { menu } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

export default router
