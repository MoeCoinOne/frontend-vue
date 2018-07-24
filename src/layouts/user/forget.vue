<template>
  <article v-title="$t('user.forget.title')">
    <nav-bar></nav-bar>

    <div class="form-container">
      <el-form class="form" ref="form" :model="form">
        <el-form-item class="first">
          <el-input v-model="form.account" :placeholder="$t('user.forget.accountPlaceholder')"></el-input>

          <div class="title circle">
            <h2>{{ $t('user.forget.title') }}</h2>
            <img src="/static/img/user/circle.png" />
          </div>
          <img class="title oh" src="/static/img/user/oh.png" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.authCode" :placeholder="$t('user.forget.authCodePlaceholder')">
            <el-button slot="append" type="primary" @click="sendCode">{{ $t('user.register.getAuthCode') }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="form.password" :placeholder="$t('user.forget.passwordPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="submit">{{ $t('user.forget.submit') }}</el-button>
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
      form: {
        account: '',
        authCode: '',
        password: ''
      }
    }
  },
  methods: {
    sendCode () {
      this.$request.post({
        name: 'user.sendForgetCode',
        body: {
          email: this.form.account
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    submit () {
      this.$request.post({
        name: 'user.confirmForget',
        body: {
          email: this.form.account,
          validationCode: this.form.authCode,
          password: this.form.password
        }
      }).then(response => {
        this.$message({
          showClose: true,
          message: this.$t('user.confirmMail.success'),
          type: 'success'
        })
        this.$router.replace('/user/login')
      }).catch(error => {
        console.log(error)
        this.$message.error('验证码错误~')
        // TODO: 忘记密码error处理与计时
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
