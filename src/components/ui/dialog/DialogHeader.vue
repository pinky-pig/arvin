<script setup lang="ts">
interface DialogHeaderProps {
  class?: string
}

const props = defineProps<DialogHeaderProps>()
</script>

<template>
  <div
    class="flex flex-col space-y-2 text-center sm:text-left"
    :class="props.class"
  >
    <slot />
  </div>
</template>
