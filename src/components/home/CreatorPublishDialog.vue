<template>
  <el-dialog
    title="发布动态"
    :visible.sync="show"
    width="35%"
    :close-on-click-modal="false"
    :before-close="close">
    <el-form class="form" :model="form" label-width="45px" label-position="left">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="正文">
        <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 3, maxRows: 10}"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-remove="onImageRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">发表</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        images: []
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:show', false)
    },
    submit () {
    },
    onImageRemove () {}
  }
}
</script>

<style lang="less" scoped>

</style>
