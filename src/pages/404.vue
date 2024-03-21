<script setup lang="ts">
import AnimatedBackground from '~/components/AnimatedBackground.vue'

const wallpapers = [
  'https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?q=80&w=5069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1652932374553-3ee7a4343a2a?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1516834493344-d0832e78ce8d?q=80&w=5064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const currentImgIndex = ref(0)

function handleSwitch() {
  currentImgIndex.value = (currentImgIndex.value + 1) % wallpapers.length
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <button @click="handleSwitch">
      Change
    </button>
    <div
      class="h-600px w-600px overflow-hidden"
    >
      <AnimatedBackground
        v-model="wallpapers[currentImgIndex]"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
