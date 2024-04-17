import { markRaw } from 'vue'
/**
 * 这里代码区分了移动端可桌面端，还有 Bento 的通用组件和自定义组件，酌情配置吧。
 */
const commonComponents = await getCommonComponents()
const customComponents = await getCustomComponents()

export const bentoCellsInDesktop = [
  ...commonComponents,
  ...customComponents,
]

export const bentoCellsInMobile = bentoCellsInDesktop

/**
 * 获取所有 Bento 通用首页组件的配置。
 * @returns 配置
 */
async function getCommonComponents() {
  const commons = await Promise.all(
    Object.entries(
      import.meta.glob('~/components/Bento/Common/*.vue'),
    )
      .map(async ([path, resolver]) => {
        const componentName = (path.split('/') as any).pop().split('.')[0]
        const component = markRaw((await resolver() as any).default)
        return [componentName, component]
      })
    ,
  )

  const commonsMap = new Map(commons.map(item => [item[0], item[1]]))

  const commonConfig = [
    { id: 'Profile', x: 0, y: 0, width: 2, height: 2, index: 0, component: commonsMap.get('Profile') },
    { id: 'Weekly', x: 2, y: 0, width: 2, height: 1, index: 0, component: commonsMap.get('Weekly') },
    { id: 'Mapbox', x: 0, y: 1, width: 2, height: 1, index: 0, component: commonsMap.get('Mapbox') },
    { id: 'Dark', x: 3, y: 1, width: 1, height: 1, index: 0, component: commonsMap.get('Dark') },
    { id: 'CountDown', x: 3, y: 1, width: 2, height: 1, index: 0, component: commonsMap.get('CountDown') },
    { id: 'Twitter', x: 4, y: 1, width: 1, height: 1, index: 0, component: commonsMap.get('Twitter') },
    { id: 'PlaneView', x: 0, y: 2, width: 1, height: 2, index: 0, component: commonsMap.get('PlaneView') },
    { id: 'DragMotion', x: 3, y: 2, width: 1, height: 1, index: 0, component: commonsMap.get('DragMotion') },
    { id: 'Notion', x: 3, y: 2, width: 1, height: 1, index: 0, component: commonsMap.get('Notion') },
  ]

  return commonConfig
}
/**
 * 获取所有 Bento 自定义组件的配置。
 * @returns 配置
 */
async function getCustomComponents() {
  const custom = await Promise.all(
    Object.entries(
      import.meta.glob('~/components/Bento/Custom/*.vue'),
    )
      .map(async ([path, resolver]) => {
        const componentName = (path.split('/') as any).pop().split('.')[0]
        const component = markRaw((await resolver() as any).default)
        return [componentName, component]
      })
    ,
  )

  const customMap = new Map(custom.map(item => [item[0], item[1]]))

  const customConfig = [
    { id: 'StrokeText', x: 2, y: 2, width: 1, height: 1, index: 0, component: customMap.get('StrokeText') },
    // { id: 'SwitchImage', x: 2, y: 3, width: 2, height: 1, index: 0, component: customMap.get('SwitchImage') },
    { id: 'Sticker8', x: 3, y: 3, width: 1, height: 1, index: 0, component: customMap.get('Sticker8') },
    { id: 'Cover', x: 0, y: 2, width: 1, height: 2, index: 0, component: customMap.get('Cover') },
  ]

  return customConfig
}
