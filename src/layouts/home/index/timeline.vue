<template>
  <article>
    <nav-bar></nav-bar>
    <el-row class="row">
      <el-col :span="24">
        <timeline class="timeline"></timeline>
      </el-col>
      <el-col :span="0" class="aside-box">
      </el-col>
    </el-row>
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
.aside-box {
  padding-left: 20px;
}
@media screen and (min-width: 1100px) {
  .row {
    width: 1100px;
    margin: 0 auto;
  }
}
</style>
