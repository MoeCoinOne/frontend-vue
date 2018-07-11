<template>
  <article v-title="'创作者'">
    <nav-bar></nav-bar>
    <div class="user-header">
      <div class="user-banner"></div>
      <div class="user-info">
        <img class="avatar" src="/static/img/home/user-avatar.jpg" />
        <div class="info">
          <div class="intro">
            <h1>孟二千 <small>一个写代码的艺术家</small></h1>
          </div>
          <div class="action">
            <div class="action-item active">主页</div>
            <div class="action-item">赞助者</div>
          </div>
        </div>
      </div>
    </div>

    <el-container class="body-container">
      <el-aside class="aside-box">
        <el-card class="box-card">
          <div class="number-item">
            <h2 class="number">2,379</h2>
            <h4 class="desc">订阅者</h4>
          </div>
          <div class="number-item">
            <h2 class="number">$7,491</h2>
            <h4 class="desc">月收入</h4>
          </div>
        </el-card>
      </el-aside>
      <el-main class="main-box">
        <el-card class="box-card sponsor">
          <div class="info">
            <h3 class="title">一罐可乐</h3>
            <div class="price">
              <span class="cost">2.00</span>
              <span class="cycle">￥/月</span>
              <span class="count">123 人已赞助</span>
            </div>
            <div class="intro">唉。</div>
          </div>
          <div class="btn-group">
            <el-button type="primary">赞助￥2.00</el-button>
          </div>
        </el-card>
        <el-card class="box-card sponsor">
          <div class="info">
            <h3 class="title">插画</h3>
            <div class="price">
              <span class="cost">500.00</span>
              <span class="cycle">￥/月</span>
              <span class="count">123 人已赞助</span>
            </div>
            <div class="intro">
              不太复杂的，你想要看到的插画。<br/>
              非商用授权，日涂的水准，不适合肉多的同性内容，其他的别违规哟。
            </div>
          </div>
          <div class="btn-group">
            <el-button type="primary">赞助￥500.00</el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>

    <foot-bar class="footbar"></foot-bar>
  </article>
</template>

<script>
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
article {
  background-image: url(/static/img/person/info-bg.png);
  min-height: 100%;
}
.user-header {
  width: 100%;
  box-shadow: 1px 0 10px #aaa;
  background-color: #fff;
  .user-banner {
    width: 100%;
    background-image: url(/static/img/home/user-banner.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 380px;
  }
  .user-info {
    width: 1100px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    .avatar {
      width: 150px;
      height: 150px;
      border: 4px solid #fff;
      border-radius: 5px;
      position: absolute;
      top: -75px;
    }
    .info {
      padding-left: 180px;
      h1 {
        font-size: 26px;
        small {
          font-weight: normal;
          font-size: 18px;
        }
      }
    }
    .action {
      position: absolute;
      bottom: 0;
      cursor: pointer;
      .action-item:first-child {
        margin-left: 0;
      }
      .action-item {
        display: inline-block;
        padding: 10px 0;
        margin: 0 10px;
        padding-bottom: 20px;
        color: #666;
        cursor: pointer;
        border-bottom: 5px solid transparent;
        transition: color 0.2s ease-in, border-color .3s, background-color .3s, color .3s, opacity .3s;;

        &.active, &:hover {
          color: #ea6f5a;
          border-bottom: 5px solid #ea6f5a;
        }
      }
    }
  }
}

.body-container {
  padding-top: 30px;
  width: 1100px;
  margin: 0 auto;

  .aside-box {
    width: 250px;
    padding: 10px;

    .box-card {
      .number-item {
        &:first-child > .number {
          margin-top: 0;
        }
        .number {
          color: @primaryColor;
          margin-bottom: 0;
          font-size: 25px;
        }
        .desc {
          margin: 0;
          color: #888;
          font-size: 13px;
          margin-top: 3px;
        }
      }
    }
  }
  .main-box {
    padding-top: 10px;

    .box-card {
      margin-top: 20px;
      &:first-child {
        margin-top: 0px;
      }
      &.sponsor {
        position: relative;
        padding-bottom: 55px;
        .info {
          .title {
            margin: 0;
            font-size: 18px;
          }
          .price {
            margin-top: 8px;
            .cost {
              font-size: 30px;
            }
            .count {
              margin-left: 15px;
              color: #888;
            }
          }
          .intro {
            margin-top: 12px;
          }
        }
        .btn-group {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
      }
    }
  }
}

.footbar {
  padding: 30px 0;
  padding-top: 40px;
}

</style>
