<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: '',
  },

})
</script>

<template>
  <div class="main-container">
    <!-- 最外层 Border -->
    <div class="out-box" :class="props.class">
      <div class="sunrays r1">
        <div class="light" />
      </div>

      <!-- 窗户盖子 -->
      <div class="cap">
        <!-- 窗户的按钮 -->
        <div class="cap-btn" />
      </div>
      <!-- 里面一层 Border -->
      <div class="inner-box-1">
        <!-- 里面第二层 border -->
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 总的盒子样式 */
.main-container {
  /* 背景的颜色 */
  --color-primary: #163245;

  /* 最外层盒子的边框颜色和头部帽子的颜色 */
  --color-second: #1f384b;
  /* 里面盒子的边框颜色 */
  --color-third: #496373;
  /* 光线的颜色 */
  --color-forth: #ffffff30;

  /* 最外层盒子的 border 颜色 */
  --color-border-1: #000000;
  /* 里面盒子的 border 颜色 */
  --color-border-2: #223545;

  pointer-events: none;
  height: fit-content;
  width: fit-content;
  display: grid;
  place-items: center;
  background: var(--color-primary);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
}
.main-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/noise.png');
  background-repeat: repeat;
  opacity: 0.04;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

/* 头部帽子的样式 */
.cap {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  padding-bottom: 4%;
  background: var(--color-second);
  width: 100%;
  height: 10%;
  min-height: 40px;
  box-shadow: 0px 2px 36px #ffffff50;
  z-index: 2;
}
.cap-btn {
  width: 20%;
  height: 14px;
  border-radius: 9999px;
  background: var(--color-second);
  box-shadow:
    0px 0px 10px #00000030,
    inset 0px -2px 2px #435c6d,
    inset 0px 0px 2px #19384f;
}

/* 外面的盒子 */
.out-box {
  overflow: hidden;
  position: relative;
  border-radius: 999999px;
  padding: 10%;
  position: relative;
  background: var(--color-second);
  box-shadow:
    0px 0px 24px #ffffff50,
    0 -1px 0 var(--color-border-1) inset,
    0 1px 0 var(--color-border-1) inset,
    -1px 0 0 var(--color-border-1) inset,
    1px 0 0 var(--color-border-1) inset;
}

.out-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/noise.png');
  background-repeat: repeat;
  opacity: 0.04;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

/* 里面的那个盒子 */
.inner-box-1 {
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding: 8%;
  border-radius: 99999px;
  background: var(--color-third);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow:
    0px 10px 30px #ffffff60,
    0 -2px 0 var(--color-border-2) inset,
    0 2px 0 var(--color-border-2) inset,
    -2px 0 0 var(--color-border-2) inset,
    2px 0 0 var(--color-border-2) inset;
}

.content {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 999999px;
  height: 100%;
  background: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 99999px;
  border: 4px solid var(--color-forth);
}

/* 光线的样式 */
.sunrays {
  position: absolute;
  bottom: 6%;
  right: 16%;
  width: 72%;
  height: 114%;
  filter: blur(3px);
  background: var(--color-forth);
  border-radius: 99999px;
  transform: rotate(348deg);
  clip-path: polygon(0 100%, 0 87%, 100% 45%, 100% 100%);
}
</style>
