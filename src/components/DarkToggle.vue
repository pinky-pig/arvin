<script setup lang="ts">
// useHead({
//   meta: [{
//     id: 'theme-color',
//     name: 'theme-color',
//     content: () => isDark.value ? '#222222' : '#ffffff',
//   }],
// })
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </button>
</template>
