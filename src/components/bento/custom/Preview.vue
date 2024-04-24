<script setup lang="ts">
import { Icon } from '@iconify/vue'

const router = useRouter()
function toPreview() {
  router.push('/preview')
}
</script>

<template>
  <ShadowCard
    class="relative select-none overflow-hidden bg-[var(--card--bg)] !p-[5px]"
  >
    <div class="pointer-events-auto absolute left-1/2 top-1/3 h-[40px] w-[6rem] translate-x-[-50%] translate-y-[-50%]">
      <span class="cursor-pointer underline underline-light-50 underline-offset-[8px] hover:text-#fff">
        预览网站
      </span>
    </div>

    <button class="detail-arrow" @click="toPreview">
      <Icon class="h-[16px] w-[16px]" icon="carbon-arrow-up-right" />
    </button>
  </ShadowCard>
</template>

<style scoped>
.detail-arrow {
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  position: absolute;
  left: 12px;
  bottom: 10px;
  color: var(--text-color);
  border-radius: 18px;
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}

.detail-arrow:hover {
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
</style>
