<template>
  <div class="moe-navbar">
    <div class="container">
      <h1 class="moe-navbar-item moe-navbar-title" @click="$router.push('/')">
        <img class="moe-navbar-logo" src="/static/img/logo.png">
        <span>{{ $t('site.name') }}</span>
      </h1>
      <ul class="moe-navbar-item moe-navbar-link">
        <li><router-link to="/home/index" exact>{{ $t('site.navbar.home') }}</router-link></li>
        <li><router-link to="/home/explore" exact>{{ $t('site.navbar.explore') }}</router-link></li>
        <li><a href="https://moecoin.one/">{{ $t('site.navbar.about') }}</a></li>
        <!-- <li><router-link to="/about">{{ $t('site.navbar.about') }}</router-link></li> -->
      </ul>
      <ul class="moe-navbar-item moe-navbar-link moe-navbar-action clearfix">
        <li v-if="notLogin"><router-link :to="{ name: 'UserLogin' }" exact>{{ $t('site.navbar.login') }}</router-link></li>
        <li v-if="notLogin"><router-link :to="{ name: 'UserRegister' }">{{ $t('site.navbar.register') }}</router-link></li>
        <li v-if="isLogin" style="width: 100px">
          <el-dropdown trigger="click">
            <span v-if="nickname" class="el-dropdown-link moe-nav-user">
              {{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <span v-else class="el-dropdown-link">
              <i class="el-icon-loading"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push('/account/home')"><i class="el-icon-news el-icon--left"></i>我的主页</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push('/account/setting')"><i class="el-icon-setting el-icon--left"></i>账户设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided><i class="el-icon-circle-close-outline el-icon--left"></i>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.getUserInfo()
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken,
      nickname: state => state.user.nickname
    }),
    isLogin () {
      return !this.notLogin
    },
    notLogin () {
      return !this.accessToken
    }
  },
  methods: {
    logout () {
      this.$store.commit('clearUserToken')
      this.$router.replace({ name: 'UserLogin' })
    },
    getUserInfo () {
      // TODO: 处理当前用户信息
      if (this.isLogin) {
        this.$request.get({
          name: 'account.userinfo',
          config: {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        }).then(response => {
          this.$store.commit('setUserInfo', {
            uuid: response.body.data.uuid,
            nickname: response.body.data.nickname,
            uniqueName: response.body.data.unique_name
          })
        }).catch(error => {
          console.log(error)
          this.$message.error('登录状态已过期')
          this.$store.commit('clearUserToken')
          this.$router.push('/user/login')
        })
      }
    }
  },
  watch: {
    accessToken (newValue) {
      if (this.isLogin) {
        this.getUserInfo()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
// 标题栏
.moe-navbar {
  background-color: #fff;
  height: 80px;
  color: black;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;
  display: block;
  box-sizing: border-box;
  border-bottom: 1px #f0f0f0 solid;

  .container {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto
  }
}

.moe-navbar-logo {
  height: 33px;
  vertical-align: middle;
}
.moe-navbar-item {
  height: 100%;
  line-height: 80px;
  padding: 0;
  margin: 0;

  &.moe-navbar-title {
    float: left;
    font-weight: normal;
    transition: background-color .3s;
    cursor: pointer;
    padding: 0 15px;
  }

  &.moe-navbar-link {
    li {
      margin: 0;
      float: left;
      list-style: none;
      position: relative;
      cursor: pointer;
      margin-left: 20px;
      width: 72px;

      a {
        font-size: 16px;
        position: relative;
        text-decoration: none;
        color: black;
        display: block;
        padding: 0 20px;
        height: 75px;
        border-bottom: 5px solid transparent;
        transition: border-color .3s,background-color .3s,color .3s, opacity .3s;
        opacity: .7;

        &.active, &:hover, &.router-link-active {
          opacity: 1;
          border-bottom: 5px solid #ea6f5a;
        }
      }
    }
  }
}
.moe-navbar-action {
  float: right;
  &.moe-navbar-link {
    li {
      margin-left: 10px;
      width: 50px;
      a {
        border-bottom: 0;
        padding: 0 5px;
        text-align: center;
        &.active, &:hover, &.router-link-active {
          color: @primaryColor;
          border-bottom: 0;
        }
        &.router-link-active {
          font-weight: bold;
        }
      }
    }
  }
}
.moe-nav-user {
  padding: 30px 0;
  font-size: 16px;
  &:hover {
    color: @primaryColor;
  }
}
</style>
