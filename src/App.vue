<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './common/style/less/global.less';

#app {
  font-family: "HanHei SC", "PingFang SC", "Helvetica Neue", Helvetica, STHeitiSC-Light, "Microsoft YaHei", '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
