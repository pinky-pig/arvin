import { execSync } from 'node:child_process'
import { URL } from 'node:url'
import process from 'node:process'
import type { PluginOption } from 'vite'
import fse from 'fs-extra'

export default function operateBlogPlugin(): PluginOption {
  return {
    name: 'operate-blog-plugin',
    configureServer(server) {
      if (process.env.NODE_ENV !== 'development') {
        // 如果不是开发模式，则直接返回，不应用插件
        return
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/createMd') || req.url?.startsWith('/deleteMd')) {
          const action = req.url.startsWith('/createMd') ? 'create' : 'delete'

          const { searchParams } = new URL(`http://${req.headers.host}${req.url}`)
          const name = searchParams.get('name')
          const type = searchParams.get('type')

          if (type !== 'post' && type !== 'weekly')
            return

          let command = ''
          if (action === 'create') {
            command = process.platform !== 'win32'
              ? `touch blog/${type}/${name}.md`
              : `echo. > blog/${type}/${name}.md`
          }
          else {
            command = `rimraf blog/${type}/${name}.md`
          }

          execSync(command)
        }

        if (req.url?.startsWith('/updateMd')) {
          if (fse.existsSync(`blog/post/test.md`)) {
            const content = await fse.readFile(`blog/post/test.md`, 'utf-8')
            fse.writeFile(`blog/post/test.md`, JSON.stringify('777'))
          }
        }

        next()
      })
    },
  }
}
