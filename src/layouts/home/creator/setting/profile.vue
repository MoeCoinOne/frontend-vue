<template>
  <div v-title="$t('account.setting.profile.title')" v-loading="loading">
    <h2 class="title">个人资料</h2>
    <el-form class="form" :model="form" label-width="80px" label-position="left">
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="form.introduce"></el-input>
      </el-form-item>
      <el-form-item label="个性地址">
        <el-input v-model="form.uniqueName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveProfile">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      form: {
        nickname: '',
        introduce: '',
        uniqueName: ''
      },
      avatarId: '',
      email: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
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
        this.form.nickname = response.body.data.nickname
        this.form.introduce = response.body.data.biography
        this.form.uniqueName = response.body.data.unique_name
        this.avatarId = response.body.data.avatar_id
        this.email = response.body.data.email
      }).catch(error => {
        console.log(error)
        this.$message.error('登录状态已过期')
        this.$store.commit('clearUserToken')
        this.$router.push('/user/login')
      }).finally(() => {
        this.loading = false
      })
    },
    saveProfile () {
      this.loading = true
      this.$request.post({
        name: 'account.userinfo',
        body: {
          uuid: this.uuid,
          nickname: this.form.nickname,
          biography: this.form.introduce,
          unique_name: this.form.uniqueName
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        this.$message({
          message: '保存成功~',
          type: 'success'
        })
        this.$router.replace({ name: 'HomeCreatorIndex', params: { id: this.form.uniqueName } })
        this.$store.commit('setUserInfo', {
          uniqueName: this.form.uniqueName
        })
      }).catch(error => {
        this.$message.error('保存失败~出错啦~')
        console.log(error)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState({
      uuid: state => state.user.uuid,
      accessToken: state => state.user.accessToken
    }),
    avatarMd5 () {
      return md5(this.email)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 0;
  margin-top: 40px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 1px solid #dfdfdf;
  font-weight: normal;
  color: #333;
  &:first-child {
    margin-top: 0;
  }
}
.form {
  width: 440px;
}
</style>
