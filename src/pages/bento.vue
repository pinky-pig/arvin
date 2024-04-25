<script lang="ts">
import { bentoCommonComponentsCfg, bentoCustomComponentsCfg } from '~/config/param'
/**
 * 获取所有 Bento 通用首页组件的配置。
 * @returns 配置
 */
async function getCommonComponents() {
  const commons = await Promise.all(
    Object.entries(
      import.meta.glob('~/components/bento/common/*.vue'),
    )
      .map(async ([path, resolver]) => {
        const componentName = (path.split('/') as any).pop().split('.')[0]
        const component = markRaw((await resolver() as any).default)
        return [componentName, component]
      })
    ,
  )

  const commonsMap = new Map(commons.map(item => [item[0], item[1]]))

  const commonConfig = bentoCommonComponentsCfg.map(item => ({
    ...item,
    component: commonsMap.has(item.id) ? commonsMap.get(item.id) : commonsMap.get('NoneCommonCell'),
  }))

  return commonConfig
}

/**
 * 获取所有 Bento 自定义组件的配置。
 * @returns 配置
 */
async function getCustomComponents() {
  const custom = await Promise.all(
    Object.entries(
      import.meta.glob('~/components/bento/custom/*.vue'),
    )
      .map(async ([path, resolver]) => {
        const componentName = (path.split('/') as any).pop().split('.')[0]
        const component = markRaw((await resolver() as any).default)
        return [componentName, component]
      })
    ,
  )

  const customMap = new Map(custom.map(item => [item[0], item[1]]))

  const customConfig = bentoCustomComponentsCfg.map(item => ({
    ...item,
    component: customMap.has(item.id) ? customMap.get(item.id) : customMap.get('NoneCustomCell'),
  }))

  return customConfig
}
</script>

<script setup lang="ts">
// eslint-disable-next-line import/first, import/order
import { Bento } from 'v3-bento'

const commonComponents = await getCommonComponents()
const customComponents = await getCustomComponents()

const bentoCellsInDesktop = [
  ...commonComponents,
  ...customComponents,
]

const bentoCellsInMobile = bentoCellsInDesktop

function print(_val: string, _e: any) {
  // console.log(val, e)
}

const maximumCells = ref(4)
const size = ref(180)
const gap = ref(10)
const containerRef = ref(null)

const isMobileRef = ref(/iPhone|iPod|Android|Mobile/i.test(navigator.userAgent))
const disabled = ref(isMobileRef.value)
const bentoCells = ref(document.body.clientWidth <= 768 ? bentoCellsInMobile : bentoCellsInDesktop)
const mobileTouchAction = computed(() => isMobileRef.value ? 'unset' : 'none')

if (document.body.clientWidth <= 768) {
  // 如果是宽度比较小
  maximumCells.value = 2
  size.value = (document.body.clientWidth - 50) / 2
}
else {
  maximumCells.value = 4
}

const { width } = useWindowSize()
watch(width, () => {
  // 这里有点小闪动，是因为整体 mediaQuery 的原因
  if (width.value < 380) {
    size.value = Math.max(width.value / 2 - gap.value, 100)
    maximumCells.value = 2
  }
  else if (Math.ceil(width.value / (size.value + gap.value)) <= 6) {
    maximumCells.value = Math.floor(width.value / (size.value + gap.value))
  }
  else { maximumCells.value = 6 }
}, {
  immediate: true,
})
</script>

<template>
  <div
    class="text-xl text-gray-400 flex justify-center gap-3"
  >
    <div
      ref="containerRef"
      class="grid mx-auto w-full select-none place-items-center"
    >
      <client-only>
        <Bento
          :bento-cells="bentoCells"
          class="bento-container"
          :size="size"
          :gap="gap"
          :disabled="disabled"
          :maximum-cells="maximumCells"
          @drag-start="print('drag-start', $event)"
          @drag-end="print('drag-end', $event)"
        >
          <template #bento-item-placeholder>
            <div class="h-full w-full rounded-[12px] bg-current opacity-10" />
          </template>
        </Bento>
      </client-only>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.bento-container {
  margin-left: auto;
  margin-right: auto;
}
:deep(.bento-item-placeholder) {
  border-radius: 12px !important;
  background-color: var(--card--placeholder-bg) !important;
}
:deep(.bento-item) {
  touch-action: v-bind(mobileTouchAction);
}
</style>
