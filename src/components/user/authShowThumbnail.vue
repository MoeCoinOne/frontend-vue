<template>
<div class="thum-item">
  <div class="img-c">
      <img src="" class="img" />
  </div>
  <div class="time" >6月13日 17:00</div>
  <div class="subscribe-line">
      <img src="/static/img/user/heart.svg" class="subscribe-img" />
      <span class="subscribe-text" >{{$t('user.authShow.feeSubscribe')}}</span>
  </div>
</div>
</template>
<style lang="less" scoped>
.thum-item {
    .img-c {
        width: 300px;
        height: 300px;
        background: #FFF;
        border: 1px solid #B7C6CD;
        box-shadow: 3px 5px 15px 0 #D1D1D1;
        border-radius: 4px;
    }

    .time {
        color: #4a4a4a;
        font-size: 20px;
        line-height: 2em;
    }

    .subscribe-line {
        padding: 10px 0;

        .subscribe-img {
            width: 32px;
            height: 32px;
            vertical-align: middle;
        }

        .subscribe-text {
            font-size: 20px;
            color: #4a4a4a;
            vertical-align: middle;
            margin-left: 0.7em;
        }
    }
}
</style>
