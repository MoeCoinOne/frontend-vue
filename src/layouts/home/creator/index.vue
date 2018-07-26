<template>
  <section>
    <el-container class="body-container">
      <el-aside class="aside-box">
        <el-card class="box-card">
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
        <el-card class="box-card sponsor" :class="{ 'is-first': sIndex === 0 }" v-for="(scheme, sIndex) in schemes" :key="sIndex">
          <div class="info">
            <h3 class="title">{{ scheme.name }}</h3>
            <div class="price">
              <span class="cost">{{ parseFloat(scheme.price).toFixed(2) }}</span>
              <span class="cycle">￥/月</span>
              <!-- <span class="count">{{ scheme.subscribe_count }} 人已赞助</span> -->
            </div>
            <div class="intro" v-for="(line, lIndex) in scheme.description.split('\n')" :key="lIndex">
              {{ line }}
            </div>
          </div>
          <!-- <image-list class="image-list" :images="scheme.images" :preview-id="sIndex"></image-list> -->
          <div class="btn-group">
            <el-button type="primary" @click="pay(scheme)">赞助￥{{ parseFloat(scheme.price).toFixed(2) }}</el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { ImageList } from '@/components/global'
export default {
  components: {
    ImageList
  },
  data () {
    return {
      loading: false,
      userinfo: {
        uuid: '',
        nickname: '',
        biography: '',
        follower_count: 0
      },
      schemes: []
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
        // 获取订阅列表
        let types = await this.$request.get({
          name: 'subscription.type',
          params: {
            userId: this.userinfo.uuid
          }
        })
        this.schemes = types.body.data
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    pay (type) {
      this.$router.push({
        name: 'HomePay',
        query: {
          uuid: this.userinfo.uuid,
          nickname: this.userinfo.nickname,
          introduce: this.userinfo.biography,
          // 赞助方案
          typeId: type.id,
          typePrice: type.price,
          typeName: type.name
        }
      })
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
      accessToken: state => state.user.accessToken
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
    }
  }
}
</style>
