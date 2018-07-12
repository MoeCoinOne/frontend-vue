<template>
  <section>
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

  </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
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
</style>
