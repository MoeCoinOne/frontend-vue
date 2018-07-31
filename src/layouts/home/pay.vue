<template>
  <article v-title="$t('home.pay.title')" v-loading="loading">
    <nav-bar></nav-bar>
    <section class="container">
      <h1>赞助 {{ creator.nickname }} <small>{{ creator.introduce }}</small></h1>
      <div class="type">
        <div class="name">{{ type.name }}</div>
        <div class="price"><span class="number">{{ type.price }}</span> <span class="cycle">￥/月</span></div>
      </div>
      <div class="period">
        <div class="title">请选择你的订阅时长</div>
        <div class="period-group">
          <el-radio-group v-model="form.period" size="medium">
            <el-radio-button label="1">{{ form.period == 1 ? '1个月' : 1 }}</el-radio-button>
            <el-radio-button label="2">{{ form.period == 2 ? '2个月' : 2 }}</el-radio-button>
            <el-radio-button label="3">{{ form.period == 3 ? '3个月' : 3 }}</el-radio-button>
            <el-radio-button label="6">{{ form.period == 6 ? '6个月' : 6 }}</el-radio-button>
            <el-radio-button label="12">1年</el-radio-button>
            <el-radio-button label="24">2年</el-radio-button>
            <el-radio-button label="36">3年</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="total">
        <div class="title">您需要支付</div>
        <div class="price">￥{{ type.price * form.period }}</div>
      </div>
      <div class="method">
        <div class="title">请选择支付方式</div>
        <div class="group">
          <div
            class="method-item alipay"
            :class="{ active: form.method === 'alipay' }"
            @click="form.method = 'alipay'"
          >
            <i class="iconfont i-alipay"></i>
            <span>支付宝</span>
          </div>
          <div
            class="method-item wechat"
            :class="{ active: form.method === 'wechat' }"
            @click="form.method = 'wechat'"
          >
            <i class="iconfont i-wechat"></i>
            <span>微信支付</span>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <el-button type="warning" @click="subscribe">{{ type.price ? '去支付' : '立即订阅' }}</el-button>
      </div>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar
  },
  data () {
    return {
      loading: false,
      creator: {
        uuid: '',
        nickname: '',
        introduce: ''
      },
      type: {
        id: 0,
        name: '',
        price: 0
      },
      form: {
        period: '1',
        method: 'alipay'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.creator.uuid = to.query.uuid
      vm.creator.nickname = to.query.nickname
      vm.creator.introduce = to.query.introduce

      vm.type.id = to.query.typeId
      vm.type.name = to.query.typeName
      vm.type.price = parseFloat(to.query.typePrice)
    })
  },
  methods: {
    subscribe () {
      if (this.type.price > 0) {
        this.$message.error('暂时无法订阅付费项目~第三方支付申请中~')
        return
      }
      this.loading = true
      let returnUrl = encodeURIComponent('https://baidu.com')
      this.$request.post({
        name: 'subscription.relationship',
        formatUrl: url => `${url}/${this.creator.uuid}?returnUrl=${returnUrl}`,
        body: {
          typeId: parseInt(this.type.id),
          period: parseInt(this.form.period),
          method: this.form.method
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        console.log(response.body)
        this.$message({
          type: 'success',
          message: '订阅成功~'
        })
        this.$router.push('/account/home')
        // window.location.href = response.body.data.paymentUrl
      }).catch(error => {
        console.error(error)
        if (error.body.error === 'CANNOT_SUBSCRIBE_SELF') {
          this.$message.error('不能订阅自己噢~')
        } else {
          this.$message.error(error.body.error)
        }
      }).finally(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    })
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
@import "~@/common/style/less/global.less";
article {
  background-color: #f6f6f6;
  min-height: 100%;
}
.container {
  width: 1100px;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;

  background-color: #fff;
  box-shadow: 0 0 2px 0 #cbd0d8;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px;

  h1 {
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .type {
    background: #f4f5f7;
    padding: 10px;
    width: 400px;
    border-radius: 4px;
    .price {
      margin-top: 5px;
      .number {
        color: @primaryColor;
        margin-bottom: 0;
        font-size: 30px;
      }
    }
  }

  .period {
    padding: 20px 0;
    margin-top: 20px;
    .title {
      color: @primaryColor;
      font-weight: bold;
    }
    .period-group {
      margin-top: 20px;
    }
  }

  .total {
    margin-top: 10px;
    .price {
      color: @primaryColor;
      font-size: 35px;
    }
  }

  .method {
    margin-top: 30px;
    .title {
      color: @primaryColor;
      font-weight: bold;
    }
    .group {
      .method-item {
        cursor: pointer;
        margin: 10px 0;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
        width: 150px;
        padding: 10px;
        font-size: 18px;
        transition: all 0.2s;
        &.alipay.active {
          color: #3AA5F2;
          border: 1px solid #3AA5F2;
          box-shadow: 0px 0px 1px lighten(#3AA5F2, 20%);
        }
        &.wechat.active {
          color: #24AF41;
          border: 1px solid #24AF41;
          box-shadow: 0px 0px 1px lighten(#24AF41, 20%);
        }
        .iconfont {
          margin-left: 5px;
          margin-right: 5px;
        }
      }
    }
  }

  .btn-group {
    padding-top: 20px;
    position: absolute;
    right: 30px;
    bottom: 30px;
    .el-button {
      width: 200px;
      height: 50px;
      font-size: 18px;
    }
  }
}
.i-alipay {
  &::before {
    content: '\e600';
    font-style: normal;
    color: #3AA5F2;
  }
}
.i-wechat {
  &::before {
    content: '\e693';
    font-style: normal;
    color: #24AF41;
  }
}
</style>
