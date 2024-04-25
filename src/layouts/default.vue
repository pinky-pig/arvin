<script setup lang="ts">
import { currentTransitionName } from '~/logics/index'

const route = useRoute()

const whitelist = ['/blog/content-sidebar']
const isNoneLayout = computed(() => whitelist.includes(route.path))

const isLargeScreen = useMediaQuery('(min-width: 720px)')

/**
 * 文档图片放大预览
 */
const imageModel = ref<HTMLImageElement>()
useEventListener('click', async (e) => {
  const path = Array.from(e.composedPath())
  const first = path[0]
  if (!(first instanceof HTMLElement))
    return
  if (first.tagName !== 'IMG')
    return
  if (first.classList.contains('no-preview'))
    return
  if (path.some(el => el instanceof HTMLElement && ['A', 'BUTTON'].includes(el.tagName)))
    return
  if (!path.some(el => el instanceof HTMLElement && el.classList.contains('prose')))
    return

  // Do not open image when they are moving. Mainly for mobile to avoid conflict with hovering behavior.
  const pos = first.getBoundingClientRect()
  await new Promise(resolve => setTimeout(resolve, 50))
  const newPos = first.getBoundingClientRect()
  if (pos.left !== newPos.left || pos.top !== newPos.top)
    return

  imageModel.value = first as HTMLImageElement
})
</script>

<template>
  <main
    id="main-root"
    class="bg-[var(--bg-main-color)]"
    :class="isNoneLayout ? '' : 'pt-[100px] pb-20 px-[10px] md:px-5 overflow-x-hidden min-h-screen md:pt-[112px] '"
  >
    <Header v-show="!isLargeScreen || !isNoneLayout" />
    <RouterView v-slot="{ Component }">
      <Transition :name="currentTransitionName || 'page'" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </Transition>
    </RouterView>

    <Transition name="fade">
      <div v-if="imageModel" class="fixed bottom-0 left-0 right-0 top-0 z-[500] backdrop-blur " @click="imageModel = undefined">
        <div class="absolute bottom-0 left-0 right-0 top-0 z-[-1] bg-black:30" />
        <img class="mx-auto h-[calc(100%_-_20px)] mt-[10px] w-[calc(100%_-_20px)] object-contain" :src="imageModel.src" :alt="imageModel.alt">
      </div>
    </Transition>

    <!-- 阳光 -->
    <!-- <SunThroughWindow /> -->

    <client-only>
      <!-- 鼠标轨迹暂时移除 -->
      <!-- <MouseTailBackground /> -->
    </client-only>
  </main>
</template>

<style>
#main-root::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  pointer-events: none;
  background-size: cover;
  background-image: url("data:image/svg+xml,%3Csvg width='842' height='595' viewBox='0 0 842 595' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_2_17)'%3E%3Cg opacity='0.4' filter='url(%23filter0_f_2_17)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M873.139 -138H-32.0396V-99.2928H873.139V-138ZM873.139 84.9079V37.3208L-32.0396 155.833V244.746L873.139 84.9079ZM873.139 129.307V176.894L-32.0396 416.651V327.852L873.139 129.307ZM873.139 268.995V221.408L-32.0396 499.872V588.67L873.139 268.995ZM873.139 361.095V313.508L-32.0396 671.777V684.3H140.89L873.139 361.095ZM873.139 -7.1925V-54.7796L-32.0396 -16.1862V72.7264L873.139 -7.1925ZM873.139 405.608V453.081L436.773 684.3H297.427L873.139 405.608ZM873.139 635.575V497.595L546.975 684.3H794.814L873.139 635.575Z' fill='url(%23paint0_linear_2_17)'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_f_2_17' x='-56.0396' y='-162' width='953.179' height='870.3' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeGaussianBlur stdDeviation='12' result='effect1_foregroundBlur_2_17'/%3E%3C/filter%3E%3ClinearGradient id='paint0_linear_2_17' x1='-77.3571' y1='590.972' x2='907.949' y2='590.972' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-opacity='0.13'/%3E%3Cstop offset='1'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_2_17'%3E%3Crect width='842' height='595' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
}
</style>
