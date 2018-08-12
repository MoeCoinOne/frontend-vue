<template>
  <section v-title="$t('account.home.bill.title')" v-loading="loading">
    <!-- 统计部分 -->
    <el-row class="amount" v-if="false">
      <el-col :span="12" class="balance-box">
        <div class="box">
          <h4 class="title">可用余额</h4>
          <div class="balance">
            <span class="int">{{ balance.int }}</span><span class="decimal">.{{ balance.decimal }}元</span>
            <el-button class="btn" type="danger" size="small">立即充值</el-button>
            <el-button class="btn" size="small">提现</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="box">
            <el-col :span="12" class="amount-box">
              <h4 class="title">收入</h4>
              <div class="fee"><span class="int">100</span>.23元</div>
            </el-col>
            <el-col :span="12" class="amount-box">
              <h4 class="title">支出</h4>
              <div class="fee"><span class="int">20</span>.67元</div>
            </el-col>
        </div>
      </el-col>
    </el-row>
    <!-- 账单列表 -->
    <div class="box">
      <el-table
        :data="bill.list"
        style="width: 100%">
        <el-table-column
          prop="payment_no"
          label="订单编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="交易时间"
          width="220">
          <template slot-scope="scope">
            {{ moment(scope.row.created_at).locale('zh-cn').format('LLL') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="payment_method"
          label="交易方式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sum"
          label="金额">
          <template slot-scope="scope">
            {{ scope.row.sum }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sum"
          label="状态">
          <template slot-scope="scope">
            <span :style="{ color: scope.row.status === 20 ? 'green' : 'red' }">
              {{ scope.row.status === 20 ? '成功' : '未支付' }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="pagination.current"
        :page-count="pagination.totalPages"
        :page-size="pagination.size"
        @current-change="loadData"
        style="margin-top: 15px"
      >
      </el-pagination>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      pagination: {
        current: 1,
        size: 20,
        totalPages: 0
      },
      bill: {
        list: []
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.loading = true
      this.$request.get({
        name: 'payments',
        params: {
          page: this.pagination.current,
          pageSize: this.pagination.size
        },
        config: {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      }).then(response => {
        // TODO: 处理实际的账单
        this.bill.list = response.body.data
        this.pagination.totalPages = response.body.pagination.totalPages
        console.log(response)
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        this.loading = false
      })
    },
    moment
  },
  computed: {
    balance () {
      return {
        int: 200,
        decimal: 23
      }
    },
    ...mapState({
      accessToken: state => state.user.accessToken
    })
  }
}
</script>

<style lang="less" scoped>
.box {
  margin-top: 10px !important;
  width: 100%;
  background-color: #fff;
  box-shadow: 1px 0 2px #eee;
  overflow: hidden;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
}
.balance-box {
  padding-right: 20px;
  .box {
    .title {
      color: #333;
      margin: 0;
      font-weight: normal;
    }
    .balance {
      margin-top: 5px;
      .int {
        font-size: 36px;
        color: #000;
        line-height: 1.33333;
      }
      .btn {
        vertical-align: text-bottom;
        margin-left: 6px;
      }
    }
  }
}
.amount-box {
  text-align: center;
  .title {
    color: #333;
    font-weight: normal;
    margin: 0;
    margin-bottom: 5px;
  }
  .fee {
    .int {
      font-size: 36px;
      color: #000;
      line-height: 1.33333;
    }
  }
}
</style>
