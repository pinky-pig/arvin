---
title: 开发一个炫酷的DOM转粒子动画
date: 2024/01/08
desc: canvas 粒子
tags: ['#全部','#困难']
cover: https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3acbd75efd0048e2bb6ef35cbf3d1008~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1575&h=1101&s=2104962&e=gif&f=136&b=e4e4e4
---

[[toc]]

![html2particleNew.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3acbd75efd0048e2bb6ef35cbf3d1008~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1575&h=1101&s=2104962&e=gif&f=136&b=e4e4e4)

## 前言

![t.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ff6a6d3b9984ae19cdfc6502381d40d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1170&h=2532&s=244119&e=jpg&b=16202c)

在我网络冲浪的时候，无意之间看到了一位大佬做的粒子效果很是炫酷，不过只做了 Mac 端的示例，我于是就学习做了一个 Web 端的 DOM 转 Canvas 粒子动画效果。代码仓库、说明文档及NPM包都在结尾。

![html2particle.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f444f5706db24294842c7019e4328331~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1575&h=1058&s=4758074&e=gif&f=304&b=fcfcfc)

## 实现思路

实现思路的话十分好理解，一句话就可以说的清。

**先用 `html2canvas` 将 DOM 转成 canvas ，然后将 canvas 转成粒子开始做动画。**

全部实现下来核心代码 200 多行，7kb左右吧。不过由于依赖了 `html2canvas`，打包后还是有 200+ kb 的大小。

## 开发逻辑

**输入**

既然是要将 DOM 转为 Canvas 粒子，那么输入自然是 DOM 。这里预设了两种粒子效果，就如开篇的图所示。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60b96864283d4107bfc2e1330ddb1eaf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=997&h=268&s=48967&e=png&b=1f1f1f)

**获取图像数据**

调用方法，传入 DOM 和 动画类型初始化后，直接就是获取图像数据，这些数据就是后面要创建的粒子。

自己传入进来的 DOM 什么样，就能截图显示成什么样?（当然，`html2canvas` 的小缺陷还是避免不了，比如跨域图片的加载 。）

然后除了图像数据外，还有 DOM 的尺寸也要记录下来，到时候在画布上渲染需要用得到。

**开始动画**

初始化好后，自然不一定希望立即动画，所以导出了一个 `startAnimation` 方法，一旦调用就开始动画。

而这个方法，自然有几处逻辑上的需要考虑，比如上一次的动画需要清除，动画的持续时间，动画结束之后又要清除以防内存泄露等等。考虑好后，自然就是逻辑上的开发了。

**动画渲染**

终于到了关键的一步，而这里却很简单。

几个步骤：

1. 调用动画方法后，增加一个 Canvas 画布，用于渲染粒子。
2. requestAnimationFrame 渲染动画。
3. 从 `html2canvas` 获取的图像数据，遍历创建粒子，这些粒子的位置随 requestAnimationFrame 改变。

核心逻辑就是这样，不过还有一些小细节要考虑。比如要更新一下传入 DOM 的位置，放置窗口 Resize 或者页面 Scroll 造成的位置影响。或者粒子的动画效果该如何去设置。不过这些都是优化项，主要初步的能渲染就行，粒子的动画效果无非就是改变 x || y 值，做匀速、匀加速、正弦余弦波动，几种组合在一起，整的花里胡哨的。

然后还有就是粒子的数量对浏览器的 FPS 的影响。

## 使用方法

经过两天的时间，开发了一个 `html2particle` NPM 包，并写了一个简要的说明文档和用法示例。使用 TS 开发的，编译成 JS 发布上去的，所以使用也无关前端框架，都可以使用。这里只放一个 Vue 版本（包括样式）的代码示例，用 Vitepress 写的说明文档还有原生和 React 的用法。

### vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import html2particle from 'html2particle'

const item4Ref = ref<HTMLElement>()
let handleItem4Click = () => { }
const isShow4 = ref(true)
function initItem4Event() {
  const { startAnimation } = html2particle(item4Ref.value!, { type: 'ExplodingParticle' })
  handleItem4Click = () => {
    isShow4.value = false
    startAnimation()
  }
}

const item5Ref = ref<HTMLElement>()
let handleItem5Click = () => { }
const isShow5 = ref(true)
function initItem5Event() {
  const { startAnimation } = html2particle(item5Ref.value!, { type: 'SinWaveParticle' })
  handleItem5Click = () => {
    isShow5.value = false
    startAnimation()
  }
}

onMounted(() => {
  initItem4Event()
  initItem5Event()
})
</script>

<template>
  <div class="container">
    <div ref="item4Ref" class="image" @click="handleItem4Click">
      <img v-if="isShow4" src="/1.jpg" alt="">
    </div>

    <div ref="item5Ref" class="image" @click="handleItem5Click">
      <img v-if="isShow5" src="/2.jpg" alt="">
    </div>
  </div>
</template>

<style scoped>
.container {
  align-items: center;
  user-select: none;
  display: flex;
  flex-direction: row;
}

.image {
  width: 300px;
  height: 200px;
  cursor: pointer;
  margin: 0 auto 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  outline: 2px solid #887cc8;
  outline-offset: 2px;
}
</style>
```

码上掘金演示的是原生 HTML 示例。

[jcode](https://code.juejin.cn/pen/7327590990317879331)

## 结尾

总的来说，因为样式炫目，才引起的兴趣研究一下这个。虽然代码量不多，不过还是有点意思。如果可以自定义传入粒子效果，而不是只有这两种，那应该更好用些。希望在 GitHub 仓库上帮我点个 star 🥺

Demo 及文档预览 : <https://html2particle.mmeme.me/guide/demo.html>\
NPM 包地址 : <https://www.npmjs.com/package/html2particle>\
GitHub 仓库地址 : <https://github.com/pinky-pig/html2particle>
