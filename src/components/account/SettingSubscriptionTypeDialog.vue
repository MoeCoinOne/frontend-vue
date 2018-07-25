<template>
  <el-dialog
    :title="type.id ? '修改订阅' : '创建订阅'"
    v-loading="loading"
    :visible.sync="show"
    width="35%"
    :close-on-click-modal="false"
    :show-close="false"
    :before-close="close">
    <el-form class="form" :model="form" label-width="45px" label-position="left">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="金额">
        <el-input-number v-model="form.price" :min="0" size="small"></el-input-number> 元
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 5, maxRows: 10}"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
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
    },
    type: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      form: {
        name: '',
        description: '',
        price: 0
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:show', false)
    },
    submit () {
      if (this.type.id) {
        this.saveSubmit()
      } else {
        this.createSubmit()
      }
    },
    // 创建
    createSubmit () {
      this.loading = true
      this.$request.post({
        name: 'subscription.type',
        body: {
          ...this.form
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        this.$emit('success', {
          type: 'create'
        })
        this.$message({
          message: '保存成功~',
          type: 'success'
        })
        this.close()
      }).catch(error => {
        console.log(error)
        this.$message.error('保存失败~')
      }).finally(() => {
        this.loading = false
      })
    },
    // 保存
    saveSubmit () {
      this.loading = true
      this.$request.patch({
        name: 'subscription.type',
        formatUrl: url => `${url}/${this.type.id}`,
        body: {
          ...this.form
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        this.$emit('success', {
          type: 'modify'
        })
        this.$message({
          message: '保存成功~',
          type: 'success'
        })
        this.close()
      }).catch(error => {
        console.log(error)
        this.$message.error('保存失败~')
      }).finally(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    })
  },
  watch: {
    show (newValue) {
      if (newValue) {
        // 当显示dialog时初始化数据
        if (this.type.id) {
          this.form.name = this.type.name
          this.form.price = this.type.price
          this.form.description = this.type.description
        } else {
          this.form.name = ''
          this.form.price = 0
          this.form.description = ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
