<template>
  <article v-title="$t('user.login.title')" v-loading="loading">
    <!-- <img class="banner" src="/static/images/user/banner.png" /> -->
    <nav-bar></nav-bar>

    <div class="form-container" >
      <el-form class="form" ref="form" :model="form" :rules="rules" status-icon>
        <el-form-item class="first" prop="account">
          <el-input v-model="form.account" :placeholder="$t('user.login.accountPlaceholder')"></el-input>

          <div class="title circle">
            <h2>{{ $t('user.login.title') }}</h2>
            <img src="/static/img/user/circle.png" />
          </div>
          <img class="title oh" src="/static/img/user/oh.png" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0" prop="password">
          <el-input type="password" v-model="form.password" :placeholder="$t('user.login.passwordPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="form-action">
            <el-checkbox v-model="form.remember">{{ $t('user.login.remember') }}</el-checkbox>
            <router-link class="a-forget" to="/user/forget">{{ $t('user.login.forget') }}</router-link>
          </div>
          <el-button class="btn-login" type="primary" @click="onSubmit">{{ $t('user.login.submit') }}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <foot-bar class="footbar"></foot-bar>
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
      loading: false,
      form: {
        account: '',
        password: '',
        remember: true
      },
      rules: {
        account: [{
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error(this.$t('error.LOGIN_ACCOUNT_EMPTY')))
            } else if (/^(\w-*\.*\+*)+@(\w-?)+(\.\w{2,})+$/.test(value) === false) {
              callback(new Error(this.$t('error.LOGIN_ACCOUNT_INVALID')))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        password: [{
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error(this.$t('error.LOGIN_PASSWORD_EMPTY')))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        this.loading = true
        if (valid) {
          setTimeout(() => {
            this.loading = false
            this.$store.commit('setUserToken', {
              userToken: '111'
            })
            this.$router.replace({ name: 'HomeExplore' })
          }, 200)
        } else {
          this.loading = false
          return false
        }
      })
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
