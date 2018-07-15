<template>
  <section>
    <el-container>
      <el-aside class="box aside" width="300px">
        <div class="tag active">全部</div>
        <div class="tag">动画</div>
        <div class="tag">游戏</div>
      </el-aside>
      <el-main class="box main">
        <div class="creator" v-for="(creator, cIndex) in creatorList" :key="cIndex">
          <img class="avatar" :src="creator.creator.avatar" />
          <div class="info">
            <router-link class="nickname" :to="{ name: 'HomeCreator', params: { id: creator.creator.linkname } }">
              {{ creator.creator.nickname }}
            </router-link>
            <div class="intro">{{ creator.creator.introduce }}</div>
          </div>
        </div>
      </el-main>
    </el-container>
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
      creatorList: [
        {
          id: 0,
          creator: {
            id: 0,
            nickname: '孟二千',
            linkname: 'smilec',
            introduce: '写代码的艺术家',
            subscription_amount: 0,
            avatar: '/static/img/home/temp/1a.jpg'
          },
          started_at: 0,
          time_expired: 0,
          type: {
            id: 0,
            name: 'string',
            description: 'string',
            price: 0
          }
        }
      ]
    }
  },
  mounted () {
    for (let index = 0; index < 5; index++) {
      this.creatorList.push(this.creatorList[0])
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/style/less/global.less";
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
.aside {
  padding: 10px 0;
  .tag {
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
    &.active {
      color: @primaryRed;
    }
  }
}
.main {
  margin-left: 20px;

  .creator {
    margin-bottom: 13px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f6f6f6;
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
    .avatar {
      display: inline-block;
      border-radius: 3px;
      height: 60px;
      width: 60px
    }
    .info {
      display: inline-block;
      vertical-align: top;
      margin-left: 3px;
      margin-top: 3px;
      .nickname {
        font-size: 20px;
        font-weight: bold;
        text-decoration: none;
        color: #000;
      }
      .intro {
        margin-top: 3px;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
