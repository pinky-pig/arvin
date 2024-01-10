<script setup lang="ts">
</script>

<template>
  <div class="relative select-none overflow-hidden bg-[var(--card--bg)]">
    <img
      class="lozad pointer-events-none h-180px w-370px select-none object-fill"
      :style="{ opacity: isDark ? 0 : 1 }"
      src="/wrap-bg.svg"
      alt=""
    >
    <img
      class="lozad pointer-events-none absolute left-0 top-0 h-180px h-auto w-370px select-none object-fill"
      src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesweekly.webp"
      style="transform: rotate(330deg) translate3d(100px, 10px, 10px);"
      alt=""
    >

    <a class="detail-arrow" href="https://weekly.mmeme.me/" target="_blank">
      <div class="h-16px w-16px" i-carbon-arrow-up-right />
    </a>
  </div>
</template>

<style scoped>
.detail-arrow{
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

.detail-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
</style>
