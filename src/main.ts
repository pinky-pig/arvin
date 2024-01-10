import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

// import Previewer from 'virtual:vue-component-preview'
import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { setupRouterScroller } from 'vue-router-better-scroller'
import App from './App.vue'
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
      const html = document.querySelector('html')!
      setupRouterScroller(router, {
        selectors: {
          html(ctx) {
            // only do the sliding transition when the scroll position is not 0
            if (ctx.savedPosition?.top)
              html.classList.add('no-sliding')
            else
              html.classList.remove('no-sliding')
            return true
          },
        },
        behavior: 'auto',
      })

      router.beforeEach((val) => {
        // 如果路由是中文，刷新之后，路由会被转码，导致匹配不到路由
        const decodePath = decodeURIComponent(val.path)
        if (hasChinese(decodePath) && decodePath !== val.path)
          router.replace(decodePath)

        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }

    // ctx.app.use(createRouter({ history: createWebHistory(), routes}))
  },
)
