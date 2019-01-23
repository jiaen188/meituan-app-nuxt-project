<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd 
        v-for="(item, i) in menu"
        :key="i">
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [{
        type: 'food',
        name: '美食'
      }, {
        type: 'takeout',
        name: '外卖'
      }, {
        type: 'hotel',
        name: '酒店'
      }, {
        type: 'food',
        name: '美食'
      }, {
        type: 'takeout',
        name: '外卖'
      }, {
        type: 'hotel',
        name: '酒店'
      }]
    }
  },
}
</script>

<style lang="scss">
.m-menu {
  z-index: 99999999;
}
</style>

