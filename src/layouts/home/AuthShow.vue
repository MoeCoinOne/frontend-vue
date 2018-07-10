<template>
<div>
  <header-normal></header-normal>
  <div class="info-wrapper">
    <div class="info-container">
      <div class="info-inner">
        <div class="line1 clearfix">
          <img src="/static/img/person/tuosai.svg" class="author-avatar" />
          <div class="author-basic">
            <div class="author-id">创作者 ID</div>
            <div class="author-desc">个人简介</div>
          </div>
          <div class="right-area">
            <span class="follow-title">关注</span>
            <span class="follow-num">1</span>
            <span class="subscribe-title">订阅数</span>
            <span class="subscribe-num">10</span>
          </div>
        </div>
      </div>
      <div style="height: 500px;">
         下面的内容
      </div>
    </div>
  </div>
</div>
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

        .author-avatar {
          float: left;
          width: 100px;
          height: 100px;
        }

        .author-basic {
          float: left;
          margin-left: 25px;
          padding-top: 10px;
          line-height: 45px;
        }

        .right-area {
          position: absolute;
          bottom: 30px;
          right: 0;

          .follow-num, .subscribe-num {
            color: #999;
          }

          .subscribe-title {
            margin-left: 2em;
          }
        }
      }
    }
  }
}
</style>

<script>
import { HeaderNormal } from '@/components/global'
export default {
  components: {
    HeaderNormal
  }
}
</script>
