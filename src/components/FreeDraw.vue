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

const svgPointerEvent = ref(true)

const config_draw = {
  size: 16,
  smoothing: 0.5,
  thinning: 0.5,
  streamline: 0.5,
  easing: (t: any) => t,
  start: {
    taper: 0,
    cap: true,
  },
  end: {
    taper: 0,
    cap: true,
  },
}
const config_linear = { size: 18, start: { taper: true } }

const pathColor = ref('#000000')
async function getCurrentColor(key: string) {
  pathColor.value = '#000000'
}

// 默认是false，橡皮擦效果，直接消失。
// true，不会消失，除非alt
const mode = ref(false)
async function getCurrentMode(key: string) {
  mode.value = false
}

const points = ref<(number[] | {
  x: number
  y: number
  pressure?: number
})[]>([])
const pathData = ref('')
const pathDataHistory = ref<{
  path: string
  color: string
}[]>([])
watch(() => points.value, () => {
  const config_option = mode.value ? config_draw : config_linear
  const stroke = getStroke(points.value, config_option)
  pathData.value = getSvgPathFromStroke(stroke)
}, {
  deep: true,
})

watch(svgPointerEvent, (v) => {
  pathData.value = ''
  points.value = []
  pathDataHistory.value = []
})

async function handlePointerDown(e: PointerEvent | any) {
  e.target.setPointerCapture(e.pointerId)

  await getCurrentColor('color')
  await getCurrentMode('mode')
  points.value = [[e.clientX, e.clientY, e.pressure ?? 0.5]]

  if (!mode.value)
    loop()
}

function handlePointerMove(e: PointerEvent | any) {
  if (e.buttons !== 1)
    return
  if (!svgPointerEvent.value)
    return

  points.value = [...points.value, [e.offsetX, e.offsetY, e.pressure]]
}

let timestamp = 0
let interval = 0
function handleUp(e: PointerEvent | any) {
  cancelAnimationFrame(interval)

  if (mode.value) {
    pathDataHistory.value.push({
      path: pathData.value,
      color: pathColor.value,
    })
  }

  pathData.value = ''
}
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
</script>

<template>
  <div class="relative h-60vh w-full">
    <svg
      class="absolute left-0 top-0 h-full w-full touch-none border-5px border-[var(--modal-border)] border-solid"
      :style="{ pointerEvents: svgPointerEvent ? 'auto' : 'none' }"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handleUp"
    >
      <path
        :d="pathData"
        stroke="currentColor"
        fill="currentColor"
      />

      <path
        v-for="(item, index) in pathDataHistory"
        :key="index"
        :d="item.path"
        :stroke="item.color"
        :fill="item.color"
      />
    </svg>
  </div>
</template>
