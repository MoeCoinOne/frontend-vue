<template>
  <div v-title="$t('account.setting.safe.title')" v-loading="type.loading">
    <h2 class="title">订阅类型管理</h2>
    <subscription-type-dialog :show.sync="typeDialog.show" :type="typeDialog.type" @success="loadData"></subscription-type-dialog>
    <div v-if="!type.loading && type.list.length === 0" class="tips-empty">
      你还没有设置订阅类型，快创建一个吧
    </div>
    <el-row>
      <el-col :span="16" class="subs">
        <el-card class="sub-item animated" :class="{ 'zoomOutRight': type.remove }" shadow="hover" v-for="(type, tIndex) in type.list" :key="tIndex" v-loading="type.loading" ref="type">
          <div class="title-group">
            <el-input class="ipt-title" placeholder="订阅类型标题" width="500" v-model="type.name"></el-input>
            <el-tooltip effect="dark" content="删除该项" placement="top">
              <i class="el-icon-close" @click="() => onDeleteClick(type, tIndex)"></i>
            </el-tooltip>
          </div>
          <div class="price-group">
            <span class="unit">￥</span>
            <input v-model="type.price" placeholder="0.00" />
            <span class="cycle">/月</span>
          </div>
          <el-input
            class="ipt-intro"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6}"
            v-model="type.description"
            placeholder="订阅类型介绍"
          >
          </el-input>
          <div class="btn-group">
            <el-button type="primary" class="btn-save" @click="() => onSaveClick(type, tIndex)">保存</el-button>
          </div>
        </el-card>
        <el-button class="btn-append" icon="el-icon-plus" size="small" @click="onAppendClick">增加赞助方案</el-button>
      </el-col>
      <el-col :span="8" class="advise">
        <h4>建议您这样设置</h4>
        <ol>
          <li>已有或低成本的奖励，这会让你不会耗费太大经历。</li>
          <li>不需要邮寄的奖励，不然你会很辛苦。</li>
          <li>可以设置价格为0的赞助项目，这样可以让粉丝有机会免费订阅你。</li>
        </ol>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'animate.css/animate.min.css'
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
    console.log(this)
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
        for (let type of this.type.list) {
          type.price = parseFloat(type.price)
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('数据获取失败')
      }).finally(() => {
        this.type.loading = false
      })
    },
    onSaveClick (typeItem) {
      this.saveType(typeItem)
    },
    onDeleteClick (typeItem, typeIndex) {
      if (window.confirm('确定要删除吗？')) {
        this.deleteType(typeItem, typeIndex)
      }
    },
    onAppendClick () {
      this.type.list.push({
        id: 0,
        name: '',
        price: '',
        description: ''
      })
      let index = this.type.list.length - 1
      this.$nextTick(() => {
        this.$refs['type'][index].$el.classList.add('fadeIn')
      })
    },
    // 保存
    saveType (type) {
      if (!type.name) {
        this.$message.error('订阅类型名称不能为空~')
        return
      }
      this.$set(type, 'loading', true)
      // 判断是否为创建
      let isCreate = true
      if (type.id) isCreate = false
      // 计算金额
      type.price = type.price ? parseFloat(type.price) : 0
      this.$request.$fetch(isCreate ? 'post' : 'patch', {
        name: 'subscription.type',
        formatUrl: url => isCreate ? url : `${url}/${type.id}`,
        body: {
          ...type
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
      }).catch(error => {
        console.log(error)
        this.$message.error('保存失败~')
      }).finally(() => {
        type.loading = false
      })
    },
    deleteType (type, typeIndex) {
      let removeType = () => {
        this.$message({
          message: '删除成功~',
          type: 'success'
        })
        this.$set(type, 'remove', true)
        this.$nextTick(() => {
          setTimeout(() => {
            this.type.list.splice(typeIndex, 1)
          }, 1000)
        })
      }
      // 判断是否没有创建
      if (!type.id) {
        removeType()
        return
      }
      // 删除
      this.$set(type, 'loading', true)
      this.$request.delete({
        name: 'subscription.type',
        formatUrl: url => `${url}/${type.id}`,
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        removeType()
      }).catch(error => {
        console.log(error)
        this.$message.error('删除失败~')
        type.loading = false
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
.subs {
  padding-top: 10px;
  .sub-item {
    margin-bottom: 30px;
    .title-group {
      position: relative;
      .ipt-title {
        width: 400px;
      }
      .el-icon-close {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 22px;
        color: #aaa;
        transition: all 0.2s;
        cursor: pointer;
        &:hover {
          color: #000;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .price-group {
      margin-top: 10px;
      .unit {
        font-size: 32px;
        color: #aaa;
      }
      input {
        font-size: 32px;
        border: none;
        width: 6rem;
        color: @primaryColor;
        &:focus {
          outline: none;
        }
      }
      .cycle {
        margin-left: 5px;
        color: #999;
      }
    }
    .ipt-intro {
      margin-top: 10px;
    }
    .btn-group {
      display: flex;
      margin-top: 20px;
      flex-direction: row-reverse;
    }
  }
}
.advise {
  padding: 0 20px;
  ol {
    padding-left: 1.2rem;
    color: #555;
    li {
      padding-bottom: 10px;
      font-size: 13px;
    }
  }
}
.btn-append {
  width: 100%;
}
</style>

<style lang="less">
.moe-subscription-type-form-item {
  .el-form-item__label {
    font-weight: bold;
  }
}
</style>
