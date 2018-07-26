<template>
  <section v-title="$t('account.setting.safe.title')" v-loading="type.loading">
    <h2 class="title">订阅类型管理 <el-button class="btn-create" type="warning" icon="el-icon-plus" size="small" @click="showTypeDialog('create')">创建订阅</el-button></h2>
    <subscription-type-dialog :show.sync="typeDialog.show" :type="typeDialog.type" @success="loadData"></subscription-type-dialog>
    <div v-if="!type.loading && type.list.length === 0" class="tips-empty">
      你还没有设置订阅类型，快创建一个吧
    </div>
    <el-collapse>
      <el-collapse-item v-for="(type, tIndex) in type.list" :key="tIndex">
        <template slot="title">
          {{ type.name }} <i class="el-icon-edit btn-modify" @click.stop="showTypeDialog('modify', type)"></i>
        </template>
        <el-form label-width="45px" label-position="left">
          <el-form-item label="金额" class="moe-subscription-type-form-item">
            {{ parseFloat(type.price) }} 元
          </el-form-item>
          <el-form-item label="介绍" class="moe-subscription-type-form-item">
            <div class="intro-line" v-for="(line, lIndex) in type.description.split('\n')" :key="lIndex">
              {{ line }}
            </div>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import SubscriptionTypeDialog from '@/components/account/SettingSubscriptionTypeDialog'
export default {
  components: {
    SubscriptionTypeDialog
  },
  data () {
    return {
      collapse: {
      },
      type: {
        loading: false,
        list: []
      },
      typeDialog: {
        show: false,
        type: {}
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.type.loading = true
      this.$request.get({
        name: 'subscription.type',
        params: {
          pageSize: 1000
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        this.type.list = response.body.data
      }).catch(error => {
        console.log(error)
        this.$message.error('数据获取失败')
      }).finally(() => {
        this.type.loading = false
      })
    },
    showTypeDialog (type = 'create', obj = {}) {
      if (type === 'create') {
        this.typeDialog.type = {}
      } else {
        this.typeDialog.type = obj
      }
      this.typeDialog.show = true
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
.tips-empty {
  color: #333;
  text-align: center;
  height: 150px;
  margin-top: 130px;
}
.el-collapse-item {
  &:hover {
    background-color: #f1f1f1;
  }
}
.el-form-item {
  margin-bottom: 0;
}
.btn-create {
  float: right;
  margin-top: 2px;
}
.btn-modify {
  color: #6666FF;
  margin-left: 10px;
  padding: 3px;
  border-radius: 50%;
  &:hover {
    background-color: #999999;
    color: #fff;

  }
}
.intro-line {
  line-height: 1.8;
  margin-top: 7px;
}
</style>

<style lang="less">
.moe-subscription-type-form-item {
  .el-form-item__label {
    font-weight: bold;
  }
}
</style>
