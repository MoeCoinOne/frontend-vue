<template>
  <el-dialog
    title="发布动态"
    :visible.sync="show"
    width="35%"
    :close-on-click-modal="false"
    :before-close="close">
    <el-form class="form" :model="form" label-width="45px" label-position="left">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="这里是动态的标题ヾ(´∀`o)+"></el-input>
      </el-form-item>
      <el-form-item label="正文">
        <el-input type="textarea" v-model="form.content" :autosize="{ minRows: 5, maxRows: 10}" placeholder="这里是动态的正文~"></el-input>
      </el-form-item>
      <el-form-item label="图片" v-if="false">
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
import { mapState } from 'vuex'
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
        type: 'ARTICLE',
        minimum_paid: '0',
        visible: 'NORMAL',
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
    async submit () {
      try {
        let response = await this.$request.post({
          name: 'content',
          body: {
            ...this.form
          },
          config: {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        })

        this.$message({
          type: 'success',
          message: '发表成功~'
        })
        this.$emit('success', {
          contentId: response.body.data.id
        })
        this.close()
      } catch (error) {
        console.log(error)
        this.$message.error('发表失败~')
      }
    },
    onImageRemove () {}
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    })
  }
}
</script>

<style lang="less" scoped>

</style>
