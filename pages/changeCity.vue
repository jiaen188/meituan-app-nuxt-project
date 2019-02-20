<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">2</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">3</el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
export default {
  components: {
    iSelect
  }
}
</script>

<style lang="css">
  
</style>
