<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <ShadowCard class="!p-[5px]">
    <div
      class="h-full w-full flex flex-col items-center justify-center gap-[10px] text-[--text-color]"
      @click="isOpen = true"
    >
      <p class="en pointer-events-auto mr-[50px] w-[100px] cursor-pointer text-3xl font-extrabold transition-all duration-300 ease-in-out">
        Stroke Text
      </p>
      <span class="cn pointer-events-auto cursor-pointer text-4xl font-extrabold transition-all duration-300 ease-in-out">描边字体</span>
    </div>
  </ShadowCard>
</template>

<style scoped>
.en {
  color: var(--text-color);
  -webkit-text-stroke: unset;
  text-shadow: unset;
}
.en:hover {
  color: transparent;
  -webkit-text-stroke: 1px var(--text-color);
  text-shadow: rgb(253 241 0) 0 0 20px;
}

.cn {
  color: transparent;
  -webkit-text-stroke: 1px var(--text-color);
  text-shadow: unset;
}
.cn:hover {
  color: var(--text-color);
  -webkit-text-stroke: unset;
  text-shadow: rgb(107 145 171) 0 0 20px;
}
</style>
