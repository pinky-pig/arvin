---
title: Nuxt3博客主题
date: 2023/06/13
desc: 设置博客主题
tags: ['#CSS']
cover: https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230614204503.png
---

[[toc]]

<img loading="lazy" alt="theme" decoding="async" data-nimg="fill" src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230614204503.png" width=800 />
<small>设置渲染 Markdown 内容样式</small>

**原因**

使用 Nuxt/content 渲染 Markdown 博客内容，但是样式不够好看，这里两种自定义样式。

## 参考

当前项目使用的是 `@nuxt-themes/typography` 。
如果需要设置 `typography` 的样式，可以参考 `tokens.config.ts` 。
如果想要自定义样式，单个语法样式，可以重写 Prose 组件，参考当前项目的`components\content\ProseH1.vue` 。

**实现**

- [heti](https://github.com/sivan/heti) 设置中文排版布局
- [Prose components](https://content.nuxtjs.org/api/components/prose/) 重写
- [@nuxt-themes](https://github.com/nuxt-themes) 直接应用官方主题

## 代码高亮

这里其实并不需要引入什么依赖，特殊需求除外，参考官方文档 [Nuxt/content highlight](https://content.nuxtjs.org/api/configuration#highlight-options)。当前项目配置的是 GitHub 的 Code高亮，如下配置：

```ts
export default defineNuxtConfig({
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      }
    }
  }
})
```

## heti

这个是直接引入 JS 和 CSS ，现成的样式文件，然后在页面中添加类名，如果修改也是直接修改 CSS 文件就 okk 。

1. 引入 JS

这里是在 Nuxt3 中，使用了 `VueUse/useScriptTag` 引入

```ts
// 注册函数
export async function registerHeti() {
  // 字体间距优化
  useScriptTag(
    '/heti/heti-addon.min.js',
    (el: HTMLScriptElement) => {
      const heti = new (window as any).Heti('.heti')
      heti.autoSpacing()
    },
  )
}
```

```ts
// 在页面中引入 heti.js
registerHeti()
```

2. 在页面中引入 heti.min.css

3. 在页面中添加类名 heti ，挂载样式，就 okk 了

> 如果想自定义 CSS 样式，直接修改样式文件就行了

4. 当然 heti 主要是针对中文排版，如果觉得有些样式不能通过 CSS 很好的自定义样式，比如 Code 想要加一个语言的 Tab ，这里就可以通过编写代码，利用 Prose 。

## Prose components

这个是直接利用 Nuxt/content 的 API ， 重写 Prose 组件，然后在页面中使用。

> A list of Prose components currently implemented.
> Here is a list of all the Prose components currently implemented.
> To overwrite a prose component, create a component with the same name in your project components/content/ directory (ex: components/content/ProseA.vue)

只要新建一个同名的组件，就可以重写 Prose 组件了，然后在渲染的时候直接会覆盖默认的样式。

## @nuxt-themes

Nuxt 提供了一些主题，比如:

- [nuxt-themes/docus](https://github.com/nuxt-themes/docus)
- [nuxt-themes/alpine](https://github.com/nuxt-themes/alpine)
- [nuxt-themes/typography](https://github.com/nuxt-themes/typography)
- [nuxt-themes/starter](https://github.com/nuxt-themes/starter)

这里的前三个都是官方推荐的主题，可以直接安装使用，步骤很简单，直接安装依赖，然后在 nuxt.config.ts 中注册就 okk 了。

```bash
# 安装依赖
pnpm install @nuxt-themes/docus -D
```

```ts
// 注册使用
defineNuxtConfig({
  extends: '@nuxt-themes/docus'
})
```

这里其实还是使用 nuxt/content Prose 自定义渲染样式，只不过这些包已经将一些常备组件样式，并且又新增加规定了一些语法样式组件，所以使用起来更加方便，不需要自己去写样式了。

记得刚安装后，要删除 .nuxt 缓存，然后重新跑一下。

然后还有一个模板项目 `nuxt-themes/starter` ，可以自定义样式，并发布。

在根目录新建一个 `tokens.config.ts` ，这里可以配置一些样式变量，比如颜色，字体等等。
