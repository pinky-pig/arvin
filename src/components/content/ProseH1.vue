<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h4 :id="id">
    <a :href="`#${id}`">
      <slot />
    </a>
  </h4>
</template>
