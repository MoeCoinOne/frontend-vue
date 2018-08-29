<template>
  <article>
    <el-row class="container">
      <el-col :span="18" v-loading="loading">
        <el-card shadow="none" class="post">
          <div class="header">
            <h1 class="title">{{ content.title }}</h1>
            <div class="time">{{ moment(content.created_at).locale('zh-cn').format('YYYY年MM月DD日 HH:mm:ss') }}</div>
          </div>
          <div class="content" v-if="content.content" v-html="content.content"></div>
          <image-list v-if="content.images" class="images" :images="content.images ? content.images.map(item => ({src: item})) : []"></image-list>
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
import moment from 'moment'
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
      loading: false,
      content: {
        title: '',
        content: '',
        images: null,
        created_at: ''
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.loading = true
      try {
        let response = await this.$request.get({
          name: 'content',
          formatUrl: url => `${url}/${this.$route.params.postid}`
        })
        this.$set(this, 'content', response.body.data)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    moment
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
