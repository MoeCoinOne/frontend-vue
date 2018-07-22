<template>
  <article v-title="$t('user.confirmMail.title')" v-loading="loading">
    <nav-bar></nav-bar>
    <div class="container">
      <h1>{{ $t('user.confirmMail.title') }}</h1>
      <p>{{ $t('user.confirmMail.withoutReceived') }}</p>
      <p>{{ $t('user.confirmMail.mailSended') }}</p>

      <div class="confirm">
        <p>{{ $t('user.confirmMail.pleaseInput') }}</p>

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
      loading: false,
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
      this.loading = true
      this.$request.post({
        name: 'user.confirmMail',
        body: {
          email: this.$route.query.email,
          validationCode: code
        }
      }).then(response => {
        if (response.body.success) {
          this.$message({
            showClose: true,
            message: this.$t('user.confirmMail.success'),
            type: 'success'
          })
          this.$router.replace('/user/login')
        } else {
          this.setError()
        }
      }).catch(error => {
        this.setError(error)
      }).finally(() => {
        this.loading = false
      })
    },
    setError () {
      this.codeError = true
      this.$message({
        showClose: true,
        message: this.$t('error.CONFIRM_MAIL_CODE_INVALID'),
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
