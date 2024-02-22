---
title: SVG创建画布-缩放平移自适应窗口
date: 2024/01/08
desc: SVG创建画布-缩放平移自适应窗口
tags: ['#全部', '#一般般']
cover: https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f8a6bf6c03e4cd5875ad78af4db681c~tplv-k3u1fbpfcp-watermark.image?
---

[[toc]]

![canvas.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f8a6bf6c03e4cd5875ad78af4db681c~tplv-k3u1fbpfcp-watermark.image?)

在线源码及预览地址：[https://stackblitz.com/edit/vitejs-vite-q5jcer?file=README.md](https://stackblitz.com/edit/vitejs-vite-q5jcer?file=README.md)

主要构思就是一个SVG。新建对象都在这个SVG中，鼠标移动绘制Path。

这里主要讨论一下，平移缩放画布后的位置计算。

初始化，画布尺寸 `[100vw,100vh]`

### 鼠标位置 mouse

这里参考了 https://juejin.cn/post/6883353218319908871

- MouseEvent.clientX 是只读属性， 它提供事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)。例如，不论页面是否有水平滚动，当你点击客户端区域的左上角时，鼠标事件的 clientX 值都将为 0 。
- MouseEvent.clientY 是只读属性， 它提供事件发生时的应用客户端区域的垂直坐标 (与页面坐标不同)。例如，当你点击客户端区域的左上角时，鼠标事件的 clientY 值为 0 ，这一值与页面是否有垂直滚动无关。
- MouseEvent.movementX 是只读属性，它提供了当前事件和上一个mousemove事件之间鼠标在水平方向上的移动值。换句话说，这个值是这样计算的 : currentEvent.movementX = currentEvent.screenX - previousEvent.screenX.
- MouseEvent.movementY 是只读属性，它提供了当前事件和上一个 mousemove 事件之间鼠标在水平方向上的移动值。换句话说，这个值是这样计算的 :currentEvent.movementY = currentEvent.screenY - previousEvent.screenY.
- MouseEvent.offsetX规定了事件对象与目标节点的内填充边（padding edge）在 X 轴方向上的偏移量。
- MouseEvent.offsetY规定了事件对象与目标节点的内填充边（padding edge）在 Y 轴方向上的偏移量。
- MouseEvent.pageX 是一个由MouseEvent接口返回的相对于整个文档的x（水平）坐标以像素为单位的只读属性。这个属性将基于文档的边缘，考虑任何页面的水平方向上的滚动。举个例子，如果页面向右滚动 200px 并出现了滚动条，这部分在窗口之外，然后鼠标点击距离窗口左边 100px 的位置，pageX 所返回的值将是 300。
- MouseEvent.pageY是一个只读属性，它返回触发事件的位置相对于整个 document 的 Y 坐标值。由于其参考物是整个 dom，所以这个值受页面垂直方向的滚动影响。例如：当你垂直方向向下滚动了 50 pixel，那么你在顶端进行点击的时候，获取的pageY为 50pixed 而不是 0。
- MouseEvent.screenX是只读属性，他提供了鼠标相对于屏幕坐标系的水平偏移量。
- MouseEvent.screenY是只读属性，它提供了鼠标相对于屏幕坐标系的垂直偏移量。
- MouseEvent.x 是 MouseEvent.clientX 属性的别名.
- MouseEvent.y 属性是 MouseEvent.clientY 属性的别称。

![offset.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e8e6fc9300d475490a3f62c8c4870b1~tplv-k3u1fbpfcp-watermark.image?)

### 监听

这里监听的是 `onpointerdown onpointermove onpointerup` 代替鼠标的 `mouse-`事件，获取 `pressure` 值。

```ts
function handlePointerDown(e) {
  e.target.setPointerCapture(e.pointerId)
  const pt = eventToLocation(e)
  points.value = [[pt.x, pt.y, e.pressure]]
}

function handlePointerUp(e) {
  draggedEvt = null
}

function handlePointerMove(e) {
  if (isPressedCtrl.value) {
    // 移动画布
    drag(e)
  }
  else {
    if (e.buttons !== 1)
      return
    const pt = eventToLocation(e)
    points.value = [...points.value, [pt.x, pt.y, e.pressure]]
  }
}
```

