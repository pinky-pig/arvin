import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

// import Previewer from 'virtual:vue-component-preview'
import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { setupRouterScroller } from 'vue-router-better-scroller'
import App from './App.vue'
import '@shikijs/twoslash/style-rich.css'
import 'shiki-magic-move/style.css'
import type { UserModule } from './types'
import '@unocss/reset/tailwind.css'
import './styles/global.css'
import 'uno.css'

const routes = autoRoutes.map((i: { path: string }) => {
  return {
    ...i,
    alias: i.path.endsWith('/') ? `${i.path}index.html` : `${i.path}.html`,
  }
})

// 判断字符串是否包含中文
function hasChinese(str: string) {
  return /[\u4E00-\u9FA5]+/g.test(str)
}

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    const { router, isClient } = ctx
    if (isClient) {
      router.beforeEach((val) => {
        const decodePath = decodeURIComponent(val.path)

        // 判断是否出现中文，将中文 replace 重新跳转
        if (hasChinese(decodePath) && decodePath !== val.path) {
          router.replace(
            val.fullPath.replace(val.path, decodePath),
          )
        }

        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }

    // ctx.app.use(createRouter({ history: createWebHistory(), routes}))
  },
)
