<template>
  <article v-title="$t('user.login.title')">
    <!-- <img class="banner" src="/static/images/user/banner.png" /> -->
    <div class="banner">
      <div class="title">
        <img src="/static/img/user/cute.svg" />
        <h1>萌娘条漫</h1>
      </div>
    </div>

    <div class="form-container">
      <el-form class="form" ref="form" :model="form">
        <el-form-item class="first">
          <el-input v-model="form.account" :placeholder="$t('user.login.accountPlaceholder')"></el-input>

          <div class="title circle">
            <h2>{{ $t('user.login.title') }}</h2>
            <img src="/static/img/user/circle.svg" />
          </div>
          <img class="title oh" src="/static/img/user/oh.svg" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-input v-model="form.account" :placeholder="$t('user.login.passwordPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="form-action">
            <el-checkbox v-model="checked">{{ $t('user.login.remember') }}</el-checkbox>
            <router-link class="a-forget" to="/home/index">忘记密码？</router-link>
          </div>
          <el-button class="btn-login" type="primary" @click="onSubmit">{{ $t('user.login.login') }}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <foot-bar class="footbar"></foot-bar>
  </article>
</template>

<script>
import { FootBar } from '@/components/global'
export default {
  components: {
    FootBar
  },
  data () {
    return {
      form: {
        account: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: fzxs12;
  src: url('/static/font/fzxs12.ttf');
}

article {
  background-color: #f6fbf7;
  height: 100%;
}
.banner {
  width: 100%;
  background-color: #fff;
  box-shadow: 1px 0 12px #999;
  padding: 0 10px;
  box-sizing: border-box;
  height: 150px;
  background: url(/static/img/user/banner.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;

  .title {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    img {
      height: 110px;
      display: inline-block;
    }

    h1 {
      display: inline-block;
      padding-left: 15px;
      margin: 0;
      font-weight: normal;
    }
  }
}
.form-container {
  padding-top: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 350px;

    .first {
      position: relative;
      padding-top: 100px;
      .title {
        &.oh {
          height: 100px;
          position: absolute;
          top: -100px;
          right: 0;
        }
        &.circle {
          position: absolute;
          top: -150px;
          right: 100px;

          img {
            height: 90px;
          }
          h2 {
            position: absolute;
            top: 0px;
            width: 120px;
            text-align: center;
            font-family: fzxs12;
            font-weight: normal;
            font-size: 26px;
            margin-top: 19px;
            color: #9B9B9B;
          }
        }
      }
    }
  }
}
.btn-login {
  display: block;
  width: 100%;
}
.form-action {
  margin: 5px 0;
}
.a-forget {
  color: #2D84E9;
  text-decoration: none;
  float: right;
}
.footbar {
  margin-top: 100px;
}
</style>
