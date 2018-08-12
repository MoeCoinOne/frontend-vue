<template>
  <section v-loading="loading">
    <el-main class="main-box" v-if="userList.length">
      <el-card v-for="(user, uIndex) in userList" :key="uIndex" class="card">
        <user-pop
          :user="{ avatar: user.subscriber.avatar_id, name: user.subscriber.nickname, linkName: user.subscriber.unique_name, intro: user.subscriber.biography }"
        ></user-pop>
        <div class="amount">订阅了 <span class="fee">{{ user.type.name }}</span></div>
      </el-card>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="pagination.current"
        :total="pagination.total"
        :page-size="pagination.size"
        @current-change="loadData"
      >
      </el-pagination>
    </el-main>
    <el-main v-else class="main-box">
      你还没有订阅者
    </el-main>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { UserPop } from '@/components/global'
export default {
  components: {
    UserPop
  },
  data () {
    return {
      loading: false,
      userList: [],
      pagination: {
        current: 1,
        size: 20,
        total: 1
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.loading = true
      this.$request.get({
        name: 'subscription.relationship',
        params: {
          type: 'FOLLOWER',
          page: this.pagination.current,
          pageSize: this.pagination.size
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        // TODO: 设置实际的订阅列表
        this.userList = response.body.data
        this.pagination.total = response.body.pagination.total
      }).catch(error => {
        console.error(error)
        this.$message.error('我的订阅获取失败~')
      }).finally(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    })
  }
}
</script>

<style lang="less" scoped>
.main-box {
  width: 1100px;
  margin: 0 auto;
}
.card {
  width: 32%;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;

  .amount {
    margin-top: 6px;
    .fee {
      font-weight: bold;
      color: #ea6f5a;
    }
  }
}
</style>
