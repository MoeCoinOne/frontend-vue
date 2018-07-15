<template>
  <el-popover
    placement="top-start"
    trigger="hover"
    :open-delay="200"
    popper-class="moe-user-popover"
  >
      <div slot="default" class="popover">
        <img v-if="user.avatar" :src="user.avatar" class="avatar" />
        <div class="info">
          <div class="name">{{ user.name }}</div>
          <div class="intro">一个写代码的艺术家</div>
        </div>
      </div>
      <router-link
        slot="reference"
        class="link"
        :to="{ name: 'HomeCreatorIndex', params: { id: user.linkName } }"
      >
      <img v-if="user.avatar" :src="user.avatar" class="avatar" /><span class="name">{{ user.name }}</span>
    </router-link>
  </el-popover>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          avatar: '',
          name: '',
          linkName: ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.moe-user-popover {
  padding: 0;
}
.popover {
  height: 71px;
  width: 300px;
  .avatar {
    border: 4px solid #fff;
    position: absolute;
    top: -25px;
    left: 10px;
    height: 80px;
    width: 80px;
  }
  .info {
    padding: 10px 10px 20px 102px;
    // border-bottom: 1px solid #dfdfdf;
    padding-bottom: 10px;
    margin: 0 5px;
    .name {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .intro {
      margin-top: 3px;
      margin-right: 5px;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.link {
  color: #666699;
  text-decoration: none;
  img, span {
    display: inline-block;
    vertical-align: middle;
  }
  .avatar {
    display: inline-block;
    height: 24px;
    width: 24px;
    background: #fff;
    border-radius: 2px;
  }
  .name {
    margin-left: 8px;
  }
}
</style>

<style lang="less">
.moe-user-popover {
  padding: 0 !important;
}
</style>
