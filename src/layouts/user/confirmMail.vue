<template>
  <article v-title="$t('user.confirmMail.title')">
    <nav-bar></nav-bar>
    <div class="container">
      <h1>验证邮箱</h1>
      <p>一封验证邮件已经发送到了您的邮箱当中。</p>
      <p>如果您没有收到，请您检查垃圾箱或稍后再试。</p>

      <div class="confirm">
        <p>请在下方填写所收到的验证码（使用123123可通过）</p>

        <div class="input-group" :class="{ error: codeError }">
          <input
            v-for="(input, iIndex) in inputs"
            :key="iIndex" ref="codeInput"
            @input="event => onInput(iIndex, event)"
            @keydown="event => onKeydown(iIndex, event)"
            v-model="input.value"
            maxlength="1"
          />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { NavBar } from '@/components/global'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      codeLength: 6,
      codeError: false,
      inputs: []
    }
  },
  mounted () {
    this.initInput()
  },
  methods: {
    initInput () {
      this.inputs = []
      for (let i = 0; i < this.codeLength; i++) {
        this.inputs.push({
          id: i,
          value: ''
        })
      }
      this.$nextTick(() => {
        this.$refs['codeInput'][0].focus()
      })
    },
    onInput (index, event) {
      this.codeError = false
      if (event.data !== null && event.data !== '') {
        if (index <= this.codeLength - 2) {
          this.$refs['codeInput'][index + 1].focus()
        } else {
          let code = this.inputs.map(item => item.value).join('')
          this.submit(code)
        }
      }
    },
    onKeydown (index, event) {
      this.codeError = false
      if (event && event.keyCode === 8) {
        let inputValue = this.$refs['codeInput'][index].value
        if ((inputValue === null || inputValue === '') && index !== 0) {
          this.$refs['codeInput'][index - 1].focus()
        }
      }
    },
    submit (code) {
      if (code !== '123123') {
        this.setError()
      } else {
        this.$store.commit('setUserToken', {
          userToken: '111'
        })
        this.$message({
          showClose: true,
          message: '注册成功~',
          type: 'success'
        })
        this.$router.replace('/account/home')
      }
    },
    setError () {
      this.codeError = true
      this.$message({
        showClose: true,
        message: '验证码不正确~',
        type: 'error'
      })
      this.$nextTick(() => {
        setTimeout(() => {
          for (let input of this.inputs) {
            input.value = ''
          }
          this.$refs['codeInput'][0].focus()
        }, 250)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/style/less/global.less";

.container {
  width: 1100px;
  margin: 0 auto;

  .confirm {
    margin-top: 40px;
    position: relative;
    p {
      color: @primaryRed;
    }
    .input-group {
      position: absolute;
      &.error {
        animation: codeError 0.1s linear;
      }
      // transition: left 1s linear;
      input {
        display: inline-block;
        width: 40px;
        height: 40px;
        font-size: 35px;
        text-align: center;
        border-radius: 5px;
        border: 2px solid #ddd;
        outline: none;
        color: @primaryRed;
        transition: border-color 0.2s;
        margin-right: 10px;

        &:active, &:focus {
          border: 2px solid @primaryRed;
          outline: none;
          caret-color: @primaryRed;
        }
      }
    }
  }
}

@keyframes codeError
{
  0% {
    left: 0px;
  }
  25% {
    left: -30px;
  }
  50% {
    left: 0px;
  }
  75% {
    left: 30px;
  }
  100% {
    left: 0;
  }
}
</style>
