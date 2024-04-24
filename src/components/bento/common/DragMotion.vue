<script setup lang="ts">
import { Icon } from '@iconify/vue'
const isOpen = ref(false)
</script>

<template>
  <ShadowCard class="!p-[5px]">
    <div class="h-full w-full flex flex-col items-center justify-center gap-6 pr-4 text-[--text-color]" @click="isOpen = !isOpen">
      <span class="pointer-events-auto mr-[35px] w-[100px] cursor-pointer text-3xl font-extrabold underline underline-transparent underline-offset-4 underline-dashed transition-all duration-300 ease-in-out hover:underline-[--text-color]">
        Wave drag
      </span>
      <Icon icon="fluent-emoji:taxi" class="pointer-events-auto ml-auto cursor-pointer border-b-2 border-transparent border-dashed text-3xl transition-all duration-300 ease-in-out hover:border-[--text-color]"  />
    </div>

    <Teleport v-if="isOpen" to="body">
      <div class="pointer-events-none fixed inset-0 left-0 top-0 z-99 h-full w-full">
        <WaveMotion v-show="isOpen" @dblclick="isOpen = false">
          <img class="pointer-events-none h-auto max-w-[300px] select-none !w-[300px]" src="/stickers/Tesla.png">
        </WaveMotion>
      </div>
    </Teleport>
  </ShadowCard>
</template>
