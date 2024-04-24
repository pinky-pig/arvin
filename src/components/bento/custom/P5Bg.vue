<script setup lang="ts">
import p5 from 'p5'

const palettes_light = [
  '#FAEBD7',
  '#F8BDEB',
  '#dcdcdc',
  '#c0504f',
  '#68b9b0',
  '#f29479',
  '#8c6677',
  '#588157',
  '#f7cad0',
  '#ff85a1',
  '#3a5a40',
  '#dad7cd',
]
const palettes_dark = [
  '#022450',
  '#352F44',
  '#2D4356',
  '#435B66',
  '#352F44',
  '#321E1E',
  '#212A3E',
  '#000000',
  '#393053',
  '#261C2C',
  '#3F4E4F',
  '#041C32',
]

const p5sketchRef = ref<HTMLDivElement | null>(null)
const p5Instance = ref<any | null>(null)
onMounted(() => {
  p5Instance.value = initP5Canvas()
})

// watch(isDark, () => {
//   handelRedraw()
// })
function initP5Canvas() {
  if (!p5sketchRef.value)
    return

  const p5sketch = (p5: any) => {
    p5.setup = () => {
      p5.createCanvas(
        p5.canvas?.parentNode?.clientWidth || 100,
        p5.canvas?.parentNode?.clientHeight || 100,
      )
      p5.noLoop()
      p5.colorMode(p5.HSL, 360, 100, 100, 100) // HSL 色调值的最大值 饱和度值的最大值 光度值的最大值 透明度值的最大值
    }

    p5.draw = () => {
      const index = p5.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      p5.background(
        isDark.value ? palettes_dark[index] : palettes_light[index],
      )

      drawBackgroundTexture(p5)
    }
  }

  // eslint-disable-next-line new-cap
  return new p5(p5sketch, p5sketchRef.value)
}

function drawBackgroundTexture(p5: any) {
  const padfactor = 1e3
  let e = 3e4
  for (; e--;) {
    p5.x = p5.random(p5.width)
    p5.y = p5.random(p5.height)
    p5.push()
    p5.strokeWeight(0.2)
    p5.stroke(50, 50, p5.random(55, 95), p5.random(1, 15))
    p5.noFill()
    p5.bezier(
      p5.random(-padfactor, p5.width + padfactor),
      p5.random(-padfactor, p5.height + padfactor),
      p5.random(-padfactor, p5.width + padfactor),
      p5.random(-padfactor, p5.height + padfactor),
      p5.random(-padfactor, p5.width + padfactor),
      p5.random(-padfactor, p5.height + padfactor),
      p5.random(-padfactor, p5.width + padfactor),
      p5.random(-padfactor, p5.height + padfactor),
    )
    p5.pop()
  }
}

function handelRedraw() {
  if (p5Instance.value) {
    p5Instance.value.clear()
    p5Instance.value.setup()
    p5Instance.value.redraw()
  }
}
</script>

<template>
  <div>
    <div
      id="p5sketch"
      ref="p5sketchRef"
      class="pointer-events-none relative z-[2] h-full w-full overflow-hidden rounded-[10px]"
    />

    <div
      class="pointer-events-auto absolute left-1/2 top-1/2 z-[99] h-16 w-16 cursor-pointer rounded-[6px] text-white transition-colors duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 !select-none hover:bg-[#FFFFFF30]"
      @click="handelRedraw()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><g fill="currentColor" fill-rule="evenodd"><path d="M47.895 88.097c.001-4.416 3.064-9.837 6.854-12.117l66.257-39.858c3.785-2.277 9.915-2.277 13.707.008l66.28 39.934c3.786 2.28 6.853 7.703 6.852 12.138l-.028 79.603c-.001 4.423-3.069 9.865-6.848 12.154l-66.4 40.205c-3.781 2.29-9.903 2.289-13.69-.01l-66.167-40.185c-3.78-2.295-6.842-7.733-6.84-12.151l.023-79.72zm13.936-6.474l65.834 36.759l62.766-36.278l-62.872-36.918L61.83 81.623zM57.585 93.52c0 1.628-1.065 71.86-1.065 71.86c-.034 2.206 1.467 4.917 3.367 6.064l61.612 37.182l.567-77.413s-64.48-39.322-64.48-37.693zm76.107 114.938l60.912-38.66c2.332-1.48 4.223-4.915 4.223-7.679V93.125l-65.135 37.513v77.82z" /><path d="M77.76 132.287c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm32 21c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm-32 16c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm32 21c-4.782 2.762-11.122.735-14.16-4.526c-3.037-5.261-1.622-11.765 3.16-14.526c4.783-2.762 11.123-.735 14.16 4.526c3.038 5.261 1.623 11.765-3.16 14.526zm78.238-78.052c-4.783-2.762-11.122-.735-14.16 4.526c-3.037 5.261-1.623 11.765 3.16 14.526c4.783 2.762 11.123.735 14.16-4.526c3.038-5.261 1.623-11.765-3.16-14.526zm-16.238 29c-4.782-2.762-11.122-.735-14.16 4.526c-3.037 5.261-1.622 11.765 3.16 14.526c4.783 2.762 11.123.735 14.16-4.526c3.038-5.261 1.623-11.765-3.16-14.526zm-17 28c-4.782-2.762-11.122-.735-14.16 4.526c-3.037 5.261-1.622 11.765 3.16 14.526c4.783 2.762 11.123.735 14.16-4.526c3.038-5.261 1.623-11.765-3.16-14.526zM128.5 69c-6.351 0-11.5 4.925-11.5 11s5.149 11 11.5 11S140 86.075 140 80s-5.149-11-11.5-11z" /></g></svg>
    </div>
  </div>
</template>
