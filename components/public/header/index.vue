<template>
  <div class="m-header">
    <el-row style="height: auto;">
      <el-col>
        <top-bar />
      </el-col>
      <el-col>
        <search-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import topBar from './topbar.vue'
import searchBar from './searchbar.vue'

export default {
  components: {
    topBar,
    searchBar
  }
}
</script>

<style lang="scss">
@import '@/assets/css/public/header/index.scss';
.m-header {
  background: #fff;
}
</style>
