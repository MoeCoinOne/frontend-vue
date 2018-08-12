<template>
  <article>
    <el-row class="container">
      <el-col :span="18">
        <el-card shadow="none" class="post">
          <div class="header">
            <h1 class="title">内容标题</h1>
            <div class="time">2018年8月12日 18:01:43</div>
          </div>
          <div class="content">
            今年比较满意的摸鱼
          </div>
          <image-list class="images" :images="images"></image-list>
        </el-card>
      </el-col>
      <el-col class="aside" :span="6">
        <types type="aside"></types>
      </el-col>
    </el-row>
  </article>
</template>

<script>
import { NavBar, FootBar, ImageList } from '@/components/global'
import Types from '@/components/home/CreatorTypes'
export default {
  components: {
    NavBar,
    FootBar,
    ImageList,
    Types
  },
  data () {
    return {
      images: [{
        id: 2,
        src: '/static/img/home/temp/1.jpg'
      }, {
        id: 3,
        src: 'https://moecoin.one/images/summer.jpg'
      }, {
        id: 4,
        src: '/static/img/home/user-banner.jpg'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
article {
  min-height: 100%;
  background-color: #f6f6f6;
}
@media screen and (min-width: 1100px) {
  .container {
    padding-top: 20px;
    width: 1100px;
    margin: 0 auto;
  }
}
.post {
  padding: 10px;
  .header {
    padding-bottom: 30px;
    .title {
      font-size: 1.8rem;
      margin: 0;
    }
    .time {
      font-size: 12px;
    }
  }
  .images {
    margin-top: 20px;
  }
}
.aside {
  padding-left: 20px;
}
</style>
