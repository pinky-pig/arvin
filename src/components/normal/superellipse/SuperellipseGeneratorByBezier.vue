<script setup lang="ts">
const path = ref('')
const squircleOpts = reactive({
  curvature: 0.75,
  scale: 150,
  rotation: 0,
  fill: '#FADB5F',
})

function setPath(w = 100, h = 100, curvature = 0.5) {
  const curveWidth = (w / 2) * (1 - curvature)
  const curveHeight = (h / 2) * (1 - curvature)
  return `
    M 0, ${h / 2}
    C 0, ${curveWidth} ${curveHeight}, 0 ${w / 2}, 0
    S ${w}, ${curveHeight} ${w}, ${h / 2}
        ${w - curveWidth}, ${h - 0} ${w / 2}, ${h}
        0, ${w - curveHeight} 0, ${h / 2}
  `
}

onMounted(() => {
  path.value = setPath(squircleOpts.scale, squircleOpts.scale, squircleOpts.curvature)
})
</script>

<template>
  <div class="generator-preview">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <path
        :d="path"
        :transform="
          `rotate(
              ${squircleOpts.rotation},
              100,
              100
            )
           translate(
            ${(200 - squircleOpts.scale) / 2}
            ${(200 - squircleOpts.scale) / 2}
          )`
        "
        :fill="squircleOpts.fill"
      />
    </svg>
  </div>
</template>

<style scoped>
.generator-preview {
  position: relative;
  width: 100%;
  justify-self: center;
  background: #fff;
  border-radius: 24px;
}

.generator-preview::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  border: 2px dashed var(--grey-100);
  border-radius: 24px;
}

.generator-preview::before {
  content: '';
  display: block;
  padding-bottom: 100%;
}

.generator-preview svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media only screen and (max-width: 62rem) {
  .generator-preview {
    max-width: 280px;
    margin-bottom: var(--spacing-3);
  }
}
</style>
