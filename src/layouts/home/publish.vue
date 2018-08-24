<template>
  <article v-title="$t('home.publish.title')" v-loading="loading">
    <nav-bar></nav-bar>
    <h1 class="page-title">{{$t('home.publish.title')}}</h1>

    <section class="container">
      <el-form ref="form" :model="form" label-position="top" >

        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <template v-for="(item,key) in form.priceGroups" >
          <el-form-item label="图片列表" :key="key">
            <el-upload
              action=""
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="说明" :key="key">
            <el-input
            v-model="item.textContent"
            type="textarea"
            :autosize="{ minRows: 4}"
            ></el-input>
          </el-form-item>

          <el-form-item label="公开范围" :key="key">
            <el-radio v-model="item.publishLevel" label="all">全体公开</el-radio>
            <el-radio v-model="item.publishLevel" label="subscribed">订阅可见</el-radio>
            <el-radio v-model="item.publishLevel" label="paid">付费 10 元或以上可见</el-radio>
          </el-form-item>

          <hr :key="key" style="margin-bottom:30px"/>
        </template>

        <el-form-item>
            <el-button icon="el-icon-plus" type="warning" @click="addPriceGroup">增加付费档位</el-button>
        </el-form-item>

        <el-form-item>
          <div class="button-row">
            <el-button>保存草稿</el-button>
            <el-button type="primary">立即创建</el-button>
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
export default {
  components: {
    NavBar,
    FootBar
  },
  data () {
    return {
      loading: false,
      form: {
        title: '',
        priceGroups: [{
          textContent: '',
          publishLevel: 'all'
        }]
      }
    }
  },
  methods: {
    addPriceGroup () {
      this.form.priceGroups.push({
        textContent: '',
        publishLevel: 'all'
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
  margin: 0 0 20px 0
}

.button-row{
  text-align: center
}
</style>
