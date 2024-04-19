<script setup lang="ts">
// 1. 具有两个动画，一个是上下浮动，一个是拖拽的时候会有小幅度旋转
// 2. 拖拽的时候，根据速度计算旋转幅度，这个时候上下浮动消失
// 3. 拖拽结束后（速度小于一个阈值或者鼠标抬起或者鼠标移动到了外面），旋转幅度取消，上下浮动重新开始

/** ************************设置拖拽和旋转 */

import { useMotion } from '@vueuse/motion'

const props = defineProps({
  initialPosition: {
    default: () => ({
      x: Math.random() * (window.innerWidth - 400),
      y: Math.random() * (window.innerHeight - 160),
    }),
  },
})
const target = ref<HTMLElement>()
const { apply: waveApply } = useMotion(target, {
  initial: { rotate: 0 },
  enter: { rotate: 0 },
})

async function setRotate(rotate: number) {
  await waveApply({
    rotate,
  })
}

const { x, style, isDragging } = useDraggable(target, { initialValue: props.initialPosition })

let rotationDelta = 0

watch(isDragging, async () => {
  if (isDragging.value) {
    // 拖拽的时候，取消上下浮动
  }
  else {
    // 拖拽结束后，设置旋转角度为 0 ， 恢复上下浮动
    setRotate(0)
    rotationDelta = 0
  }
})
/** */

/** ************************通过速度计算旋转幅度 */
let lastX = x.value
let startTime = performance.now()
// 当前角度 / 当前速度 = 最大角度 / 最大速度
// 得出：当前角度 = ( 最大角度 / 最大速度 ) * 当前速度
// 然后再乘以一个系数，用于调整旋转幅度，角度跟速度的比例
const cfg = {
  maxVelocity: 10, // 最大速度
  maxRotation: 60, // 最大旋转角度
  rotationFactor: 0.8, // 旋转系数，用于调整旋转幅度
}
watch(x, () => {
  const { velocity, newX, newTime } = calVelocity(lastX, x.value, startTime)
  const { maxVelocity, maxRotation, rotationFactor } = cfg
  // 速度除以最大速度，将速度归一化为一个介于 0 和 1 之间的小数值，表示速度相对于最大速度的比例。
  // 将这个比例值乘以最大旋转角度 maxRotation，这样就得到了基于速度的旋转角度
  // 但这得出的仍是一个相对值，最后，再将这个相对的旋转角度乘以旋转系数 rotationFactor，以调整最终的旋转幅度。
  rotationDelta = -(velocity / maxVelocity * maxRotation * rotationFactor)
  setRotate(rotationDelta)
  lastX = newX
  startTime = newTime
})

function calVelocity(lastX: number, currentX: number, lastTime: number, currentTime = performance.now()) {
  const distanceX = currentX - lastX
  const deltaTime = currentTime - lastTime
  return {
    velocity: distanceX / deltaTime,
    newTime: currentTime,
    newX: currentX,
  }
}
/** */
</script>

<template>
  <div
    ref="target" :class="isDragging ? '' : 'element'" :style="style"
    class="pointer-events-auto fixed z-999 grid cursor-pointer touch-none select-none place-items-center rounded-md"
  >
    <svg
      class="scale-70"
      xmlns="http://www.w3.org/2000/svg" direction="ltr" width="499" height="50"
      viewBox="218.68555961942593 1803.897813546187 499 66" stroke-linecap="round" stroke-linejoin="round"
    >
      <defs />
      <g transform="matrix(1, 0, 0, 1, 257.6856, 1829.8978)" opacity="1">
        <g>
          <defs>
            <mask id="shape_dYkvQ8frqn9u5bShF4X_U_clip">
              <rect x="-107" y="-94" width="635" height="202" fill="white" />
              <path
                d="M -7.000142685014907,7.937931690505816&#10;  a 13.5,13.5 0 1,0 27,0&#10;  a 13.5,13.5 0 1,0 -27,0 "
                fill="black" stroke="none"
              />
              <path
                d="M 401.0001426850149,6.062068309494184&#10;  a 13.5,13.5 0 1,0 27,0&#10;  a 13.5,13.5 0 1,0 -27,0 "
                fill="black" stroke="none"
              />
            </mask>
          </defs>
          <g mask="url(#shape_dYkvQ8frqn9u5bShF4X_U_clip)">
            <rect x="-100" y="-100" width="635" height="202" fill="transparent" stroke="none" />
            <path
              d="M-7,8L428,6" fill="none" stroke="currentColor" stroke-width="10" stroke-dasharray="none"
              stroke-dashoffset="none"
            />
          </g>
          <path
            d="M -7.000142685014907,7.937931690505816&#10;  a 13.5,13.5 0 1,0 27,0&#10;  a 13.5,13.5 0 1,0 -27,0 "
            fill="none" stroke="currentColor" stroke-width="10"
          />
          <path
            d="M 401.0001426850149,6.062068309494184&#10;  a 13.5,13.5 0 1,0 27,0&#10;  a 13.5,13.5 0 1,0 -27,0 "
            fill="none" stroke="currentColor" stroke-width="10"
          />
        </g>
      </g>
    </svg>

    <span class="absolute left-72px top-52px select-none text-4xl font-extrabold">
      {{ rotationDelta.toFixed(2) }}
    </span>
    <slot />
  </div>
</template>

<style scoped>
.element {
  animation-name: moveUpDown;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes moveUpDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
