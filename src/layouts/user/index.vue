<template>
  <article v-title="$t('user.index.title')">
  <nav-bar></nav-bar>
  <div class="info-wrapper">
    <div class="info-container">
      <div class="info-inner">
        <div class="line1 clearfix">
          <img class="user-avatar" :src="user.avatar" />
          <div class="user-basic">
            <div class="user-id">用户 ID</div>
            <div class="user-desc">个人简介</div>
          </div>
          <div class="right-area">
            <span class="balance-title">{{ $t('user.index.balance') }}</span>
            <span class="balance-title">5</span>
            <span class="follow-title">{{ $t('user.index.follow') }}</span>
            <span class="follow-num">1</span>
            <span class="subscribe-title">{{ $t('user.index.subscribe') }}</span>
            <span class="subscribe-num">5</span>
          </div>
        </div>
        <div class="user-panel">
          <div class="panel-part">
            <img class="panel-icon" src="/static/img/user/home.svg" />
            <span class="panel-title">{{ $t('user.index.mainPage') }}</span>
          </div>
          <div class="panel-part">
            <img class="panel-icon" src="/static/img/user/ring.svg"/>
            <span class="panel-title">{{ $t('user.index.dynamic') }}</span>
          </div>
          <div class="panel-part">
            <img class="panel-icon" src="/static/img/user/shop.svg" />
            <span class="panel-title">{{ $t('user.index.recharge') }}</span>
          </div>
          <div class="panel-part">
            <img class="panel-icon" src="/static/img/user/edit.svg" />
            <span class="panel-title">{{ $t('user.index.setting') }}</span>
          </div>
        </div>
        <div class="comic clearfix">
          <img src="/static/img/home/temp/1a.jpg" class="thumbnail">
          <div class="comic-info">
            <span class="comic-title">{{ $t('user.index.comicTitle') }}</span>
            <div class="comic-count">
              <span class="comic-count-span">{{ $t('user.index.comicViews') }}</span>
              <span class="comic-count-span">{{ $t('user.index.subscription') }}</span>
            </div>
            <span class="comic-update-date">{{ $t('user.index.updateTime') }}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
    <foot-bar class="footbar"></foot-bar>
</article>
</template>
<style lang="less" scoped>
@import "~@/common/style/less/global.less";
@primaryColor: #ea6f5a;
article {
  background-color: #f8f8f8;
  min-height: 100%;
}
.info-wrapper {
  padding-top: 20px;

  .info-container {
    width: 1200px;
    margin: 0 auto;
    background: #F8F8F8;

    .info-inner {
      padding: 0 67px;

      .line1 {

        border-bottom: 2px solid #B7C6CD;
        padding-bottom: 30px;
        position: relative;
        overflow: hidden;
        color: #4a4a4a;

        .user-avatar {
          float: left;
          width: 100px;
          height: 100px;
        }

        .user-basic {
          float: left;
          margin-left: 25px;
          padding-top: 10px;
          line-height: 45px;
        }

        .right-area {
          position: absolute;
          bottom: 30px;
          right: 0;

          .balance-num .follow-num, .subscribe-num {
            color: #999;
          }

        }
      }

      .user-panel {
        padding-top: 10px;
        padding-bottom: 15px;
        display: inline-block;
        vertical-align: middle;
        .panel-part {
          width: 100px;
          display: inline-block;
          .panel-icon {
            width: 33px;
            height: 30px;
            vertical-align: middle;
          }
          .panel-title {
            width: 40px;
            height: 36px;
            font-family: NotoSansHans;
            font-size: 20px;
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            vertical-align: middle;
            color: #4a4a4a;
          }
        }
      }

      .comic {

        width: 600px;
        height: 220px;
        border-radius: 14px;
        background-color: #ffffff;
        position: relative;
        overflow: hidden;

        .thumbnail {
          float: left;
          width: 200px;
          height: 200px;
          border-radius: 12px;
          background-color: #ffffff;
          border: solid 1px #b7c6cd;
          margin: 10px;
        }

        .comic-info {

          float: left;
          margin-left: 25px;
          padding-top: 10px;
          line-height: 45px;

          .comic-title {
            width: 88px;
            height: 22px;
            font-family: NotoSansHans;
            font-size: 22px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: #4a4a4a;
          }

          .comic-count {

            margin: 55px 0px 5px 0px;

            .comic-count-span {
              width: 48px;
              height: 16px;
              font-family: NotoSansHans;
              font-size: 16px;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: normal;
              text-align: center;
              color: #4a4a4a;
              margin: 0px 50px 0px 0px;
            }
          }

          .comic-update-date {
            padding-top: 100px;
            width: 64px;
            height: 16px;
            font-family: NotoSansHans;
            font-size: 16px;
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: center;
            color: #4a4a4a;
          }
        }
      }
    }
  }
}
</style>

<script>
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar
  },
  data () {
    return {
      user: {
        avatar: '/static/img/home/user-avatar.jpg'
      }
    }
  }
}
</script>
