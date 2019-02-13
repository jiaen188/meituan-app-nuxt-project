<template>
  <div class="" />
</template>

<script>
export default {
  layout: 'blank',
  middleware: async (ctx) => { // 因为这个退出页面，没有需要用户的任何操作就要退出，所以放在中间件执行
    let { status, data } = await ctx.$axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>
