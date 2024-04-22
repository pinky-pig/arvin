<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'

const props = defineProps<DialogDescriptionProps & { class?: string }>()
</script>

<template>
  <DialogDescription
    v-bind="props"
    class="text-muted-foreground text-sm"
    :class="props.class"
  >
    <slot />
  </DialogDescription>
</template>
