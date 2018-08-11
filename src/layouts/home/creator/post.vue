<template>
  <section v-title="$t('account.home.dynamic.title')">
    <div class="dynamic" v-for="(dynamic, dIndex) in dynamics" :key="dIndex">
      <h2 class="title">{{ dynamic.title }}</h2>
      <div v-html="dynamic.content"></div>
      <image-list class="images" :preview-id="dIndex" :images="dynamic.images"></image-list>
      <div class="actions">
        <vue-star class="vue-star" animate="animated rubberBand" color="#F05654">
          <i slot="icon" class="icon-star el-icon-star-on"></i>
        </vue-star>
        <div class="start-count">5</div>
        <!-- <div>&nbsp;•&nbsp;</div>
        <div class="comment">11 条评论</div> -->
      </div>
    </div>
  </section>
</template>

<script>
import 'animate.css/animate.min.css'
import VueStar from 'vue-star'
import { ImageList, UserPop } from '@/components/global'
export default {
  components: {
    ImageList,
    UserPop,
    VueStar
  },
  data () {
    return {
      dynamics: [{
        id: 1,
        title: '我的新作品',
        content: '最近画了一个新东西',
        creator_id: 1,
        creator_name: '孟三千',
        creator_linkname: 'smilec',
        creator_avatar: '/static/img/home/temp/1a.jpg',
        images: [{
          id: 1,
          src: '/static/img/home/temp/1.jpg'
        }]
      }, {
        id: 2,
        title: '我又回来了233',
        content: '不太复杂的，你想要看到的插画。<br/>非商用授权，日涂的水准，不适合肉多的同性内容，其他的别违规哟。',
        creator_id: 1,
        creator_name: '孟二千千',
        creator_linkname: 'smilec',
        creator_avatar: '/static/img/home/temp/2a.jpg',
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
      }]
    }
  }
}
</script>

<style lang="less" scoped>
section {
  margin-top: 10px !important;
  width: 100%;
  background-color: #fff;
  box-shadow: 1px 0 2px #eee;
  overflow: hidden;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
}
@media screen and (min-width: 1100px) {
  section {
    width: 1100px;
    margin: 0 auto;
    margin-top: 35px !important;
  }
}
.dynamic {
  border-bottom: 1px solid #f6f6f6;
  margin-bottom: 20px;
  padding-bottom: 20px;
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .user {
    display: block;
    .user-pop {
      display: inline-block;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      color: #ccc;
    }
  }
  .title {
    font-size: 18px;
    margin: 10px 0;
    margin-bottom: 8px;
  }
  .images {
    margin: 12px 0;
  }
  .actions {
    font-size: 16px;
    color: #8590a6;
    position: relative;
    div {
      display: inline-block;
    }
    .vue-star {
      position: absolute;
      top: -40px;
      left: -38px;
    }
    .start-count {
      margin-left: 28px;
      margin-top: 2px;
    }
    .comment {
      cursor: pointer;
    }
  }
}
.icon-star {
  font-size: 22px;
  cursor: pointer;
}
</style>
