---
title: 简单使用CSS解决SVG线条Scale变粗
date: 2024/01/08
desc: 简单使用CSS解决SVG线条Scale变粗
tags: ['#全部','#简单']
cover: https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80d4d316531f44aaa91f509b756f3bc8~tplv-k3u1fbpfcp-watermark.image?
---

[[toc]]

![vector-effect.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80d4d316531f44aaa91f509b756f3bc8~tplv-k3u1fbpfcp-watermark.image?)

# 前言

在操作Svg的时候，想对其进行transform变形，但是当scale的时候，发现其stroke的粗细竟然会受scale的影响。然后网上查询，最终又在张鑫旭老师的网站找到了[结果](https://www.zhangxinxu.com/wordpress/2018/12/vector-effect-non-scaling-stroke/)。这里只是简单学习记录一下。

# 解决办法

只需要给其添加一个css属性就能解决。

`vector-effect="non-scaling-stroke"`

```html
<svg viewBox="0 0 500 240">
  <!-- normal -->
  <path
    d="M10,20 L40,100 L39,200 z"
    stroke="black"
    stroke-width="2px"
    fill="none"
  ></path>
  <!-- scaled -->
  <path
    transform="translate(100,0) scale(4,1)"
    d="M10,20 L40,100 L39,200 z"
    stroke="black"
    stroke-width="2px"
    fill="none"
  ></path>
  <!-- fixed-->
  <path
    vector-effect="non-scaling-stroke"
    transform="translate(300, 0) scale(4, 1)"
    d="M10,20 L40,100 L39,200 z"
    stroke="black"
    stroke-width="2px"
    fill="none"
  ></path>
</svg>
```

从动图可以看出来，当我改变那个矩形的时候，是通过设置其transform-origin 和 scale 达到拉伸效果的，但是在拉伸过程中，其线条粗细发生了改变，但是我并没有对其stroke-width做什么操作。

```
vector-effect:  none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position
```

这里就可以具体参考MDN或者张鑫旭老师的博客了ヾ(≧▽≦\*)o

# 引用

张鑫旭: https://www.zhangxinxu.com/wordpress/2018/12/vector-effect-non-scaling-stroke/
MDN: https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/vector-effect
