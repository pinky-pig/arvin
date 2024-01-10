<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: '',
  },

})
</script>

<template>
  <!-- 最外层 Border -->
  <div class="out-box" :class="props.class">
    <!-- 里面一层 Border -->
    <div class="inner-box-1">
      <!-- 里面第二层 border -->
      <div class="inner-box-2">
        <!-- 里面表盘 -->
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.out-box{
  position: relative;
  border-radius: 20px !important;
  padding: 10px;
  position: relative;
  overflow: hidden;
  background: var(--shadow-block-outer-bg);
  /* box-shadow: 20px 20px 60px #d5d4d4,
              -20px -20px 60px #ffffff; */
}

.inner-box-1{
  pointer-events: none;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: var(--shadow-block-inner-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.inner-box-2{
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 15px;
  background: var(--shadow-block-inner-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px #d5d4d4;
  display: flex;
  place-items: center;
}

.content{
  color: var(--shadow-block-content-text);
  /* 这里因为 inner-box-2 的 border-radius 是 15px ， padding 是 5px ，所以这里设置为 15 - 5 = 10 px */
  border-radius: 10px;
  width: 100%;
  height: 100%;
  background: var(--shadow-block-content-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: inset 15px 7px 27px #d5d4d4, inset 0px 0px 8px #ffffff; */
}
</style>
