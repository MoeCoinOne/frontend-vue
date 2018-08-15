<template>
  <section>
    <timeline class="timeline" :user-id="$parent.userinfo.uuid"></timeline>
  </section>
</template>

<script>
import { Timeline } from '@/components/global'
export default {
  components: {
    Timeline
  }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 1100px) {
  .timeline {
    width: 1100px;
    margin: 0 auto;
  }
}
section {
  padding-top: 20px;
}
</style>
