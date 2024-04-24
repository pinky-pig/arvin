<script setup lang="ts">
import WeeklyBoard from './WeeklyBoard.vue'
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 top-0 h-vh w-vw flex flex-col overflow-hidden">
    <div class="h-[130px] w-full flex flex-shrink-0 items-center justify-center gap-4">
      <div class="btn">
        总览
      </div>
      <div class="btn">
        组件
      </div>
      <div class="btn">
        博客
      </div>
      <div class="btn">
        项目
      </div>
    </div>

    <div class="w-full flex-1 overflow-auto bg-red-200 p-4">
      <WeeklyBoard />
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: home
  </route>
