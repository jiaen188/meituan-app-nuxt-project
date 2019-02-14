import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo
  },
  actions: {
    async nuxtServerInit({ // nuxtServerInit是nuxt的生命周期，具体看第4章
      commit
    }, { req, app }) {
      const {
        status,
        data: {
          province,
          city
        }
      } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition', status === 200 ? {
        city,
        province
      } : {
        city: '',
        province: ''
      })
    }
  }
}) 

export default store
 