import { execSync } from 'node:child_process'
import { URL } from 'node:url'
import process from 'node:process'
import type { Connect, PluginOption } from 'vite'
import fse from 'fs-extra'

export default function operateBentoPlugin(): PluginOption {
  return {
    name: 'operate-bento-plugin',
    configureServer(server) {
      if (process.env.NODE_ENV !== 'development') {
        // 如果不是开发模式，则直接返回，不应用插件
        return
      }

      // 解析请求体中间件
      const bodyParser = async (req: Connect.IncomingMessage) => {
        return new Promise((resolve, reject) => {
          let data = ''
          req.on('data', (chunk) => {
            data += chunk
          })
          req.on('end', () => {
            try {
              resolve(JSON.parse(data))
            }
            catch (error) {
              reject(error)
            }
          })
          req.on('error', reject)
        })
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/operate-bento/updateCommon') {
          const body = await bodyParser(req) as { path: string, content: string }

          if (fse.existsSync(body?.path)) {
            const content = await fse.readFile(body?.path, 'utf-8')
            await fse.writeFile(body?.path, content)
            res.statusCode = 200
            res.end('写入成功')
          }
          else {
            res.statusCode = 500
            res.end('写入失败')
          }
        }
        else {
          next()
        }
      })
    },
  }
}