上面三个方法，按下ctrl键再移动，就是拖拽画布，否则就是将这些点位添加到数组中，用来构造 `path`。
当然，每个点需要经过 `eventToLocation` 方法计算过滤后再添加。
当画布没有拖拽移动的时候，其实经过处理后的坐标没变。拖拽之后，就会在鼠标的位置上添加偏移值。

```ts
// 拖拽方法
let draggedEvt: any = null // 每次的拖拽事件
function drag(event: MouseEvent | TouchEvent) {
  const pt = eventToLocation(event)
  if (draggedEvt) {
    const oriPt = eventToLocation(draggedEvt)
    const x = cfg.value.viewPortX + (oriPt.x - pt.x)
    const y = cfg.value.viewPortY + (oriPt.y - pt.y)
    const w = cfg.value.viewPortWidth
    const h = cfg.value.viewPortHeight
    updateViewPort(x, y, w, h)
  }
  draggedEvt = event
}
```

这里其实只是修改 `viewBox` 起点（前两个值）就可以满足拖拽视图。
首先计算出两次拖拽偏移的差值（鼠标两次值），然后再跟原来的相加就行。

### 平移计算偏移值

```ts
function eventToLocation(event: MouseEvent | TouchEvent, idx = 0): { x: number, y: number } {
  const { top, left } = useElementBounding(svgWrapperRef)
  const touch = event instanceof MouseEvent ? event : event.touches[idx]
  const x = cfg.value.viewPortX + (touch.clientX - left.value)
  const y = cfg.value.viewPortY + (touch.clientY - top.value)
  return { x, y }
}
```

