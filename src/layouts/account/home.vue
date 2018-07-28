<template>
  <article v-title="$t('user.index.title')" v-loading="loading">
    <nav-bar></nav-bar>

    <section class="banner">
      <div class="user">
        <el-button v-if="false" type="danger" class="btn-be-creator" icon="el-icon-star-on">成为创作者</el-button>
        <img class="avatar" :src="user.avatar" />
        <div class="info">
          <h1>{{ user.nickname }} <small>{{ user.introduce }}</small></h1>
          <div class="item">
            <span class="title">我关注的</span>
            <span class="value">{{ user.followingCount }}</span>
          </div>
          <div class="item">
            <span class="title">订阅我的</span>
            <span class="value">{{ user.followerCount }}</span>
          </div>
          <!-- <div class="item" v-if="false">
            <span class="title">余额</span>
            <span class="value">￥200</span>
          </div> -->
        </div>
      </div>
    </section>

    <section class="menu">
      <el-menu :default-active="$route.name" class="el-menu" mode="horizontal" @select="onMenuSelect">
        <el-menu-item v-if="false" index="AccountHomeDynamic">动态</el-menu-item>
        <el-menu-item index="AccountHomeSubscribes">我的订阅</el-menu-item>
        <el-menu-item index="AccountHomeBill">我的账单</el-menu-item>
      </el-menu>
    </section>

    <router-view class="view"></router-view>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar
  },
  data () {
    return {
      loading: false,
      user: {
        nickname: '',
        introduce: '',
        avatar: '/static/img/home/user-avatar.jpg',
        followerCount: 0,
        followingCount: 0
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    onMenuSelect (index) {
      this.$router.push({ name: index })
    },
    getUserInfo () {
      this.loading = true
      this.$request.get({
        name: 'account.userinfo',
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        this.user.nickname = response.body.data.nickname
        this.user.introduce = response.body.data.biography
        this.user.followerCount = response.body.data.follower_count
        this.user.followingCount = response.body.data.following_count
      }).catch(error => {
        console.log(error)
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
@primaryColor: #ea6f5a;
article {
  background-color: #f8f8f8;
  min-height: 100%;
  padding-bottom: 30px;
}
.banner {
  width: 100%;
  box-shadow: 1px 0 5px #ccc;
  background-color: #fff;
  .user {
    width: 1100px;
    margin: 0 auto;
    padding: 20px 0;
    position: relative;

    .btn-be-creator {
      position: absolute;
      top: 15px;
      right: 10px;
    }
    .avatar {
      display: inline-block;
      border-radius: 5px;
      border: 1px solid #dfdfdf;
      height: 130px;
      width: 130px;
    }
    .info {
      display: inline-block;
      margin-left: 15px;
      margin-top: 6px;
      position: absolute;

      h1, p {
        margin: 0;
        padding: 0;
      }
      h1 {
        font-size: 26px;
        margin-bottom: 10px;
        small {
          font-weight: normal;
          font-size: 15px;
        }
      }
      .item {
        font-size: 15px;
        margin-top: 5px;
        .title {
          color: #666;
        }
        .value {
          color: @primaryColor;
          font-weight: bold;
        }
      }
    }
  }
}
.menu {
  width: 1100px;
  margin: 0 auto;
  margin-top: 30px;
  box-shadow: 1px 0 2px #eee;
  overflow: hidden;
  border-radius: 3px;
  .el-menu {
    padding: 0 20px;
  }
}
.view {
  width: 1100px;
  margin: 0 auto;
}
</style>
