import { execSync } from 'node:child_process'
import { URL } from 'node:url'
import process from 'node:process'
import type { PluginOption } from 'vite'

export default function operateBlogPlugin(): PluginOption {
  return {
    name: 'operate-blog-plugin',
    configureServer(server) {
      if (process.env.NODE_ENV !== 'development') {
        // 如果不是开发模式，则直接返回，不应用插件
        return
      }

      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/createMd') || req.url?.startsWith('/deleteMd')) {
          const action = req.url.startsWith('/createMd') ? 'create' : 'delete'

          const { searchParams } = new URL(`http://${req.headers.host}${req.url}`)
          const name = searchParams.get('name')
          const type = searchParams.get('type')

          if (type !== 'post' && type !== 'weekly')
            return

          const command = action === 'create'
            ? `echo. > blog/${type}/${name}.md`
            : `rimraf blog/${type}/${name}.md`

          execSync(command)
        }

        next()
      })
    },
  }
}
