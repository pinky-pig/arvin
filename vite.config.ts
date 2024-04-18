import path, { basename, dirname, resolve } from 'node:path'
import { Buffer } from 'node:buffer'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'

import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import WebfontDownload from 'vite-plugin-webfont-dl'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Pages from 'vite-plugin-pages'
import fs from 'fs-extra'
import matter from 'gray-matter'

import MarkdownItShiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'

import anchor from 'markdown-it-anchor'
import GitHubAlerts from 'markdown-it-github-alerts'

import TOC from 'markdown-it-table-of-contents'
import sharp from 'sharp'
import { slugify } from './scripts/slugify'

const promises: Promise<any>[] = []

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    target: 'esnext', // browsers can handle the latest ES features
  },

  plugins: [

    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        // features dir for pages
        { dir: 'blog', baseRoute: 'blog' },
      ],
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(
            route.meta || {},
            {
              frontmatter: {
                ...data,
                description: data.desc,
              },
            },
          )
        }

        return route
      },
    }),

    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
        }),
      },
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typed-router.d.ts',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    Unocss(),

    // https://github.com/unplugin/unplugin-vue-markdown
    Markdown({
      wrapperComponent: id => id.includes('/demo/')
        ? 'WrapperDemo'
        : 'WrapperPost',
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',

      headEnabled: true,
      async markdownItSetup(md) {
        // https://shiki.style/guide/
        md.use(await MarkdownItShiki({
          themes: {
            dark: 'github-dark',
            light: 'catppuccin-latte',
          },
          defaultColor: false,
          cssVariablePrefix: '--s-',
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
          ],
        }))

        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: `
            <div class="table-of-contents-anchor hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h18v2H3zm0 7h12v2H3zm0 7h18v2H3z"/></svg>
            </div>
          `,
        })

        md.use(GitHubAlerts)
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        (() => {
          if (!id.endsWith('.md'))
            return
          const route = basename(id, '.md')
          if (route === 'index' || frontmatter.image || !frontmatter.title)
            return
          const path = `og/${route}.png`
          promises.push(
            fs.existsSync(`${id.slice(0, -3)}.png`)
              ? fs.copy(`${id.slice(0, -3)}.png`, `public/${path}`)
              : generateOg(frontmatter.title!.trim(), `public/${path}`, (frontmatter.date as string)),
          )
          frontmatter.image = `https://mmeme.me/${encodeURIComponent(path)}`
          frontmatter.description = frontmatter?.desc as string || ''
        })()
        const head = defaults(frontmatter, options)
        return { head, frontmatter }
      },
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      selfDestroying: true, // 禁用了
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/feat-agency/vite-plugin-webfont-dl
    WebfontDownload(),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    onFinished() {
      generateSitemap()
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window', /vue-i18n/],
  },
})

const ogSVg = fs.readFileSync('./scripts/og-template.svg', 'utf-8')

async function generateOg(title: string, output: string, date: string) {
  if (fs.existsSync(output))
    return

  await fs.mkdir(dirname(output), { recursive: true })
  // breakline every 25 chars
  const lines = title.trim().split(/(.{0,25})(?:\s|$)/g).filter(Boolean)

  const data: Record<string, string> = {
    line1: lines[0],
    line2: lines[1] || date,
    line3: lines[2] || date,
  }
  const svg = ogSVg.replace(/\{\{([^}]+)}}/g, (_, name) => data[name] || '')

  // eslint-disable-next-line no-console
  console.log(`Generating ${output}`)
  try {
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(output)
  }
  catch (e) {
    console.error('Failed to generate og image', e)
  }
}
