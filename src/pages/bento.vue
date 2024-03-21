<script setup lang="ts">
import { ref } from 'vue'
import V3bento from 'v3-bento'
import { bentoCellsInDesktop, bentoCellsInMobile } from '~/utils/bento'

function print(_val: string, _e: any) {
  // console.log(val, e)
}
const maximumCells = ref(4)
const size = ref(180)
const gap = ref(10)
const containerRef = ref(null)

const isMobileRef = ref(/iPhone|iPod|Android|Mobile/i.test(navigator.userAgent))
const disabled = ref(isMobileRef.value)
const bentoCells = ref(document.body.clientWidth <= 768 ? bentoCellsInMobile : bentoCellsInDesktop)
const mobileTouchAction = computed(() => isMobileRef.value ? 'unset' : 'none')

if (document.body.clientWidth <= 768) {
  // 如果是宽度比较小
  maximumCells.value = 2
  size.value = (document.body.clientWidth - 50) / 2
}
else {
  maximumCells.value = 4
}

const { width } = useWindowSize()
watch(width, () => {
  // 这里有点小闪动，是因为整体 mediaQuery 的原因
  if (width.value < 380) {
    size.value = Math.max(width.value / 2 - gap.value, 100)
    maximumCells.value = 2
  }
  else if (Math.ceil(width.value / (size.value + gap.value)) <= 6) {
    maximumCells.value = Math.floor(width.value / (size.value + gap.value))
  }
  else { maximumCells.value = 6 }
}, {
  immediate: true,
})
</script>

<template>
  <div
    text="xl gray4"
    flex
    justify-center
    gap-3
  >
    <div
      ref="containerRef"
      grid mx-auto w-full select-none place-items-center
    >
      <V3bento
        class="bento-container"
        :bento-cells="bentoCells"
        :size="size"
        :gap="gap"
        :disabled="disabled"
        :maximum-cells="maximumCells"
        @drag-start="print('drag-start', $event)"
        @drag-end="print('drag-end', $event)"
      />
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.bento-container {
  margin-left: auto;
  margin-right: auto;
}
:deep(.bento-item-placeholder) {
  border-radius: 12px !important;
  background-color: var(--card--placeholder-bg) !important;
}
:deep(.bento-item) {
  touch-action: v-bind(mobileTouchAction);
}
</style>
