<script setup lang="ts">
const props = defineProps({
  background: {
    type: String,
    required: false,
    default: 'var(--dockbar-placeholder-bg)',
  },
  borderColor: {
    type: String,
    required: false,
    default: 'var(--dockbar-placeholder-bg)',
  },
  tooltip: {
    type: String,
    required: false,
  },
  hasDivideLine: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="dockbar-tooltip shrink-0 animate-jelly w-8 h-8 border-2 aspect-square rounded-full"
    :style="{ backgroundColor: props.background, borderColor: props.borderColor }"
    @click="emit('click')"
  >
    <span class="dockbar-tooltiptext">{{ props.tooltip }}</span>

    <div class=" w-16px h-16px m-auto text-16px">
      <slot />
    </div>
  </button>

  <div v-show="props.hasDivideLine" class="h-5">
    <div :style="{ background: props.background }" class="mx-1.5 w-px h-full" />
  </div>
</template>

<style scoped>
.dockbar-tooltip {
  position: relative;
  display: inline-block;
}
.dockbar-tooltip:hover .dockbar-tooltiptext {
  visibility: visible;
}
.dockbar-tooltip .dockbar-tooltiptext {
  text-align: center;
  font-size: .875rem;
  line-height: 1.25rem;
  visibility: hidden;
  width: 120px;
  color: var(--dockbar-text);
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
}
.animate-jelly:hover {
  animation: jelly .5s;
}
@keyframes jelly {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(.9, 1.1);
  }
  50% {
    transform: scale(1.1, .9);
  }
  75% {
    transform: scale(.95, 1.05);
  }
}
</style>
