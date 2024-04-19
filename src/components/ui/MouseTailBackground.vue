<script setup lang="ts">
// https://github.com/steveruizok/perfect-freehand
import { getStroke } from 'perfect-freehand'

function getSvgPathFromStroke(stroke: any) {
  if (!stroke.length)
    return ''
  const d = stroke.reduce(
    (acc: any[], [x0, y0]: any, i: number, arr: string | any[]) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...stroke[0], 'Q'],
  )
  d.push('Z')
  return d.join(' ')
}

// 线条配置
const config_linear = { size: 18, start: { taper: true } }

/**
 * 点集的变化，构成线条的路径变化
 */
const points = ref<(number[] | {
  x: number
  y: number
  pressure?: number
})[]>([])
const pathData = ref('')
const stop = watch(() => points.value, () => {
  const config_option = config_linear
  const stroke = getStroke(points.value, config_option)
  pathData.value = getSvgPathFromStroke(stroke)
}, {
  deep: true,
})

/**
 * 监听鼠标移动，添加点集，渲染线条
 */
const { x, y } = useMouse({ type: 'client' })
watch([x, y], (v) => {
  points.value = [...points.value, [v[0], v[1], 0.5]]
})

let timestamp = 0
let interval = 0
onUnmounted(() => {
  cancelAnimationFrame(interval)
  stop()
  pathData.value = ''
})
onMounted(() => {
  loop()
})
/**
 * 创建循环，让点集构成的线条逐渐消失
 */
function loop() {
  const now = Date.now()
  const elapsed2 = now - timestamp
  if (elapsed2 > 32) {
    if (points.value.length > 1) {
      points.value.splice(0, Math.ceil(points.value.length * 0.1))
      timestamp = now
    }
  }
  interval = requestAnimationFrame(loop)
}

/**
 * 按空格键显示隐藏鼠标轨迹
 */
const isShow = ref(true)
onMounted(() => {
  document.addEventListener('keydown', (event) => {
    if (event.key === ' ')
      isShow.value = !isShow.value
  })
})
</script>

<template>
  <svg
    v-show="isShow"
    class="pointer-events-none fixed left-0 top-0 z-999 h-full w-full touch-none"
  >
    <path
      :d="pathData"
      stroke="currentColor"
      fill="currentColor"
      opacity="0.1"
    />

  </svg>
</template>
