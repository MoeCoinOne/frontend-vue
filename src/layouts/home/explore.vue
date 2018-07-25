<template>
  <article v-title="$t('home.explore.title')">
    <nav-bar></nav-bar>
    <div class="banner">
      <div class="title">
        <h1>{{ $t('site.name') }}</h1>
        <h3>发现你的创作世界</h3>
      </div>
    </div>
    <!-- 创作者 -->
    <section class="creators">
      <h2 class="title">发现创作者</h2>
      <el-container class="container">
        <el-aside class="aside-box">
          <div class="tags">
            <div class="tag-item active">所有</div>
            <div class="tag-item">绘画</div>
            <div class="tag-item">视频</div>
            <div class="tag-item">写作</div>
            <div class="tag-item">电影</div>
          </div>
        </el-aside>
        <el-main class="main-box">
          <div class="creator-card"
            v-for="(creator, cIndex) in creators" :key="cIndex"
            @click="$router.push({ name: 'HomeCreatorIndex', params: { id: 'smilec' } })">
            <img class="ubanner" :src="creator.banner" />
            <div class="info">
              <img class="avatar" :src="creator.avatar" />
              <h3 class="name">{{ creator.name }} <small>100 赞助者</small></h3>
              <p class="intro">{{ creator.intro }}</p>
            </div>
          </div>
        </el-main>
      </el-container>
    </section>

    <foot-bar class="footbar"></foot-bar>
  </article>
</template>

<script>
import { NavBar, FootBar } from '@/components/global'
export default {
  components: {
    NavBar,
    FootBar
  },
  data () {
    return {
      creators: [
        {
          name: '孟二千',
          intro: '一个写代码的艺术家',
          banner: '/static/img/home/user-banner.jpg',
          avatar: '/static/img/home/user-avatar.jpg'
        },
        {
          name: 'Royan',
          intro: '正在创作 连载漫画《变态迷弟俏偶像》',
          banner: '/static/img/home/temp/1.jpg',
          avatar: '/static/img/home/temp/1a.jpg'
        },
        {
          name: '易飘扬',
          intro: '正在创作 《大侦探福尔马林》《万事万灵》《爱丽丝学园》',
          banner: '/static/img/home/temp/2.jpg',
          avatar: '/static/img/home/temp/2a.jpg'
        },
        {
          name: '胡大师',
          intro: '正在创作 《大侦探福尔马林》《万事万灵》《爱丽丝学园》',
          banner: '/static/img/home/temp/3.jpg',
          avatar: '/static/img/home/temp/3a.jpg'
        },
        {
          name: '孟二千',
          intro: '一个写代码的艺术家',
          banner: '/static/img/home/user-banner.jpg',
          avatar: '/static/img/home/user-avatar.jpg'
        },
        {
          name: 'Royan',
          intro: '正在创作 连载漫画《变态迷弟俏偶像》',
          banner: '/static/img/home/temp/1.jpg',
          avatar: '/static/img/home/temp/1a.jpg'
        },
        {
          name: '易飘扬',
          intro: '正在创作 《大侦探福尔马林》《万事万灵》《爱丽丝学园》',
          banner: '/static/img/home/temp/2.jpg',
          avatar: '/static/img/home/temp/2a.jpg'
        },
        {
          name: '胡大师',
          intro: '正在创作 《大侦探福尔马林》《万事万灵》《爱丽丝学园》',
          banner: '/static/img/home/temp/3.jpg',
          avatar: '/static/img/home/temp/3a.jpg'
        },
        {
          name: '孟二千',
          intro: '一个写代码的艺术家',
          banner: '/static/img/home/user-banner.jpg',
          avatar: '/static/img/home/user-avatar.jpg'
        },
        {
          name: 'Royan',
          intro: '正在创作 连载漫画《变态迷弟俏偶像》',
          banner: '/static/img/home/temp/1.jpg',
          avatar: '/static/img/home/temp/1a.jpg'
        },
        {
          name: '易飘扬',
          intro: '正在创作 《大侦探福尔马林》《万事万灵》《爱丽丝学园》',
          banner: '/static/img/home/temp/2.jpg',
          avatar: '/static/img/home/temp/2a.jpg'
        },
        {
          name: '胡大师',
          intro: '正在创作 《大侦探福尔马林》《万事万灵》《爱丽丝学园》',
          banner: '/static/img/home/temp/3.jpg',
          avatar: '/static/img/home/temp/3a.jpg'
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #ea6f5a;
article {
  background-color: #f8f8f8;
  min-height: 100%;
}
.banner {
  height: 400px;
  background-image: url(https://moecoin.one/images/summer.jpg);
  background-position-y: -100px;
  background-position-x: 0;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0px 0 10px #ccc;
  .title {
    width: 1100px;
    margin: 0 auto;
    padding-top: 130px;
    h1, h3 {
      margin: 0;
      color: #fff;
    }
    h1 {
      font-size: 70px;
      font-weight: normal;
    }
    h3 {
      font-size: 20px;
      padding-top: 10px;
      font-weight: normal;
    }
  }
}
.creators {
  width: 1100px;
  margin: 0 auto;
  padding-top: 30px;
  .title {
    font-size: 32px;
  }

  .container {
    .aside-box {
      width: 200px;

      .tags {
        .tag-item {
          background-color: #fff;
          margin-bottom: 10px;
          padding: 12px 20px;
          border-radius: 5px;
          border: 1px solid #dfdfdf;
          cursor: pointer;
          transition: background-color 0.1s;

          &:hover {
            background-color: #f1f1f1;
          }
          &.active {
            border: 1px solid @primaryColor;
            color: @primaryColor;
          }
        }
      }
    }
    .main-box {
      margin-top: 0;
      padding-top: 0;
      .creator-card {
        display: inline-block;
        margin-bottom: 15px;
        margin-right: 20px;
        width: 360px;
        height: 160px;
        overflow: hidden;
        position: relative;
        border-radius: 5px;
        background-color: #fff;
        cursor: pointer;
        box-shadow: 1px 0 5px #dfdfdf;
        transition: box-shadow 0.3s;

        &:hover {
          box-shadow: 1px 0 20px #bbb;
        }

        .ubanner {
          max-height: 65px;
          object-fit: cover;
          width: 100%;
        }
        .info {
          padding-left: 110px;
          .avatar {
            width: 80px;
            height: 80px;
            border-radius: 3px;
            border: 3px solid #fff;
            position: absolute;
            top: 35px;
            left: 15px;
          }
          .name {
            margin: 0;
            padding-top: 5px;
            font-size: 1.3em;
            small {
              font-weight: normal;
              font-size: 13px;
              color: #888;
            }
          }
          .intro {
            margin: 0;
            padding-top: 5px;
            font-size: 15px;
            color: #333;
          }
        }
      }
    }
  }
}
.footbar {
  padding: 30px 0;
}
</style>
