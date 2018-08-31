<template>
  <article v-title="$t('home.publish.title')" v-loading="loading">
    <nav-bar></nav-bar>
    <h1 class="page-title">{{$t('home.publish.title')}}</h1>

    <section class="container">
      <el-form ref="form" :model="form" label-position="top" >

        <el-form-item label="投稿类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="图片投稿" value="IMAGES"></el-option>
            <el-option label="文章投稿" value="ARTICLE"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title" :rules="[
          { required: true, message:$t('error.POST_TITLE_EMPTY')}
        ]">
          <el-input v-model="form.title" placeholder="这里是稿件的标题ヾ(´∀`o)+"></el-input>
        </el-form-item>

        <el-form-item v-if="form.type === 'IMAGES'" label="图片列表" prop="elementImageList" :rules="[
          { type: 'array', required: form.type === 'IMAGES', message: '请至少上传一张图片'}
        ]">
          <el-upload
            action=""
            :http-request="uploadImage"
            accept="image/*"
            :file-list="form.elementImageList"
            :on-error="fileListError(0)"
            :on-success="fileListSuccess(0)"
            :on-remove="fileListRemove(0)"
            :disabled="imageUploading"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item :label="form.type === 'ARTICLE' ? '正文' : '说明'" prop="content" :rules="[
          { required: true, message:$t('error.POST_CONTENT_EMPTY')}
        ]">
          <!-- <el-input
          v-model="form.content"
          type="textarea"
          placeholder="这里是动态的正文~"
          :autosize="{ minRows: 5, maxRows: 10}"
          ></el-input> -->
          <div class="quill-ctnr">
            <quill-editor v-model="form.content" :options="editorConfig"></quill-editor>
          </div>
        </el-form-item>

        <el-form-item label="公开范围">
          <el-radio v-model="form.visible" label="NORMAL">全体公开</el-radio>
          <el-radio v-model="form.visible" label="SUBSCRIBED_ONLY">订阅可见</el-radio>
          <el-radio
            v-model="form.visible"
            :label="`PAID@${candidate}`"
            v-for="candidate in visibleCandidate"
            :key="candidate"
          >付费 {{ candidate }} 元订阅可见</el-radio>
        </el-form-item>

        <!-- <el-form-item>
            <el-button icon="el-icon-plus" type="warning" @click="addPriceGroup">增加付费档位</el-button>
        </el-form-item> -->

        <el-form-item>
          <div class="button-row">
            <el-button>保存草稿</el-button>
            <el-button type="primary" @click="postContent">立即创建</el-button>
          </div>
        </el-form-item>
      </el-form>
    </section>

    <foot-bar class="footer"></foot-bar>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { NavBar, FootBar } from '@/components/global'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor as QuillEditor } from 'vue-quill-editor'
import { quillEditorBaseConfig } from '../../common/config/rich-text'

import { uploadSingleFile } from '@/common/services/file-upload'

export default {
  components: {
    NavBar,
    FootBar,
    QuillEditor
  },
  data () {
    return {
      loading: false,
      imageUploading: false,
      form: {
        type: 'IMAGES',
        visible: 'NORMAL',
        title: '',
        content: '',
        images: [],
        elementImageList: []
      },
      visibleCandidate: [],
      editorConfig: Object.assign({}, quillEditorBaseConfig, {placeholder: '这里是投稿的正文~'})
    }
  },
  methods: {
    fileListSuccess (groupId) {
      // groupId 为日后多组上传保留
      return (response, file, fileList) => {
        this.syncElementImageList(fileList)
      }
    },

    fileListError (groupId) {
      // groupId 为日后多组上传保留
      return (response, file, fileList) => {
        this.syncElementImageList(fileList)
      }
    },

    fileListRemove (groupId) {
      // groupId 为日后多组上传保留
      return (response, fileList) => {
        this.syncElementImageList(fileList)
      }
    },

    syncElementImageList (fileList) {
      this.form.elementImageList = fileList
    },

    // 从服务端加载订阅类型，用于可见度候候选
    async loadVisibleCandidate () {
      this.loading = true
      try {
        const res = await this.$request.get({
          name: 'subscription.type',
          params: {
            pageSize: 1000
          },
          config: {
            headers: {
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        })
        this.visibleCandidate = res.body.data
          .map(item => parseFloat(item.price))
          .filter((value, index, self) => self.indexOf(value) === index)
      } catch (err) {
        console.error(err)
      }
      this.loading = false
    },

    // 向服务端发送投稿请求
    async postContent () {
      if (this.imageUploading) {
        return
      }
      try {
        await this.$refs.form.validate()
      } catch (err) {
        return
      }

      try {
        let params = this.form
        if (params.visible.indexOf('PAID@') !== -1) {
          const price = params.visible.substring(params.visible.indexOf('@') + 1)
          params = Object.assign({}, params, {
            visible: 'SUBSCRIBED_ONLY',
            minimum_paid: price
          })
        }
        params = Object.assign({}, params, {
          images: this.form.elementImageList
            .filter(item => item.status === 'success')
            .map(item => item.response.path)
        })
        delete params.elementImageList
        this.loading = true
        const response = await this.$request.post({
          name: 'content',
          body: {
            ...params
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

        this.$router.push({
          name: 'HomeCreatorPost',
          params: {
            id: this.uniqueName,
            postid: response.body.data.content_id
          }
        }, () => { this.loading = false })
      } catch (error) {
        console.log(error)
        this.$message.error('发表失败~')
      }
    },

    uploadImage (data) {
      // console.log(data)
      this.imageUploading = true
      const self = this
      uploadSingleFile(
        data.file,
        'post', // category Name
        function onSuccess () {
          self.imageUploading = false
          data.onSuccess.apply(data, arguments)
        },
        function onError (err) {
          self.imageUploading = false
          data.onError(err)
        },
        data.onProgress.bind(data)
      )
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken,
      uniqueName: state => state.user.uniqueName
    })
  },
  mounted () {
    this.loadVisibleCandidate().catch(err => console.error(err))
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
@import "~@/common/style/less/global.less";
article {
  background-color: #f6f6f6;
  min-height: 100%;
}
.container {
  width: 1100px;
  margin: 0 auto;
  position: relative;

  background-color: #fff;
  box-shadow: 0 0 2px 0 #cbd0d8;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 50px 80px 80px 80px;

}

.page-title{
  width: 1100px;
  font-size: 20px;
  text-align: center;
  margin: 48px auto;
  font-weight: normal;
}

.footer{
  padding: 40px 0 30px 0;
}

.el-input,
.el-textarea{
  width: 500px;
}

.el-radio{
  display: block;
  margin: 0 0 20px 0 !important // 覆盖 el-radio 默认样式
}

.button-row{
  text-align: center
}

.quill-ctnr{
  line-height: 12px;
  margin-bottom: 56px;
}
.quill-editor{
  box-sizing: border-box;
  height: 250px;
}
</style>
