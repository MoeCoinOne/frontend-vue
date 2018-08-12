<template>
  <section v-title="$t('account.home.dynamic.title')">
    <div class="dynamic" v-for="(dynamic, dIndex) in dynamics" :key="dIndex">
      <div class="user">
        <user-pop
          class="user-pop"
          :user="{ avatar: dynamic.creator_avatar, name: dynamic.creator_name, linkName: dynamic.creator_linkname }"
        >
        </user-pop><span>&nbsp;•&nbsp;2018-01-01</span>
      </div>
      <router-link class="title" :to="{ name: 'HomeCreatorPost', params: { id: dynamic.creator_linkname, postid: '123' } }">{{ dynamic.title }}</router-link>
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
import { mapState } from 'vuex'
import ImageList from './ImageList'
import UserPop from './UserPop'
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
        creator_avatar: 'gavatar|b60ec2cf2ed64b71cb95cf2e4173097f',
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
        creator_avatar: 'gavatar|b60ec2cf2ed64b71cb95cf2e4173097f',
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
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    })
  },
  created () {
    // this.loadData()
  },
  methods: {
    async loadData () {
      try {
        let list = await this.$request.get({
          name: 'timeline',
          config: {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        })
        console.log(list)
      } catch (error) {
        console.log(error)
      }
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
    font-weight: bold;
    color: #000;
    text-decoration: none;
    display: block;
    margin: 10px 0;
    margin-bottom: 8px;
    transition: all 0.2s;
    &:hover {
      color: #ea6f5a;
    }
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
