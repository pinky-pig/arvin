// import fs from 'node:fs'
import process from 'node:process'
import type { PluginOption } from 'vite'

export default function operateProjectsPlugin(): PluginOption {
  return {
    name: 'operate-projects-plugin',
    configureServer(server) {
      if (process.env.NODE_ENV !== 'development') {
        // 如果不是开发模式，则直接返回，不应用插件
        return
      }

      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/updateProjects')) {
          // fs.writeFile(filePath, newContent, (err) => {
          //   if (err)
          //     console.error('写入文件出错：', err)
          //   else
          //     console.log('文件更新成功！')
          // })
        }

        next()
      })
    },
  }
}
