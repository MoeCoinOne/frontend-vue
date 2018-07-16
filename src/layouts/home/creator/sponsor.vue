<template>
  <section>
    <el-main class="main-box">
      <el-card v-for="(user, uIndex) in userList" :key="uIndex" class="card">
        <user-pop
          :user="{ avatar: user.avatar, name: user.nickname, linkName: user.linkName }"
        ></user-pop>
        <div class="amount">资助了 <span class="fee">{{ user.amount }}</span> 元</div>
      </el-card>
    </el-main>
  </section>
</template>

<script>
import { UserPop } from '@/components/global'
export default {
  components: {
    UserPop
  },
  data () {
    return {
      userList: [
        {
          id: 1,
          linkName: 'smilec',
          nickname: '梦三千',
          avatar: '/static/img/home/temp/2a.jpg',
          amount: 991.12
        },
        {
          id: 2,
          linkName: 'smilec',
          nickname: '唐坚韧',
          avatar: '/static/img/home/temp/1a.jpg',
          amount: 511.32
        },
        {
          id: 3,
          linkName: 'smilec',
          nickname: '大白兔',
          avatar: '/static/img/home/temp/3a.jpg',
          amount: 112.1
        },
        {
          id: 4,
          linkName: 'smilec',
          nickname: '罗永浩',
          avatar: '/static/img/home/user-avatar.jpg',
          amount: 10
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.main-box {
  width: 1100px;
  margin: 0 auto;
}
.card {
  width: 32%;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;

  .amount {
    margin-top: 6px;
    .fee {
      font-weight: bold;
      color: #ea6f5a;
    }
  }
}
</style>
