<script setup lang="ts">
import {
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useEmitAsProps,
} from 'radix-vue'

const props = defineProps<DialogContentProps & { class?: string }>()
const emits = defineEmits<DialogContentEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="bg-background/80 fixed inset-0 z-50 bg-[#00000034] backdrop-blur-5px"
    />
    <Teleport to="body">
      <DialogContent
        class="fixed left-[50%] top-[50%] z-[100] max-h-[85vh] max-w-[450px] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=closed]:animate-[dialog-out] data-[state=open]:animate-[dialog-in] focus:outline-none"
        :class="props.class"
        v-bind="{ ...props, ...emitsAsProps }"
      >
        <slot />
      </DialogContent>
    </Teleport>
  </DialogPortal>
</template>
