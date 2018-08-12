<template>
  <section>
    <el-container class="body-container">
      <el-aside class="aside-box">
        <el-card class="box-card" shadow="hover">
          <div class="number-item">
            <h2 class="number">{{ userinfo.follower_count }}</h2>
            <h4 class="desc">订阅者</h4>
          </div>
          <!-- <div class="number-item">
            <h2 class="number">$7,491</h2>
            <h4 class="desc">月收入</h4>
          </div> -->
        </el-card>
      </el-aside>
      <el-main class="main-box" v-loading="loading">
        <types></types>

        <timeline class="timeline"></timeline>
      </el-main>
    </el-container>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { ImageList, Timeline } from '@/components/global'
import Types from '@/components/home/CreatorTypes'
export default {
  components: {
    ImageList,
    Timeline,
    Types
  },
  data () {
    return {
      loading: false,
      userinfo: {
        uuid: '',
        nickname: '',
        biography: '',
        follower_count: 0
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
        // 获取用户信息
        let userinfo = await this.$request.get({
          name: 'account.userinfo',
          params: {
            unique_name: this.$route.params.id
          }
        })
        this.userinfo = userinfo.body.data
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  },
  watch: {
    uuid (newValue) {
      if (newValue) {
        this.loadData()
      }
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken,
      currentUserId: state => state.user.uuid
    })
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
.body-container {
  padding-top: 30px;
  width: 1100px;
  margin: 0 auto;

  .aside-box {
    width: 250px;
    padding: 10px;

    .box-card {
      .number-item {
        &:first-child > .number {
          margin-top: 0;
        }
        .number {
          color: @primaryColor;
          margin-bottom: 0;
          font-size: 25px;
        }
        .desc {
          margin: 0;
          color: #888;
          font-size: 13px;
          margin-top: 3px;
        }
      }
    }
  }
  .main-box {
    padding-top: 10px;

    .box-card {
      margin-top: 20px;
      &:first-child, &.is-first {
        margin-top: 0px;
      }
      &.sponsor {
        position: relative;
        padding-bottom: 55px;
        .info {
          .title {
            margin: 0;
            font-size: 18px;
          }
          .price {
            margin-top: 8px;
            .cost {
              font-size: 30px;
            }
            .count {
              margin-left: 15px;
              color: #888;
            }
          }
          .intro {
            margin-top: 12px;
          }
        }
        .image-list {
          margin-top: 18px;
        }
        .btn-group {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
      }
      &.empty {
        text-align: center;
        padding: 5px 0 20px 0;
        img {
          height: 200px;
        }
        h2 {
          color: #444;
          font-weight: normal;
          font-size: 21px;
        }
        .tips {
          text-decoration: none;
          color: #2D84E9;
        }
      }
    }
  }
}
.timeline {
  width: 100% !important;
  margin-top: 25px !important;
}
</style>
