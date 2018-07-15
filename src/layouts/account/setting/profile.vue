<template>
  <section v-title="$t('account.setting.profile.title')">
    <h2 class="title">个人资料</h2>
    <el-form class="form" :model="form" label-width="80px" label-position="left">
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="个性地址">
        <el-input v-model="form.linkName" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>提交</el-button>
      </el-form-item>
    </el-form>
    <h2 class="title">头像</h2>
    <el-upload
      class="moe-avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="avatar.link" :src="avatar.link" class="moe-uploader-avatar">
      <i v-else class="el-icon-plus moe-avatar-uploader-icon"></i>
    </el-upload>
  </section>
</template>

<script>
export default {
  data () {
    return {
      form: {
        nickname: '孟二千',
        introduce: '写代码的艺术家',
        linkName: 'smilec',
        avatar: ''
      },
      avatar: {
        link: '/static/img/home/user-avatar.jpg'
      }
    }
  }
}
</script>

<style lang="less" scoped>
section {
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
}
.form {
  width: 440px;
}
</style>

<style lang="less">
// 头像上传
.moe-avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.moe-avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.moe-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.moe-uploader-avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
