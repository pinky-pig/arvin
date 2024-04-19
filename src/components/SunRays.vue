<script setup lang="ts">
const props = defineProps<{
  class?: string
  style?: any
}>()
</script>

<template>
  <div
    class="sunrays"
    :class="props.class"
    :style="props.style"
  >
    <div class="light" />
  </div>
</template>

<style scoped>
.sunrays {
  opacity: 0.8;
  transform-origin: left top;
  perspective: 5px;
  perspective-origin: 50% 0%;
  transform-style: preserve-3d;

  /* 每条光线 */
  height: 100%;
  width: 60px;
  transform: rotate(-0deg);
}

.light {
  width: 100%;
  height: 80%;
  box-shadow: 200px -15px 30px rgb(255, 254, 246);
  transform-origin: 0% 100% 0px;
  transform: rotateX(90deg);
}
</style>
