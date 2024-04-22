<script setup lang="ts">
import {
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardPropsEmits,
} from 'radix-vue'

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: string }>(),
  {
    sideOffset: 4,
  },
)
const emits = defineEmits<PopoverContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        `
          z-50 w-72 p-4 rounded-md border
          bg-[#474d63] text-white
           shadow-md outline-none

           data-[state=open]:animate-ease
           data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0
           data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95
           data-[state=open]:zoom-in-95
           data-[side=bottom]:slide-in-from-top-2
           data-[side=left]:slide-in-from-right-2
           data-[side=right]:slide-in-from-left-2
           data-[side=top]:slide-in-from-bottom-2

          ${props.class}
        `
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
