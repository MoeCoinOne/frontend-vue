<template>
  <section v-loading="loading">
    <div v-if="loading || schemes.length">
      <el-card class="box-card sponsor" :class="{ 'is-first': sIndex === 0 }" v-for="(scheme, sIndex) in schemes" :key="sIndex" shadow="hover">
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
        <div class="btn-group" :class="[ type ]">
          <el-button class="btn-pay" type="primary" @click="pay(scheme)">赞助￥{{ parseFloat(scheme.price).toFixed(2) }}</el-button>
        </div>
      </el-card>
    </div>
    <el-card class="box-card empty" v-else>
      <img src="/static/img/empty.png" />
      <h2>这里还没有任何一个订阅类型</h2>
      <router-link v-if="currentUserId === userinfo.uuid" class="tips" :to="{ name: 'HomeCreatorSettingSubscription', params: $route.params }">这就去创建一个</router-link>
    </el-card>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { ImageList, Timeline } from '@/components/global'
export default {
  props: {
    type: {
      type: String,
      default: 'card'
    }
  },
  components: {
    ImageList,
    Timeline
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
      &.aside {
        left: 20px;
        .btn-pay {
          width: 100%;
        }
      }
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
</style>
