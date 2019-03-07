<template>
  <div class="m-crumbs">
    <el-bredcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">{{ $store.state.geo.position.city.length ? $store.state.geo.position.city.replace('市', '') : '杭州' }}美团</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">{{ $store.state.geo.position.city.length ? $store.state.geo.positioin.city.replace('市', '') : '杭州' }}{{ decodeURIComponent(keyword) }}</a>
      </el-breadcrumb-item>
    </el-bredcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
