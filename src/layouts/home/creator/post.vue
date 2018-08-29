<template>
  <article>
    <el-row class="container">
      <el-col :span="18" v-loading="loading">
        <el-card shadow="none" class="post">
          <div class="header">
            <h1 class="title">{{ content.title }}</h1>
            <div class="time">
              <span class="v-middle" v-text="moment(content.created_at).locale('zh-cn').format('YYYY年MM月DD日 HH:mm:ss')"></span>
              <span class="v-middle pointer dp-i-block delete-btn" v-if="isMyPost" @click="deletePost">删除</span></div>
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
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      user: state => state.user,
      accessToken: state => state.user.accessToken
    }),
    isMyPost () {
      if (!this.user || !this.user.uuid) {
        return false
      }
      return this.user.uuid === this.content.user_id
    }
  },
  data () {
    return {
      loading: false,
      content: {
        title: '',
        content: '',
        images: null,
        created_at: '',
        user_id: '',
        content_id: ''
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
    moment,

    async deletePost () {
      try {
        await this.$confirm('确定要删除这条投稿咩? 此操作不可撤销。', '删除确认', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (err) {
        return
      }
      this.loading = true

      try {
        await this.$request.delete({
          name: 'content',
          formatUrl: url => `${url}/${this.content.content_id}`,
          config: {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        })
        this.$message({
          type: 'success',
          message: '投稿已删除'
        })
        this.$router.replace({
          name: 'HomeCreatorPosts',
          params: this.$route.params
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: '删除失败：' + (err.statusText || err.message || '未知错误')
        })
        console.error(err)
      }
      this.loading = false
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

.delete-btn{
  margin-left: 8px;
  font-size: 16px;
  color: #8590a6;
}
</style>
