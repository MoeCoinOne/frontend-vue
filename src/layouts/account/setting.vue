<template>
  <article>
    <nav-bar></nav-bar>
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <el-menu
          mode="vertical"
          class="setting-menu"
          :default-active="$route.name"
          text-color="#8590a6"
          active-text-color="#444"
          @select="onMenuSelect"
        >
          <el-menu-item class="setting-menu-item" index="AccountSettingProfile">个人资料</el-menu-item>
          <el-menu-item class="setting-menu-item" index="AccountSettingSubscription">订阅管理</el-menu-item>
          <el-menu-item class="setting-menu-item" index="AccountSettingSafe">账户安全</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view class="view"></router-view>
      </el-main>
    </el-container>
  </article>
</template>

<script>
import { NavBar } from '@/components/global'
export default {
  components: {
    NavBar
  },
  methods: {
    onMenuSelect (index) {
      this.$router.push({ name: index })
    }
  }
}
</script>

<style lang="less" scoped>
article {
  background-color: #f8f8f8;
  min-height: 100%;
}
.container {
  width: 1100px;
  margin: 0 auto;
  margin-top: 10px !important;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 1px 0 2px #eee;
  overflow: hidden;
  border-radius: 5px;
  box-sizing: border-box;

  // .aside {
  // }
  // .main {
  // }
}
.setting-menu {
  height: 100%;
}
.setting-menu-item {
  &.is-active {
    font-weight: bold;
    background-color: #f3fafb;
  }
}
</style>
