<template>
  <article v-title="{ title: $t('home.index.title'), showSiteName: false }">
    <nav-bar style="border: 0"></nav-bar>
    <section class="banner">
      <div class="title">
        <h2>创作者支援平台</h2>
        <div class="desc">安可萌&nbsp;&nbsp;<span>为各个领域的创作者提供资金和作品分发平台</span></div>
        <div class="btn-group">
          <div class="btn" @click="onLearnMoreClick">开始安可 More</div>
        </div>
      </div>
    </section>
    <section class="intro">
      <div class="box">
        <div class="text">
          <h2>发展你的创作世界</h2>
          <p>使用安可萌可以帮助您构建持续的收入来源<br>独特的加密分发系统可保护您的作品版权</p>
        </div>

        <img src="/static/img/home/chan-chest.jpg" />
      </div>
    </section>
    <section class="advantage">
      <h2 class="title">我们的优势</h2>
      <div class="list">
        <div class="box" v-for="(advantage, aIndex) in advantages" :key="aIndex">
          <div class="advantage-item">
            <h3><i class="iconfont" :class="[advantage.icon]"></i> {{ advantage.title }}</h3>
            <p>{{ advantage.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <footer>
      © 2018 {{ $t('site.name') }}
    </footer>
  </article>
</template>

<script>
import 'animate.css/animate.min.css'
import { NavBar } from '@/components/global'
import { mapState } from 'vuex'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      advantages: [{
        icon: 'i-qianbao',
        title: '订阅资金全额每月支付',
        desc: '0平台费，仅扣除支付宝微信等通道费用'
      }, {
        icon: 'i-xin',
        title: '粉丝专属内容',
        desc: '订阅自己喜爱的创作者，获取只属于你的专属内容'
      }, {
        icon: 'i-dunpai',
        title: '抵抗盗版的加密分发系统',
        desc: '开发中，区块链加密分发收取5%费用'
      }, {
        icon: 'i-ka',
        title: '全球支付',
        desc: '法定货币、加密货币 多种选择 即时兑换'
      }]
    }
  },
  mounted () {
  },
  methods: {
    onLearnMoreClick () {
      if (this.isLogin) {
        this.$router.push('/account/home')
      } else {
        this.$router.push('/user/register')
      }
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    }),
    isLogin () {
      return !this.notLogin
    },
    notLogin () {
      return !this.accessToken
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/style/less/global.less";
article {
  min-height: 100%;
  background: #f5f5f5;
}
.banner {
  width: 100%;
  height: calc(~"40vh");
  background-attachment: scroll, fixed;
  background-color: #666;
  background-image: url(/static/img/home/overlay.png), url(/static/img/home/banner/6.jpg);
  background-position: top left, center center;
  background-repeat: repeat, no-repeat;
  background-size: auto, cover;
  color: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: calc(~"40vh");
    flex-direction: column;
    width: 100%;

    img {
      margin-bottom: 1.5rem;
      width: 100px;
    }
    h2 {
      margin: 0;
      font-size: 2.7rem;
      font-weight: normal;
      margin-bottom: 2rem;
      font-weight: 300;
    }
    .desc {
      font-size: 1.3rem;
      margin-bottom: 3rem;
      font-weight: 300;
      color: #f1f1f1;
    }
    .btn-group {
      .btn {
        color: #fff;
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0);
        width: 185px;
        padding: 16px 0;
        cursor: pointer;
        line-height: 22px;
        &:hover {
          background-color: rgba(255, 255, 255, .2);
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    height: 60vh;
    .title {
      height: 60vh;
      h2 {
        font-size: 2rem;
      }
      .desc {
        font-size: 1rem;
        width: 60%;
        margin-bottom: 1.5rem;
      }
      .btn-group {
        .btn {
          width: 150px;
          line-height: 10px;
          font-size: 1rem;
        }
      }
    }
  }
}
.intro {
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
  .box {
    padding: 64px;
    padding-top: 85px;
    text-align: center;
    width: 60em;
    margin: 0 auto;
    position: relative;
    .text {
      width: calc(~"100% - 400px");
      h2 {
        font-weight: 300;
        margin-top: 0;
        margin-bottom: 55px;
        font-weight: 300;
        font-size: 2.5rem;
      }
      p {
        border-top: solid 2px #e5e5e5;
        margin-top: 45px;
        padding-top: 45px;
      }
    }
    img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 450px;
    }
  }
  @media only screen and (max-width: 1200px) {
    .box {
      width: 100%;
      box-sizing: border-box;
      .text {
        width: 100%;
        h2 {
          font-size: 1.5rem;
          margin-bottom: 36px;
        }
        p {
          font-size: 0.8rem;
          margin-top: 0;
        }
      }
      img {
        display: none;
      }
    }
  }
}
.advantage {
  background-color: #fafafa;
  background-image: url(/static/img/home/bg2.png);
  color: #d3d4e4;
  width: 100%;
  padding-bottom: 100px;
  box-shadow: inset 0px 1px 0px 0px rgba(0, 0, 0, 0.05), inset 0px 2px 3px 0px rgba(0, 0, 0, 0.1);

  .title {
    text-align: center;
    margin: 0;
    padding: 40px 0;
    padding-bottom: 20px;
    font-size: 35px;
    font-weight: 300;
    color: #000;
  }
  .list {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    .box {
      width: 50%;
      max-width: 50%;
      display: inline-block;
      box-sizing: border-box;
      padding: 25px 0 0 25px;
      .advantage-item {
        background: #fff;
        // box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
        border-radius: 3px;
        transition: all .2s;
        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.20);
        }

        padding: 3em 3em 2em 4em;
        h3 {
          margin: 0;
          margin: 0 0 .8em 0;
          font-size: 24px;
          line-height: 1.75em;
          color: #EA8A95;
        }
        p {
          margin: 0 0 2em 0;
          color: #888;
        }
      }
    }
  }
  @media only screen and (max-width: 1100px) {
    padding-bottom: 20px;
    .title {
      font-size: 1.8rem;
    }
    .list {
      width: 100%;
      .box {
        width: 100%;
        max-width: none;
        padding: 10px 10px 0 10px;
        .advantage-item {
          padding: 2em 2em 0.3em 2em;
          h3 {
            font-size: 1.2rem;
            margin: 0 0 0.5em 0;
          }
        }
      }
    }
  }
}
footer {
  width: 100%;
  height: 150px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  background-color: #303030;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  @media only screen and (max-width: 600px) {
    height: 50px;
  }
}
.i-xin {
  &::before {
    content: '\e623';
    font-style: normal;
  }
}
.i-qianbao {
  &::before {
    content: '\e602';
    font-style: normal;
  }
}
.i-dunpai {
  &::before {
    content: '\e65c';
    font-style: normal;
  }
}
.i-ka {
  &::before {
    content: '\e608';
    font-style: normal;
  }
}
.i-shubiao {
  &::before {
    content: '\e781';
    font-style: normal;
  }
}
</style>
