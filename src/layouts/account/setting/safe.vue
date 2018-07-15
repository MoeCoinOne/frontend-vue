<template>
  <section class="safe" v-title="$t('account.setting.safe.title')">
    <h2 class="title">密码设置</h2>
    <el-form class="form" :model="passwordForm" label-width="100px" label-position="left">
      <el-form-item label="旧密码">
        <el-input type="password" v-model="passwordForm.old"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="passwordForm.new"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input type="password" v-model="passwordForm.confirm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning">修改密码</el-button>
      </el-form-item>
    </el-form>
    <h2 class="title">电子邮箱</h2>
    <el-form class="form" :model="passwordForm" label-width="100px" label-position="left">
      <el-form-item label="正在使用">
        {{ emailForm.old }}
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      passwordForm: {
        old: '',
        new: '',
        confirm: ''
      },
      emailForm: {
        old: 'sm**@gmail.com'
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
