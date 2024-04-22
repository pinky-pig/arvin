<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'radix-vue'

const props = defineProps<DialogTitleProps & { class?: string }>()
</script>

<template>
  <DialogTitle
    v-bind="props"
    class="text-lg text-foreground font-semibold leading-none tracking-tight"
    :class="props.class"
  >
    <slot />
  </DialogTitle>
</template>
