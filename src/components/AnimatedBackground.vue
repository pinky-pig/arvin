<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: '',
})

const lastUrl = ref('')
const fakeRef = ref<HTMLElement | null>(null)
const realRef = ref<HTMLElement | null>(null)
watch(
  () => props.modelValue,
  async (nVal, oVal) => {
    lastUrl.value = oVal

    startAnimation()
  },
)

async function startAnimation() {
  // 虚假元素开始消失
  if (fakeRef.value) {
    fakeRef.value.animate(
      {
        transform: ['scale(1)', 'scale(1.3)'],
        opacity: [1, 0],
        filter: ['blur(0px)', 'blur(20px)'],
      },
      { duration: 1000, fill: 'forwards' },
    )
  }

  // 真实元素开始出现
  if (realRef.value) {
    realRef.value.animate(
      {
        transform: ['scale(1.5)', 'scale(1)'],
        opacity: [0, 1],
        filter: ['blur(10px)', 'blur(0px)'],
      },
      { duration: 1000, fill: 'forwards' },
    )
  }
}
</script>

<template>
  <div class="box">
    <img ref="realRef" :src="props.modelValue">
    <img ref="fakeRef" class="fake" :src="lastUrl">
  </div>
</template>

<style scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.fake {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
