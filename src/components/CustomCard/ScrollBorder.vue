<script setup lang="ts">
const props = defineProps({
  scrollColor: {
    type: Array,
    default: () => ['#fff', '#000'],
  },
})

const scrollColor1 = ref(props.scrollColor[0])
const scrollColor2 = ref(props.scrollColor[1])

watch(() => props.scrollColor, () => {
  scrollColor1.value = props.scrollColor[0]
  scrollColor2.value = props.scrollColor[1]
})
</script>

<template>
  <div class="sbc-container-outer">
    <div class="sbc-container-inner">
      <slot class="w-full h-full" />
    </div>
  </div>
</template>

<style scoped>
.sbc-container-outer {
  align-items: stretch;
  border: 4px solid black;
  padding: 0.5rem;
  font-size: 1rem;
  background: linear-gradient(
     -45deg,
     v-bind(scrollColor1),
     v-bind(scrollColor1), 25%,
     v-bind(scrollColor2) 25%,
     v-bind(scrollColor2) 50%,
     v-bind(scrollColor1), 50%,
     v-bind(scrollColor1), 75%,
     v-bind(scrollColor2) 75%,
     v-bind(scrollColor2) 100%
  );
  background-size: 40px 40px;
  -webkit-animation: scrolling-gradient 2s linear infinite;
  animation: scrolling-gradient 2s linear infinite;
}

.sbc-container-inner {
  background: #fff;
  height: 100%;
  padding: 2em;
  border: 4px solid black;
}
@keyframes scrolling-gradient {
  0% {
     background-position: 0;
  }
  100% {
     background-position: 40px;
  }
}
</style>
