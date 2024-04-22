<script setup lang="ts">
interface DialogFooterProps {
  class?: string
}

const props = defineProps<DialogFooterProps>()
</script>

<template>
  <div
    class="flex flex-col space-y-2 sm:space-y-0 mt-1.5 sm:flex-row sm:justify-end sm:space-x-2"
    :class="props.class"
  >
    <slot />
  </div>
</template>
