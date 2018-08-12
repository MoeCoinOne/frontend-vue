<template>
  <article>
    <nav-bar></nav-bar>
    <timeline></timeline>
  </article>
</template>

<script>
import { NavBar, Timeline } from '@/components/global'
export default {
  components: {
    NavBar,
    Timeline
  }
}
</script>

<style lang="less" scoped>
article {
  background-color: #f6f6f6;
  min-height: 100%;
}
</style>
