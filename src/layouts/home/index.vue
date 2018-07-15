<template>
  <article>
    <nav-bar style="border: 0"></nav-bar>
    <el-carousel class="moe-home-carousel" :interval="8000" @change="onCarouselChange">
      <el-carousel-item class="carousel-item" v-for="(item, index) in carouselList" :key="index" :style="{ backgroundImage: `url(${item.background})` }">
        <div class="carousel-intro">
          <h2
            v-show="item.title.class.length !== 0"
            :class="item.title.class"
            :style="{ color: item.title.color }"
            v-html="item.title.text"
          >
          </h2>
          <p
            v-show="item.intro.class.length !== 0"
            :class="item.intro.class"
            :style="{ color: item.intro.color }"
          >
            {{ item.intro.text }}
          </p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </article>
</template>

<script>
import 'animate.css/animate.min.css'
import { NavBar } from '@/components/global'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      carouselList: [
        {
          background: '/static/img/home/user-banner.jpg',
          title: {
            text: '<i class="el-icon-sold-out"></i> 安可萌',
            class: [],
            color: '#fff'
          },
          intro: {
            text: '通过萌币网络，向全球粉丝销售作品。付款、收入统一使用萌币，免受货币兑换的麻烦',
            class: [],
            color: '#fff'
          }
        }
      ]
    }
  },
  mounted () {
    this.showCarouselIntro(0)
  },
  methods: {
    onCarouselChange (nextIndex, prevIndex) {
      if (prevIndex !== null && this.carouselList[prevIndex]) {
        this.carouselList[prevIndex].title.class = []
        this.carouselList[prevIndex].intro.class = []
      }
      this.showCarouselIntro(nextIndex)
    },
    showCarouselIntro (index) {
      setTimeout(() => {
        this.carouselList[index].title.class = ['animated', 'fadeIn']
        setTimeout(() => {
          this.carouselList[index].intro.class = ['animated', 'fadeIn']
        }, 200)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.carousel-item {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 450px;
}
.carousel-intro {
  width: 1100px;
  margin: 0 auto;
  color: #fff;
  h2 {
    padding-top: 125px;
    font-size: 40px;
    margin-bottom: 0;
  }
  p {
    margin-top: 15px;
  }
}
</style>

<style lang="less">
.moe-home-carousel {
  width: 100%;
  .el-carousel__container {
    height: 450px;
  }
}
</style>
