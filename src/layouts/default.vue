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
    class="bg-[var(--bg-main-color)]"
    :class="isNoneLayout ? '' : 'pt-100px md:pt-100px pb-20 px-10px md:px-5 overflow-x-hidden min-h-screen md:pt-112px '"
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
      <div v-if="imageModel" fixed bottom-0 left-0 right-0 top-0 z-500 backdrop-blur-7 @click="imageModel = undefined">
        <div absolute bottom-0 left-0 right-0 top-0 z--1 bg-black:30 />
        <img class="mx-auto h-full w-[calc(100%_-_20px)] object-contain" :src="imageModel.src" :alt="imageModel.alt">
      </div>
    </Transition>

    <client-only>
      <!-- 鼠标轨迹暂时移除 -->
      <!-- <MouseTailBackground /> -->
    </client-only>
    <Footer />
  </main>
</template>
