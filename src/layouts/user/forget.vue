<template>
  <article v-title="$t('user.forget.title')">
    <nav-bar></nav-bar>

    <div class="form-container">
      <el-form class="form" ref="form" :model="form" :rules="rules">
        <el-form-item class="first" prop="account">
          <el-input v-model="form.account" :placeholder="$t('user.forget.accountPlaceholder')"></el-input>

          <div class="title circle">
            <h2>{{ $t('user.forget.title') }}</h2>
            <img src="/static/img/user/circle.png" />
          </div>
          <img class="title oh" src="/static/img/user/oh.png" />
        </el-form-item>
        <el-form-item prop="authCode">
          <el-input v-model="form.authCode" :placeholder="$t('user.forget.authCodePlaceholder')">
            <el-button v-if="codeSeconds" slot="append" :disabled="true" >{{ codeSeconds }}s</el-button>
            <el-button v-else :loading="codeSending" slot="append" @click="sendCode">{{ $t('user.register.getAuthCode') }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" :placeholder="$t('user.forget.passwordPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" :loading="loading" type="primary" @click="onSubmit">{{ $t('user.forget.submit') }}</el-button>
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
      codeSeconds: 0,
      codeSending: false,
      loading: false,
      form: {
        account: '',
        authCode: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: this.$t('error.FORGET_MAIL_EMPTY'), trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: this.$t('error.FORGET_CODE_EMPTY'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('error.FORGET_PASSWORD_LENGTH_INVALID'), trigger: 'blur' },
          { min: 8, message: this.$t('error.FORGET_PASSWORD_LENGTH_INVALID'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendCode () {
      this.codeSending = true
      this.$request.post({
        name: 'user.sendForgetCode',
        body: {
          email: this.form.account
        }
      }).then(response => {
        this.startTiming()
      }).catch(error => {
        switch (error.body.err_message) {
          case 'Username/client id combination not found.':
            this.$message.error(this.$t('error.FORGET_MAIL_NOT_EXIST'))
            break
          default:
            this.$message.error(this.$t('error.UNKOWN'))
            break
        }
      }).finally(() => {
        this.codeSending = false
      })
    },
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submit()
        }
      })
    },
    submit () {
      this.loading = true
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
        switch (error.body.err_message) {
          case 'Username/client id combination not found.':
            this.$message.error(this.$t('error.FORGET_MAIL_NOT_EXIST'))
            break
          case 'Password does not conform to policy: Password must have lowercase characters':
            this.$message.error(this.$t('error.REGISTER_PASSWORD_LOWERCASE_INVALID'))
            break
          case 'Password does not conform to policy: Password must have numeric characters':
            this.$message.error(this.$t('error.REGISTER_PASSWORD_NUMERIC_INVALID'))
            break
          case 'Invalid verification code provided, please try again.':
            this.$message.error(this.$t('error.FORGET_CODE_INVALID'))
            break
          default:
            this.$message.error(this.$t('error.UNKOWN'))
            break
        }
      }).finally(() => {
        this.loading = false
      })
    },
    startTiming () {
      this.codeSeconds = 60
      let id = setInterval(() => {
        this.codeSeconds--
        if (this.codeSeconds <= 0) {
          clearInterval(id)
        }
      }, 1000)
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
