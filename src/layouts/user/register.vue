<template>
  <article v-title="$t('user.register.title')" v-loading="loading">
    <nav-bar></nav-bar>

    <div class="form-container">
      <el-form class="form" ref="form" :model="form" :rules="rules" status-icon>
        <el-form-item class="first" prop="nickname">
          <el-input v-model="form.nickname" :placeholder="$t('user.register.nicknamePlaceholder')"></el-input>

          <div class="title circle">
            <h2>{{ $t('user.register.title') }}</h2>
            <img src="/static/img/user/circle.png" />
          </div>
          <img class="title oh" src="/static/img/user/oh.png" />
        </el-form-item>
        <el-form-item prop="mail">
          <el-input v-model="form.mail" :placeholder="$t('user.register.mailPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" :placeholder="$t('user.register.passwordPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0" prop="repeatPassword">
          <el-input type="password" v-model="form.repeatPassword" :placeholder="$t('user.register.repeatPasswordPlaceholder')"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="form-action">
            <el-checkbox v-model="allowTerm">
              {{ $t('user.register.term.text') }}<router-link class="link" to="/home/index">{{ $t('user.register.term.userTerm') }}</router-link>{{ $t('user.register.term.and') }}<router-link class="link" to="/home/index">{{ $t('user.register.term.accountTerm') }}</router-link>
            </el-checkbox>
          </div>
          <el-button class="btn-login" type="primary" @click="onSubmit" :disabled="!allowTerm">{{ $t('user.register.submit') }}</el-button>
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
        mail: '',
        nickname: 'TestUser',
        password: '',
        repeatPassword: ''
      },
      rules: {
        nickname: [{
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error(this.$t('error.REGISTER_NICKNAME_EMPTY')))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        mail: [{
          validator: (rule, value, callback) => {
            if (/^(\w-*\.*\+*)+@(\w-?)+(\.\w{2,})+$/.test(value) === false) {
              callback(new Error(this.$t('error.REGISTER_MAIL_INVALID')))
            } else {
              this.$request.get({
                name: 'user.checkMail',
                params: {
                  email: value
                }
              }).then(response => {
                // TODO: 校验邮箱正常
                console.log(response)
                callback()
              }).catch(error => {
                // TODO: 解决异常
                callback()
                console.log(error)
              })
            }
          },
          trigger: 'blur'
        }],
        password: [
          { required: true, message: this.$t('error.REGISTER_PASSWORD_INVALID'), trigger: 'blur' },
          { min: 8, max: 16, message: this.$t('error.REGISTER_PASSWORD_LENGTH_INVALID'), trigger: 'blur' }
        ],
        repeatPassword: [{
          validator: (rule, value, callback) => {
            if (value !== this.form.password) {
              callback(new Error(this.$t('error.REGISTER_REPEAT_PASSWORD_INVALID')))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      },
      allowTerm: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$request.post({
            name: 'user.register',
            body: {
              nickname: this.form.nickname,
              email: this.form.mail,
              password: this.form.password
            }
          }).then(response => {
            this.$router.push({
              name: 'UserConfirmMail',
              query: {
                email: this.form.mail
              }
            })
          }).catch(error => {
            if (typeof error.body.err_message === 'object') {
            } else if (typeof error.body.err_message === 'string') {
              switch (error.body.err_message) {
                case 'Password did not conform with policy: Password must have lowercase characters':
                  this.$message.error(this.$t('error.REGISTER_PASSWORD_NUMERIC_INVALID'))
                  break
                case 'Password did not conform with policy: Password must have numeric characters':
                  this.$message.error(this.$t('error.REGISTER_PASSWORD_NUMERIC_INVALID'))
                  break
                default:
                  this.$message.error(error.body.err_message)
              }
            }
          }).finally(() => {
            this.loading = false
          })
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
.link {
  color: #2D84E9;
  text-decoration: none;
}
.footbar {
  margin-top: 100px;
}
.mobile-form {
  display: flex;
  flex-direction: row;

  .select {
    width: 120px;
  }
  .input {
    padding-left: 12px;
    flex: 1;
  }
}
</style>
