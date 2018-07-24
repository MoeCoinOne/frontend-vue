<template>
  <section v-title="$t('account.home.subscribes.title')" v-loading="loading">
    <el-container>
      <el-aside class="box aside" width="230px">
        <div class="tag active">全部</div>
      </el-aside>
      <el-main class="box main">
        <div class="creator" v-for="(creator, cIndex) in creatorList" :key="cIndex">
          <img class="avatar" :src="creator.creator.avatar" />
          <div class="info">
            <router-link class="nickname" :to="{ name: 'HomeCreatorIndex', params: { id: creator.creator.linkname } }">
              {{ creator.creator.nickname }}
            </router-link>
            <div class="intro">{{ creator.creator.introduce }}</div>
          </div>
          <el-button class="btn-delete-sub">已订阅</el-button>
          <!-- <el-popover
            placement="top"
            width="160"
            v-model="creator.popShow">
            <p>你确定要取消订阅他吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="creator.popShow = false">取消</el-button>
              <el-button type="danger" size="mini" @click="creator.popShow = false">确定</el-button>
            </div>
            <el-button slot="reference" class="btn-delete-sub">已订阅</el-button>
          </el-popover> -->
        </div>
      </el-main>
    </el-container>
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
      pagination: {
        current: 1,
        size: 20,
        total: 0
      },
      creatorList: [
        {
          id: 0,
          popShow: false,
          creator: {
            id: 0,
            nickname: '孟二千',
            linkname: 'smilec',
            introduce: '写代码的艺术家',
            subscription_amount: 0,
            avatar: '/static/img/home/temp/1a.jpg'
          },
          started_at: 0,
          time_expired: 0,
          type: {
            id: 0,
            name: 'string',
            description: 'string',
            price: 0
          }
        }
      ]
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.loading = true
      this.$request.get({
        name: 'subscription.relationship',
        params: {
          type: 'FOLLOWING',
          page: this.pagination.current++,
          pageSize: this.pagination.size
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        // TODO: 设置实际的订阅列表
        // this.creatorList = response.body.data
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
@import "~@/common/style/less/global.less";
.box {
  margin-top: 10px !important;
  width: 100%;
  background-color: #fff;
  box-shadow: 1px 0 2px #eee;
  overflow: hidden;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
}
.aside {
  padding: 10px 0;
  height: max-content;
  .tag {
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
    &.active {
      color: @primaryRed;
    }
  }
}
.main {
  margin-left: 20px;
  height: max-content;

  .creator {
    margin-bottom: 13px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f6f6f6;
    position: relative;
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
    .avatar {
      display: inline-block;
      border-radius: 3px;
      height: 60px;
      width: 60px
    }
    .info {
      display: inline-block;
      vertical-align: top;
      margin-left: 6px;
      margin-top: 5px;
      .nickname {
        font-size: 20px;
        font-weight: bold;
        text-decoration: none;
        color: #000;
      }
      .intro {
        margin-top: 4px;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
.btn-delete-sub {
  position: absolute;
  right: 0;
  top: 10px;
}
</style>
