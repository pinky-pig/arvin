<script setup lang="ts">
onMounted(() => {
  addPaintModule()
})

const container = ref<HTMLElement | null>(null)
const xValue = ref('3')
const yValue = ref('3')
const xyValue = ref('3')
const isChecked = ref(false)

const minpos = 0
const maxpos = 1000
const minval = Math.log(0.6)
const maxval = Math.log(15)
const scale = (maxval - minval) / (maxpos - minpos)
function adjustedValue(position: number) {
  return Number(Math.exp((position - minpos) * scale + minval)).toFixed(2)
}

watch(xValue, (value: any) => {
  const X = adjustedValue(Number(value))
  container.value!.style.setProperty('--smooth-corners', `${X}, ${adjustedValue(Number(yValue.value))}`)
})

watch(xyValue, (value: any) => {
  const XY = adjustedValue(Number(value))
  container.value!.style.setProperty('--smooth-corners', `${XY},${XY}`)
})

watch(yValue, (value: any) => {
  const Y = adjustedValue(Number(value))
  container.value!.style.setProperty('--smooth-corners', `${adjustedValue(Number(xValue.value))}, ${Y}`)
})

function addPaintModule() {
  if (CSS && 'paintWorklet' in CSS) {
    try {
      (CSS as any).paintWorklet.addModule(
        URL.createObjectURL(new Blob([`
        class SmoothCornersPainter {
          static get inputProperties() {
            return ['--smooth-corners']
          }

          superellipse(a, b, nX = 4, nY) {
            if (Number.isNaN(nX))
              nX = 4
            if (typeof nY === 'undefined' || Number.isNaN(nY))
              nY = nX
            if (nX > 100)
              nX = 100
            if (nY > 100)
              nY = 100
            if (nX < 0.00000000001)
              nX = 0.00000000001
            if (nY < 0.00000000001)
              nY = 0.00000000001

            const nX2 = 2 / nX
            const nY2 = nY ? 2 / nY : nX2
            const steps = 360
            const step = (2 * Math.PI) / steps
            const points = (t) => {
              const cosT = Math.cos(t)
              const sinT = Math.sin(t)
              return {
                x: Math.abs(cosT) ** nX2 * a * Math.sign(cosT),
                y: Math.abs(sinT) ** nY2 * b * Math.sign(sinT),
              }
            }
            return Array.from({ length: steps }, (_, i) => points(i * step))
          }

          paint(ctx, geom, properties) {
            const [nX, nY] = properties
              .get('--smooth-corners')
              .toString()
              .replace(/ /g, '')
              .split(',')

            const width = geom.width / 2
            const height = geom.height / 2
            const smooth = this.superellipse(
              width,
              height,
              Number.parseFloat(nX),
              Number.parseFloat(nY),
            )

            ctx.fillStyle = '#000'
            ctx.setTransform(1, 0, 0, 1, width, height)
            ctx.beginPath()

            for (let i = 0; i < smooth.length; i++) {
              const { x, y } = smooth[i]
              if (i === 0)
                ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }

            ctx.closePath()
            ctx.fill()
          }
        }

        try {
          // eslint-disable-next-line no-undef
          registerPaint('smooth-corners', SmoothCornersPainter)
        }
        catch (e) {}

        `], { type: 'application/javascript' }))
        ,
      )
    }
    catch (error) {
      console.error('CSS paintWorklet addModule :', error)
    }
  }
}
</script>

<template>
  <div>
    <div ref="container">
      <div class="mask" />
      <div v-if="isChecked">
        <input id="rangeX" v-model="xValue" type="range" min="0" max="1000" step="0.1">
        <label id="valueX" for="rangeX" class="value">{{ xValue }}</label>
        <input id="rangeY" v-model="yValue" type="range" min="0" max="1000" step="0.1">
        <label id="valueY" for="rangeY" class="value">{{ yValue }}</label>
      </div>
      <div v-else>
        <input id="rangeXY" v-model="xyValue" type="range" min="0" max="1000" step="0.1">
        <label id="valueXY" for="rangeXY" class="value">{{ yValue }}</label>
      </div>
      <div class="left">
        <input id="assymetricalToggle" type="checkbox" @click="isChecked = !isChecked">
        <label for="assymetricalToggle">Assymetrical superellipses</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  width: 100px;
  height: 100px;
  background: linear-gradient(#f34072, #d01257);
  mask-image: paint(smooth-corners);
  -webkit-mask-image: paint(smooth-corners);
}
</style>
