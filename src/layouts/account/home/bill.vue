<template>
  <section v-title="$t('account.home.bill.title')">
    <!-- 统计部分 -->
    <el-row class="amount">
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
          prop="id"
          label="订单编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="date"
          label="交易时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="交易类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="fee"
          label="金额">
          <template slot-scope="scope">
            <span :style="{ color: scope.row.fee > 0 ? 'green' : 'red' }">
              {{ scope.row.fee }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      bill: {
        list: [{
          id: '1129',
          date: '2018-07-15 14:47:39',
          type: '支出',
          remark: '订阅孟五千',
          fee: -11.12
        }, {
          id: '1121',
          date: '2018-07-15 14:47:39',
          type: '收入',
          remark: '微信充值',
          fee: 50
        }, {
          id: '1119',
          date: '2018-07-15 14:47:39',
          type: '支出',
          remark: '订阅顺火暖工作室',
          fee: -10.12
        }, {
          id: '1009',
          date: '2018-07-15 14:47:39',
          type: '支出',
          remark: '订阅哈哈将军',
          fee: -5
        }, {
          id: '1001',
          date: '2018-07-15 14:47:39',
          type: '收入',
          remark: '微信充值',
          fee: 100.00
        }]
      }
    }
  },
  computed: {
    balance () {
      return {
        int: 200,
        decimal: 23
      }
    }
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
