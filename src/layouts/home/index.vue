<template>
  <article>
    <nav-bar style="border: 0"></nav-bar>
    <section class="banner">
      <div class="title">
        <h2>创作者支援平台</h2>
        <div class="desc">安可萌&nbsp;&nbsp;<span>为各个领域的创作者提供资金和作品分发平台</span></div>
        <div class="btn-group">
          <div class="btn">了解更多</div>
        </div>
      </div>
    </section>
    <section class="intro">
      <div class="box">
        <h2>发现你的创作世界</h2>
        <p>blablalbabla...<br/>blablalbabla...</p>
      </div>
    </section>
    <section class="advantage">
      <h2 class="title">我们的优势</h2>
      <div class="list">
        <div class="advantage-item" v-for="i in 6" :key="i">
          <h3>标题</h3>
          <p>为各个领域的创作者提供资金和作品分发平台，为各个领域的创作者提供资金和作品分发平台，为各个领域的创作者提供资金和作品分发平台，为各个领域的创作者提供资金和作品分发平台</p>
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
export default {
  components: {
    NavBar
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
article {
  min-height: 100%;
  background: #f5f5f5;
}
.banner {
  width: 100%;
  height: calc(~"100vh - 80px");
  background-attachment: scroll,	fixed;
  background-color: #666;
  background-image: url(/static/img/home/overlay.png), url(/static/img/home/banner.jpg);
  background-position: top left,	center center;
  background-repeat: repeat,	no-repeat;
  background-size: auto,	cover;
  color: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: calc(~"100vh - 80px");
    flex-direction: column;

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
        &:hover {
          background-color: rgba(255, 255, 255, .1);
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
}
.advantage {
  background-color: #505393;
  color: #d3d4e4;
  width: 100%;
  height: 1100px;
  padding-bottom: 50px;
  
  .title {
    text-align: center;
    margin: 0;
    padding: 80px 0;
    font-size: 35px;
    font-weight: 300;
    color: #fff;
  }
  .list {
    margin: 0 auto;
    width: 1000px;
    .advantage-item {
      width: 50%;
      max-width: 50%;
      display: inline-block;
      box-sizing: border-box;
      
      padding: 4em 4em 3em 6em;
      h3 {
        margin: 0;
        margin: 0 0 .8em 0;
        font-size: 24px;
        line-height: 1.75em;
        color: #fff;
      }
      p {
        margin: 0 0 2em 0;
      }
      &:nth-child(1) {
        background-color: rgba(0, 0, 0, 0.035);
      }
      &:nth-child(2) {
        background-color: rgba(0, 0, 0, 0.07);
      }
      &:nth-child(3) {
        background-color: rgba(0, 0, 0, 0.105);
      }
      &:nth-child(4) {
        background-color: rgba(0, 0, 0, 0.14);
      }
      &:nth-child(5) {
        background-color: rgba(0, 0, 0, 0.175);
      }
      &:nth-child(6) {
        background-color: rgba(0, 0, 0, 0.21);
      }
    }
  }
}
footer {
  width: 100%;
  height: 150px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  background-color: rgba(29, 36, 42, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 300;
}
</style>
