<template>
  <div class="page">
    <introduce v-if="notLogin"></introduce>
    <timeline v-else></timeline>
  </div>
</template>

<script>
import Introduce from '@/layouts/home/index/introduce'
import Timeline from '@/layouts/home/index/timeline'
import { mapState } from 'vuex'
export default {
  components: {
    Introduce,
    Timeline
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    }),
    notLogin () {
      return !this.accessToken
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
}
</style>
