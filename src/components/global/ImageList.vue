<template>
  <div class="images">
    <img
      v-for="(item, index) in images"
      :key="index"
      :src="item.src"
      :preview="previewId"
      :class="[ images.length === 1 ? 'single' : 'multi' ]"
      alt="image"
    />
  </div>
</template>

<script>
export default {
  props: {
    previewId: {
      type: [String, Number],
      default: 0
    },
    images: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.images {
  display: flex;
  flex-wrap: wrap;
  img {
    cursor: pointer;
  }
  .multi {
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin: 4px 4px 0 0;
  }
  .single {
    max-height: 200px;
  }
}
</style>
