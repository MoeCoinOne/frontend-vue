<template>
  <section v-title="$t('account.home.dynamic.title')" v-loading="loading">
    <div class="dynamic" v-for="(dynamic, dIndex) in dynamics" :key="dIndex">
      <div class="user">
        <user-pop
          class="user-pop"
          v-if="!userId"
          :user="{ avatar: dynamic.user.avatar_id, name: dynamic.user.nickname, linkName: dynamic.user.unique_name, intro: dynamic.user.biography }"
        >
        </user-pop><span v-if="!userId">&nbsp;•&nbsp;</span><span>发布于 {{ handleDate(dynamic.created_at) }}</span>
      </div>
      <router-link class="title" :to="{ name: 'HomeCreatorPost', params: { id: dynamic.user ? dynamic.user.unique_name : $route.params.id, postid: dynamic.content_id } }">{{ dynamic.title }}</router-link>
      <div class="content">
        <template v-if ="!!dynamic.content">
          <div class="content-line" v-for="(line, lIndex) in dynamic.content.split('\n')" :key="lIndex" v-html="line">
          </div>
        </template>
      </div>
      <image-list v-if="dynamic.images" class="images" :preview-id="dIndex" :images="!!dynamic.images ? dynamic.images.map(item => ({src: item})) : []"></image-list>
      <!-- <div class="actions">
        <vue-star class="vue-star" animate="animated rubberBand" color="#F05654">
          <i slot="icon" class="icon-star el-icon-star-on"></i>
        </vue-star>
        <div class="start-count">5</div>
        <div>&nbsp;•&nbsp;</div>
        <div class="comment">11 条评论</div>
      </div> -->
    </div>
    <div v-if="loadingFinished" class="tips-loading-finished">
      <div v-if="isLogin">没有更多的信息了</div>
      <div v-else><router-link class="link-login" :to="{ name: 'UserLogin', query: { callback: loginCallback } }">登录</router-link>后查看他/她的动态</div>
    </div>
    <div v-else>
      <loading v-if="loading"></loading>
      <el-button v-else style="width: 100%" size="small" type="primary" @click="loadData">加载更多</el-button>
    </div>
  </section>
</template>

<script>
import 'animate.css/animate.min.css'
import VueStar from 'vue-star'
import { mapState } from 'vuex'
import ImageList from './ImageList'
import UserPop from './UserPop'
import Loading from './Loading'
import moment from 'moment'
export default {
  components: {
    ImageList,
    UserPop,
    VueStar,
    Loading
  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      loadingFinished: false,
      dynamics: [],
      pagination: {
        total: 1,
        current: 0,
        pageSize: 20
      }
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    }),
    isLogin () {
      return !this.notLogin
    },
    notLogin () {
      return !this.accessToken
    },
    loginCallback () {
      return JSON.stringify({
        path: this.$route.path,
        query: this.$route.query,
        params: this.$route.params
      })
    }
  },
  created () {
    this.loadData()
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    async loadData () {
      this.loading = true
      try {
        let response = await this.$request.get({
          name: 'timeline',
          formatUrl: url => this.userId ? `${url}/${this.userId}` : url,
          params: {
            page: ++this.pagination.current,
            pageSize: this.pagination.pageSize
          },
          config: {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        })
        // 如果是第一页则清空当前
        if (this.pagination.current === 1) {
          this.dynamics = []
        }
        this.dynamics = this.dynamics.concat(response.body.data)
        if (response.body.data.length < this.pagination.pageSize) {
          this.loadingFinished = true
        }
      } catch (error) {
        console.log(error)
        this.loadingFinished = true
      }
      this.loading = false
    },
    onScroll () {
      let bodyScrollTop = document.body.scrollTop
      let documentScrollTop = document.documentElement.scrollTop
      let scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop

      let bodyScrollHeight = document.body.scrollHeight
      let documentScrollHeight = document.documentElement.scrollHeight
      let scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight

      let windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }

      if (scrollTop + windowHeight === scrollHeight && !this.loading && !this.loadingFinished) {
        this.loadData()
      }
    },
    moment,
    handleDate (date) {
      let timestamp = this.moment(date).unix()
      let range = this.moment().unix() - timestamp
      if (range < 3600) {
        return this.moment(date).locale('zh-cn').fromNow()
      } else {
        return this.moment(date).locale('zh-cn').format('YYYY-MM-DD HH:mm')
      }
    }
  },
  watch: {
    userId (newVal) {
      this.pagination.current = 0
      this.dynamics = []
      this.loadData()
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
    display: inline-block;
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
.tips-loading-finished {
  text-align: center;
  color: #555;
  .link-login {
    color: #2D84E9;
    text-decoration: none;
    font-weight: bold;
  }
}
</style>
