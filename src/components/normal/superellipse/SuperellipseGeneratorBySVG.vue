<script setup lang="ts">
const pathString = ref('')

// 绘制超椭圆的路径
pathString.value = await getSuperellipsePath()
const $path = ref<SVGPathElement | null>(null)
const svgViewbox = ref({ x: 0, y: 0, width: 200, height: 200 })
onMounted(() => {
  const bbox = $path.value!.getBBox()
  svgViewbox.value = {
    x: bbox.x,
    y: bbox.y,
    width: bbox.width,
    height: bbox.height,
  }
})
async function getSuperellipsePath(
  a = 50, // X 轴半径
  b = 50, // Y 轴半径
  nX = 4, // X 轴幂指数
  nY = 4, // Y 轴幂指数
  steps = 360, // 点的个数
) {
  // 计算超椭圆的路径点
  const nX2 = 2 / nX
  const nY2 = 2 / nY
  const points = await Array.from({ length: steps }, (_, i) => {
    const t = (i * 2 * Math.PI) / steps
    const cosT = Math.cos(t)
    const sinT = Math.sin(t)
    const x = Math.abs(cosT) ** nX2 * a * Math.sign(cosT)
    const y = Math.abs(sinT) ** nY2 * b * Math.sign(sinT)
    return { x, y }
  })
  return `${points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')} Z`
}
</script>

<template>
  <svg
    :viewBox="`${svgViewbox.x} ${svgViewbox.y} ${svgViewbox.width} ${svgViewbox.height}`"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <path
      ref="$path"
      :d="pathString"
      fill="currentColor"
    />
  </svg>
</template>
