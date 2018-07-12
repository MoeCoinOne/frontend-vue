<template>
  <div class="moe-navbar">
    <div class="container">
      <h1 class="moe-navbar-item moe-navbar-title" @click="$router.push('/')">
        <img class="moe-navbar-logo" src="/static/img/logo.png">
        <span>{{ $t('site.name') }}</span>
      </h1>
      <ul class="moe-navbar-item moe-navbar-link">
        <li><router-link to="/home/explore" exact>{{ $t('site.navbar.explore') }}</router-link></li>
        <li><a href="https://moecoin.one/">{{ $t('site.navbar.about') }}</a></li>
        <!-- <li><router-link to="/about">{{ $t('site.navbar.about') }}</router-link></li> -->
      </ul>
      <ul class="moe-navbar-item moe-navbar-link moe-navbar-action clearfix">
        <li><router-link :to="{ name: 'UserLogin' }" exact>{{ $t('site.navbar.login') }}</router-link></li>
        <li><router-link :to="{ name: 'UserRegister' }">{{ $t('site.navbar.register') }}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

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
</style>
