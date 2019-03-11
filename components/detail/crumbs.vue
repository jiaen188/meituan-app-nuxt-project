<template>
  <div class="m-crumbs">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">{{$store.state.geo.position.city.length ? $store.state.geo.position.city.replace('市', '') : '杭州' }}美团</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ paht: '/' }">{{$store.state.geo.position.city.length ? $store.state.geo.position.city.replace('市', '') : '杭州' }}{{ type }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ paht: '/' }">
        <a href="/">{{$store.state.geo.position.city.length ? $store.state.geo.position.city.replace('市', '') : '杭州' }}{{ decodeURIComponent(keyword) }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
