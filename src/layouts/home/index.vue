<template>
  <article v-title="$t('home.index.title')">
    <!-- <nav-bar></nav-bar> -->
    <banner></banner>
  </article>
</template>

<script>
import Banner from '@/components/home/Banner'
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar,
    Banner
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
article {
  background-color: #000;
  height: 100%;
}
</style>
