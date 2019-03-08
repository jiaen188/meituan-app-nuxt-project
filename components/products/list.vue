<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name, item.active ? 's-nav-active' : '']"
        @click="navSelect(item)">
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <Item
        v-for="(item, index) in renderList"
        :key="index"
        :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'

export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }, 
      ]
    }
  },
  computed: {
    renderList() {
      return this.list.map(item => ({ ...item }))
    }
  },
  async asyncData({ app }) {
    let { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect(item) {
      this.nav.find(item => item.active).active = false
      item.active = true
      if (item.txt === '智能排序') {
        console.log('智能排序')
      } else if (item.txt === '价格最低') {
        this.renderList.sort((a, b) => a.price - b.price)
      } else if (item.txt === '人气最高') {
        this.renderList.sort((a, b) => b.comment - a.comment)
      } else {
        this.renderList.sort((a, b) => b.rate - a.rate)
      }
    }
  }
}
</script>

<style>

</style>
