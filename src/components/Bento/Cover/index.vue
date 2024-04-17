<script setup lang="ts">
import CoverContent from './Content.vue'
</script>

<template>
  <div class="cover-container rounded-10px relative h-full w-full overflow-hidden bg-[var(--cover-main-color)]">
    <CoverContent class="pointer-events-none absolute left-1/2 top-1/2 h-9/10 w-9/10 -translate-1/2" />

    <!-- bg1 -->
    <div class="mask-1" />

    <!-- linear1 -->
    <div class="linear-1" />
    <div class="linear-2" />
  </div>
</template>

<style scoped>
.cover-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/noise-light.png);
  background-repeat: repeat;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  color: rgb(255, 250, 221);
}
.mask-1 {
  position: absolute;
  right: 20px;
  top: 50%;
  height: 90%;
  width: 60%;
  background-color: white;
  transform: translateY(-50%);
  backdrop-filter: blur(16px);
  opacity: 0.05;
  border-radius: 10px;
  z-index: -1;
  pointer-events: none;
}
.linear-1 {
  position: absolute;
  width: 220px;
  height: 220px;
  right: -20px;
  top: 60px;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(40px);
  background-color: #7d2bf9;
  pointer-events: none;
}
.linear-2 {
  position: absolute;
  width: 220px;
  height: 220px;
  right: 10px;
  bottom: 50px;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(60px);
  background-color: #357c36;
  mix-blend-mode: difference;
  pointer-events: none;
}
</style>
