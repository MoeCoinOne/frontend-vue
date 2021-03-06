<template>
  <article v-title="pageTitle" v-loading="loading">
    <nav-bar></nav-bar>
    <div class="user-header">
      <div class="user-banner"></div>
      <div class="user-info">
        <img class="avatar" :src="`https://develop-test.encore.moe/api/v1/users/avatar/${userinfo.avatarId}?s=200&d=mp`" />
        <div class="info">
          <div class="intro">
            <h1>{{ userinfo.nickname }} <small>{{ userinfo.biography }}</small></h1>
          </div>
          <div class="action">
            <router-link class="action-item" :to="{ name: 'HomeCreatorIndex', params: $route.params }" exact>主页</router-link>
            <router-link class="action-item" :to="{ name: 'HomeCreatorPosts', params: $route.params }" exact>投稿</router-link>
            <router-link v-if="isSelf" class="action-item" :to="{ name: 'HomeCreatorSponsor', params: $route.params }">赞助者</router-link>
            <router-link v-if="isSelf" class="action-item" :to="{ name: 'HomeCreatorSettingProfile', params: $route.params }">设置</router-link>
          </div>
        </div>
        <el-button v-if="isSelf" type="danger" icon="el-icon-edit" class="btn-publish" @click="goPublishPage">新建投稿</el-button>
      </div>
    </div>

    <router-view></router-view>
    <foot-bar class="footbar"></foot-bar>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import CreatorPublishDialog from '@/components/home/CreatorPublishDialog'
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar,
    CreatorPublishDialog
  },
  data () {
    return {
      loading: false,
      pageTitle: this.$t('home.creator.title'),
      publishDialog: {
        show: false
      },
      userinfo: {
        uuid: '',
        nickname: '',
        uniqueName: '',
        biography: '',
        avatarId: 'gavatar|aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      }
    }
  },
  mounted () {
    this.loadData()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.loadData()
  },
  methods: {
    goPublishPage () {
      this.$router.push({
        name: 'HomePublish'
      })
    },
    loadData () {
      this.loading = true
      this.$request.get({
        name: 'account.userinfo',
        params: {
          unique_name: this.$route.params.id
        }
      }).then(response => {
        this.userinfo.uuid = response.body.data.uuid
        this.userinfo.nickname = response.body.data.nickname
        this.userinfo.uniqueName = response.body.data.unique_name
        this.userinfo.biography = response.body.data.biography
        this.userinfo.avatarId = response.body.data.avatar_id

        this.pageTitle = this.userinfo.nickname
      }).catch(error => {
        if (error.status === 404) {
          this.$message.error('创作者不存在')
        } else {
          this.$message.error('未知错误')
        }
      }).finally(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState({
      currentUserUUID: state => state.user.uuid
    }),
    isSelf () {
      return this.userinfo.uuid === this.currentUserUUID
    }
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
article {
  background-color: #f3f5f8;
  min-height: 100%;
}
.user-header {
  width: 100%;
  box-shadow: 1px 0 10px #aaa;
  background-color: #fff;
  position: relative;
  .user-banner {
    width: 100%;
    background-image: url(/static/img/home/banner/6.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 380px;
  }
  .user-info {
    width: 1100px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    .avatar {
      width: 150px;
      height: 150px;
      border: 4px solid #fff;
      border-radius: 5px;
      position: absolute;
      top: -75px;
    }
    .info {
      padding-left: 180px;
      h1 {
        font-size: 26px;
        small {
          font-weight: normal;
          font-size: 18px;
        }
      }
    }
    .action {
      position: absolute;
      bottom: 0;
      cursor: pointer;
      .action-item:first-child {
        margin-left: 0;
      }
      .action-item {
        display: inline-block;
        padding: 10px 0;
        margin: 0 10px;
        padding-bottom: 20px;
        color: #666;
        cursor: pointer;
        border-bottom: 5px solid transparent;
        text-decoration: none;
        transition: color 0.2s ease-in, border-color .3s, background-color .3s, color .3s, opacity .3s;;

        &.active, &:hover, &.router-link-active {
          color: #ea6f5a;
          border-bottom: 5px solid #ea6f5a;
        }
      }
    }
    .btn-publish {
      position: absolute;
      top: 17px;
      right: 0;
    }
  }
}

.footbar {
  padding: 30px 0;
  padding-top: 40px;
}

</style>
