<template>
  <div class="moe-navbar">
    <div class="container">
      <h1 class="moe-navbar-item moe-navbar-title" @click="$router.push('/')">
        <!-- <img class="moe-navbar-logo" src="/static/images/logo.png"> -->
        <span>{{ $t('site.name') }}</span>
      </h1>
      <ul class="moe-navbar-item moe-navbar-link">
        <li><router-link to="/" exact>{{ $t('site.navbar.home') }}</router-link></li>
        <li><router-link to="/about">{{ $t('site.navbar.about') }}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
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
  border-bottom: 1px #f0f0f0 solid;
  box-shadow: 1px 0 10px #bbb;

  .container {
    width: 1140px;
    padding: 0 30px;
    margin: 0 auto
  }
}

.moe-navbar-logo {
  height: 30px;
  vertical-align: sub;
}
.moe-navbar-item {
  height: 100%;
  line-height: 80px;
  padding: 0;
  margin: 0;

  &.moe-navbar-title {
    float: left;
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
</style>
