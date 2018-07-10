<template>
  <article v-title="$t('home.index.title')">
    <el-button type="primary">123</el-button>
  </article>
</template>

<script>
export default {
  mounted () {
    // 目前会error 因为 Request Config 中的域名是 example.com
    this.$request.post({
      name: 'user.login',
      body: {
        test: 'hello world'
      }
    }).then(response => {
      console.log('ok', response)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="less" scoped>

</style>
