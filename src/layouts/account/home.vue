<template>
  <article v-title="$t('user.index.title')">
    <nav-bar></nav-bar>

    <section class="banner">
      <div class="user">
        <img class="avatar" :src="user.avatar" />
        <div class="info">
          <h1>孟二千 <small>一个写代码的艺术家</small></h1>
          <div class="item">
            <span class="title">订阅</span>
            <span class="value">10</span>
          </div>
          <div class="item">
            <span class="title">关注</span>
            <span class="value">5</span>
          </div>
        </div>
      </div>
    </section>

    <section class="menu">
      <el-menu :default-active="$route.name" class="el-menu" mode="horizontal" @select="onMenuSelect">
        <el-menu-item index="AccountHomeIndex">主页</el-menu-item>
        <el-menu-item index="AccountHomeDynamic">动态</el-menu-item>
      </el-menu>
    </section>

    <router-view class="view"></router-view>
  </article>
</template>

<script>
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar
  },
  data () {
    return {
      user: {
        avatar: '/static/img/home/user-avatar.jpg'
      }
    }
  },
  mounted () {
    console.log(this.$route)
  },
  methods: {
    onMenuSelect (index) {
      this.$router.push({ name: index })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/style/less/global.less";
@primaryColor: #ea6f5a;
article {
  background-color: #f8f8f8;
  min-height: 100%;
}
.banner {
  width: 100%;
  box-shadow: 1px 0 5px #ccc;
  background-color: #fff;
  .user {
    width: 1100px;
    margin: 0 auto;
    padding: 20px 0;

    .avatar {
      display: inline-block;
      border-radius: 5px;
      border: 1px solid #dfdfdf;
      height: 100px;
      width: 100px;
    }
    .info {
      display: inline-block;
      margin-left: 15px;
      margin-top: 6px;
      position: absolute;

      h1, p {
        margin: 0;
        padding: 0;
      }
      h1 {
        font-size: 26px;
        margin-bottom: 10px;
        small {
          font-weight: normal;
          font-size: 15px;
        }
      }
      .item {
        font-size: 15px;
        margin-top: 5px;
        .title {
          color: #666;
        }
        .value {
          color: @primaryColor;
          font-weight: bold;
        }
      }
    }
  }
}
.menu {
  width: 1100px;
  margin: 0 auto;
  margin-top: 30px;
  box-shadow: 1px 0 2px #eee;
  overflow: hidden;
  border-radius: 3px;
  .el-menu {
    padding: 0 20px;
  }
}
.view {
  width: 1100px;
  margin: 0 auto;
}
</style>
