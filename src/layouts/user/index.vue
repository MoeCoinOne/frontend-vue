<template>
  <article v-title="$t('user.index.title')">
  <header-normal></header-normal>
  <div class="info-wrapper">
    <div class="info-container">
      <div class="info-inner">
        <div class="line1 clearfix">
          <img src="/static/img/person/tuosai.svg" class="user-avatar" />
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
        <div>
          <img src="/static/img/user/home.svg" />
          <span>{{ $t('user.index.mainPage') }}</span>
          <img src="/static/img/user/ring.svg" />
          <span>{{ $t('user.index.dynamic') }}</span>
          <img src="/static/img/user/shop.svg" />
          <span>{{ $t('user.index.recharge') }}</span>
          <img src="/static/img/user/edit.svg" />
          <span>{{ $t('user.index.setting') }}</span>
        </div>
        <div class="comic clearfix">
          <img src="/static/img/person/tuosai.svg" class="thumbnail">
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
</article>
</template>
<style lang="less" scoped>
@import "~@/common/style/less/global.less";
.info-wrapper {
  background: #F8F8F8 url('/static/img/person/info-bg.png') 0 0 repeat;
  padding-top: 20px;

  .info-container {
    width: 806px;
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

      .comic {

        width: 765px;
        height: 235px;
        border-radius: 14px;
        background-color: #ffffff;
        position: relative;
        overflow: hidden;

        .thumbnail {
          float: left;
          width: 197px;
          height: 197px;
          border-radius: 12px;
          background-color: #ffffff;
          border: solid 1px #b7c6cd;
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
            }
          }

          .comic-update-date {
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
import HeaderNormal from '@/components/user/headerNormal'
export default {
  components: {
    HeaderNormal
  }
}
</script>
