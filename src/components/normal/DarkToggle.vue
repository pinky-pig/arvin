<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <Icon v-if="isDark" class="h-[16px] w-[16px] " icon="carbon-moon" />
    <Icon v-else class="h-[16px] w-[16px] " icon="carbon-sun" />
  </button>
</template>