这里使用了`@vueuse`的`useElementBounding`方法获取当前dom距离浏览器的距离。这个方法使用的是
[Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

![images20221116144009.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01b9390c0eea43638a1c2d0e3141a6ff~tplv-k3u1fbpfcp-watermark.image?)

这里使用的`clientX clientY`，因为画布是占满浏览器的，所以这里`pageX(Y) clientX(Y) offsetX(Y)`值是相同的。

```ts
function updateViewPort(x: number, y: number, w: number | null, h: number | null, force = false) {
  if (!svgWrapperRef.value)
    return
  if (w === null && h !== null)
    w = svgWrapperRef.value.offsetWidth * h / svgWrapperRef.value.offsetHeight
  if (h === null && w !== null)
    h = svgWrapperRef.value.offsetHeight * w / svgWrapperRef.value.offsetWidth
  if (!w || !h)
    return
  cfg.value.viewPortX = Number.parseFloat((1 * x).toPrecision(6))
  cfg.value.viewPortY = Number.parseFloat((1 * y).toPrecision(6))
  cfg.value.viewPortWidth = Number.parseFloat((1 * w).toPrecision(4))
  cfg.value.viewPortHeight = Number.parseFloat((1 * h).toPrecision(4))
}
```

这里其实应该主要是赋值给 `cfg` ，然后更新视图。前面几个if判断，主要是为了保证画布的长宽比例要跟外面的盒子的长宽比一致。

### 缩放计算偏移值

经过上面的平移计算，主要得出几点

- 通过调整 `viewBox` 更改视图
- 每个点需要经过 `eventToLocation` 计算
- 平移的点的偏移量主要是计算赋值给 `viewBox` 的前两个值，就是用上一个点的位置 + （这个位置和上个位置的差）

那么放大缩小其实也是一样，

- 通过调整 `viewBox` 更改视图
- 每个点需要经过 `eventToLocation` 计算
- 缩放需要计算四个值

```ts
function handleWheel(e) {
  e.preventDefault()
  const scale = 1.005 ** e.deltaY
  const pt = eventToLocation(e)
  zoomViewPort(scale, pt)
}
function zoomViewPort(scale: number, pt?: { x: number, y: number }) {
  if (!pt)
    pt = { x: cfg.value.viewPortX + 0.5 * cfg.value.viewPortWidth, y: cfg.value.viewPortY + 0.5 * cfg.value.viewPortHeight }
  const x = cfg.value.viewPortX + ((pt.x - cfg.value.viewPortX) - scale * (pt.x - cfg.value.viewPortX))
  const y = cfg.value.viewPortY + ((pt.y - cfg.value.viewPortY) - scale * (pt.y - cfg.value.viewPortY))
  const w = scale * cfg.value.viewPortWidth
  const h = scale * cfg.value.viewPortHeight
  updateViewPort(x, y, w, h)
}
```

监听鼠标滚轮，然后计算当前的鼠标点的位置转成平面坐标。
`zoomViewPort` 计算四个值，然后调用 `updateViewPort` 赋值给 `viewBox`

```ts
const viewPortZoom = ref(1)
function eventToLocation(event: MouseEvent | TouchEvent, idx = 0): { x: number, y: number } {
  const { top, left } = useElementBounding(svgWrapperRef)
  const touch = event instanceof MouseEvent ? event : event.touches[idx]
  const x = cfg.value.viewPortX + (touch.clientX - left.value) * viewPortZoom.value
  const y = cfg.value.viewPortY + (touch.clientY - top.value) * viewPortZoom.value
  return { x, y }
}
```

这里 `eventToLocation()` 方法需要改变了，因为是缩放，之前平移的时候，只是相加减差值，这需要乘上缩放的值（默认为1）

然后 `updateViewPort()` 方法也需要改一下，之前只是设置了视图 `viewBox` 的值，现在多加一句设置zoom缩放的层级。
层级通过画布跟盒子的比例得出，长或者宽都行，这里使用的画布的宽和盒子的宽得出的比例。

```ts
function updateViewPort(x: number, y: number, w: number | null, h: number | null, force = false) {
  if (!svgWrapperRef.value)
    return
  if (w === null && h !== null)
    w = svgWrapperRef.value.offsetWidth * h / svgWrapperRef.value.offsetHeight
  if (h === null && w !== null)
    h = svgWrapperRef.value.offsetHeight * w / svgWrapperRef.value.offsetWidth
  if (!w || !h)
    return
  cfg.value.viewPortX = Number.parseFloat((1 * x).toPrecision(6))
  cfg.value.viewPortY = Number.parseFloat((1 * y).toPrecision(6))
  cfg.value.viewPortWidth = Number.parseFloat((1 * w).toPrecision(4))
  cfg.value.viewPortHeight = Number.parseFloat((1 * h).toPrecision(4))
  // 设置zoom层级
  viewPortZoom.value = cfg.value.viewPortWidth / svgWrapperRef.value.offsetWidth
}
```

### 监听窗口改变后的画布

做完上面的事情之后,会发现有的时候窗口大小修改,但是画布并没有做处理,这样使得再次绘制的时候,鼠标的位置计算有偏差。
这里进行的处理很简单，跟上步平移的操作类似，重新设置一下窗口的 `viewBox` 的后两个值。

```ts
const { width, height } = useElementBounding(svgWrapperRef)
watch([width, height], (newValue, oldValue) => {
  // 过滤一下第一次。因为监听的是dom的长宽，第一次肯定会触发，长宽从0到设置的值。
  // 这个时候的差值就是dom元素本身，而不是窗口偏移的值，所以这个时候跳出方法
  if (oldValue[0] === 0 && oldValue[1] === 0)
    return
  const distanceX = newValue[0] - oldValue[0]
  const distanceY = newValue[1] - oldValue[1]
  const x = cfg.value.viewPortX
  const y = cfg.value.viewPortY
  const w = cfg.value.viewPortWidth + distanceX
  const h = cfg.value.viewPortHeight + distanceY
  updateViewPort(x, y, w, h)
})
```

这里就只需监听窗口的长宽，然后计算差值，赋值给宽高就行了。
第一步的时候，因为dom元素会从0到设置的尺寸，也就是默认这个会走一次，这个时候的差值其实是尺寸本身，如果再设置`viewBox`的话，相当于重复多设置了长宽，这个时候跳出，避免这个问题。

初步测试没什么问题，但是如果先缩放，再改变画布尺寸大小，这样就会出现问题了。

```ts
const distanceX = newValue[0] - oldValue[0]
const distanceY = newValue[1] - oldValue[1]
const w = cfg.value.viewPortWidth + distanceX
const h = cfg.value.viewPortHeight + distanceY
```

在没有经过缩放的时候，`viewPortWidth` 和 `viewPortHeight` 都是跟画布尺寸 1:1 的，这样的差值`distanceX distanceY`计算也是没问题。
但是缩放之后，`viewPortWidth` 和 `viewPortHeight` 是经过 `viewPortZoom` 处理的。
如果只是上面的这样1:1的平移计算，经过缩放后，就会出现问题。只是改变窗口尺寸大小，画布尺寸就会被缩放。如果缩小的过多， w 和 h 为负值，赋值给 `viewBox` 报错。

```ts
const { width, height } = useElementBounding(svgWrapperRef)
watch([width, height], (newValue, oldValue) => {
  if (oldValue[0] === 0 && oldValue[1] === 0)
    return
  const distanceX = (newValue[0] - oldValue[0]) * viewPortZoom.value
  const distanceY = (newValue[1] - oldValue[1]) * viewPortZoom.value
  const x = cfg.value.viewPortX
  const y = cfg.value.viewPortY
  const w = cfg.value.viewPortWidth + distanceX
  const h = cfg.value.viewPortHeight + distanceY
  updateViewPort(x, y, w, h)
})
```

跟以上步骤的处理方法一致，计算差值的时候乘以缩放值。

全部代码如下:

```vue
<script setup lang="ts">
import type { StrokeOptions } from 'perfect-freehand'
import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from '../../utils/index'
const options: StrokeOptions = {
  size: 10,
  thinning: 0.618,
  smoothing: 0.5,
  streamline: 0.5,
}
const points = ref<(number[] | {
  x: number
  y: number
  pressure?: number
})[]>([])
const pathData = ref('')
watch(() => points.value, () => {
  const stroke = getStroke(points.value, options)
  pathData.value = getSvgPathFromStroke(stroke)
})

const { Ctrl } = useMagicKeys()
const isPressedCtrl = ref(false)
watch(Ctrl, (v) => {
  isPressedCtrl.value = v
})
const svgWrapperRef = ref<HTMLElement>()
const cfg = ref({
  viewPortX: 0,
  viewPortY: 0,
  viewPortWidth: 0,
  viewPortHeight: 0,
})
const viewPortZoom = ref(1)
function setViewPort() {
  if (!svgWrapperRef.value)
    return
  cfg.value.viewPortWidth = svgWrapperRef.value.offsetWidth
  cfg.value.viewPortHeight = svgWrapperRef.value.offsetHeight
}
onMounted(() => {
  setViewPort()
})

let draggedEvt: any = null // 每次的拖拽事件
function drag(event: MouseEvent | TouchEvent) {
  const pt = eventToLocation(event)
  if (draggedEvt) {
    const oriPt = eventToLocation(draggedEvt)
    const x = cfg.value.viewPortX + (oriPt.x - pt.x)
    const y = cfg.value.viewPortY + (oriPt.y - pt.y)
    const w = cfg.value.viewPortWidth
    const h = cfg.value.viewPortHeight

    updateViewPort(x, y, w, h)
  }
  draggedEvt = event
}

function eventToLocation(event: MouseEvent | TouchEvent, idx = 0): { x: number, y: number } {
  const { top, left } = useElementBounding(svgWrapperRef)
  const touch = event instanceof MouseEvent ? event : event.touches[idx]
  const x = cfg.value.viewPortX + (touch.clientX - left.value) * viewPortZoom.value
  const y = cfg.value.viewPortY + (touch.clientY - top.value) * viewPortZoom.value
  return { x, y }
}

function updateViewPort(x: number, y: number, w: number | null, h: number | null, force = false) {
  if (!svgWrapperRef.value)
    return

  // 这里的w,h比例应该跟画布的比例相同。虽然在调用这个方法之前计算的w、h也是根据比例计算的。
  // 这里经过下面的计算不出意外得出的值应该跟其之前相同
  if (w === null && h !== null)
    w = svgWrapperRef.value.offsetWidth * h / svgWrapperRef.value.offsetHeight

  if (h === null && w !== null)
    h = svgWrapperRef.value.offsetHeight * w / svgWrapperRef.value.offsetWidth

  if (!w || !h)
    return
  cfg.value.viewPortX = Number.parseFloat((1 * x).toPrecision(6))
  cfg.value.viewPortY = Number.parseFloat((1 * y).toPrecision(6))
  cfg.value.viewPortWidth = Number.parseFloat((1 * w).toPrecision(4))
  cfg.value.viewPortHeight = Number.parseFloat((1 * h).toPrecision(4))
  viewPortZoom.value = cfg.value.viewPortWidth / svgWrapperRef.value.offsetWidth
}

function handlePointerDown(e) {
  e.target.setPointerCapture(e.pointerId)
  const pt = eventToLocation(e)
  points.value = [[pt.x, pt.y, e.pressure]]
}
function handlePointerMove(e) {
  if (isPressedCtrl.value) {
    // 移动画布
    drag(e)
  }
  else {
    if (e.buttons !== 1)
      return

    const pt = eventToLocation(e)
    points.value = [...points.value, [pt.x, pt.y, e.pressure]]
  }
}
function handlePointerUp(e) {
  draggedEvt = null
}

function handleWheel(e) {
  e.preventDefault()
  const scale = 1.005 ** e.deltaY
  const pt = eventToLocation(e)
  zoomViewPort(scale, pt)
}
function zoomViewPort(scale: number, pt?: { x: number, y: number }) {
  if (!pt)
    pt = { x: cfg.value.viewPortX + 0.5 * cfg.value.viewPortWidth, y: cfg.value.viewPortY + 0.5 * cfg.value.viewPortHeight }
  const x = cfg.value.viewPortX + ((pt.x - cfg.value.viewPortX) - scale * (pt.x - cfg.value.viewPortX))
  const y = cfg.value.viewPortY + ((pt.y - cfg.value.viewPortY) - scale * (pt.y - cfg.value.viewPortY))
  const w = scale * cfg.value.viewPortWidth
  const h = scale * cfg.value.viewPortHeight
  updateViewPort(x, y, w, h)
}

const { width, height } = useElementBounding(svgWrapperRef)
watch([width, height], (newValue, oldValue) => {
  // 过滤一下第一次。因为监听的是dom的长宽，第一次肯定会触发，长宽从0到设置的值。
  // 这个时候的差值就是dom元素本身，而不是窗口偏移的值，所以这个时候跳出方法
  if (oldValue[0] === 0 && oldValue[1] === 0)
    return

  const distanceX = (newValue[0] - oldValue[0]) * viewPortZoom.value
  const distanceY = (newValue[1] - oldValue[1]) * viewPortZoom.value
  const x = cfg.value.viewPortX
  const y = cfg.value.viewPortY
  const w = cfg.value.viewPortWidth + distanceX
  const h = cfg.value.viewPortHeight + distanceY

  updateViewPort(x, y, w, h)
})
</script>

<template>
  <div id="svgWrapperRef" ref="svgWrapperRef" class="h-screen w-screen overflow-hidden rounded-md">
    <svg
      id="svgCanvasRef"
      :viewBox="`${cfg.viewPortX} ${cfg.viewPortY} ${cfg.viewPortWidth} ${cfg.viewPortHeight}`"
      class="h-full w-full"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @wheel="handleWheel"
    >
      <path :d="pathData" />
    </svg>
  </div>
</template>

<style lang="less" scoped>

</style>
```

```ts
export function getSvgPathFromStroke(stroke) {
  if (!stroke.length)
    return ''
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...stroke[0], 'Q'],
  )

  d.push('Z')
  return d.join(' ')
}
```
