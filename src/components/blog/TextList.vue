<script setup lang="ts">
import type { Post } from '~/config/types'
import { currentBlogTag } from '~/logics/index'

const router = useRouter()

const allRoutes = router.getRoutes()

const { weeklyRoutes, otherRoutes }: { weeklyRoutes: Post[], otherRoutes: Post[] } = getPostList(allRoutes)

/**
 * 将所有的汇成一个，通过 tag 切换
 */
const allPosts = computed(() =>
  [...filterAndSortByTags([...otherRoutes, ...weeklyRoutes])],
) as ComputedRef<{ name: string, list: Post[] }[]>

/**
 * 当前选择的 tag 和数据列表
 */
function handleClick(item: typeof allPosts.value[0]) {
  currentBlogTag.value = item.name
}

const currentTagAndList = computed(() => allPosts.value.find(i => i.name === currentBlogTag.value) || allPosts.value[0])

function getPostList(posts: any[]) {
  if (posts.length) {
    const parseRoute = (post: any) => {
      const fileName = post.path.split('/').pop()
      const index = fileName.split('-')[0]
      const title = `第${index}期 - ${fileName.split('-')[1]}`
      const path = post.path
      const { desc, date, tags, cover } = post.meta.frontmatter

      return {
        index,
        title,
        path,
        desc: desc as string,
        date: date as string,
        tags: tags as string[],
        cover: cover as string,
      }
    }

    const weeklyRoutes = posts
      .filter((i: any) => i.path.startsWith('/blog/weekly'))
      .filter(i => !i.path.endsWith('.html') && i?.meta?.frontmatter?.date)
      .map(i => parseRoute(i))

    const otherRoutes = posts
      .filter((i: any) => i.path.startsWith('/blog/post'))
      .filter(i => !i.path.endsWith('.html') && i?.meta?.frontmatter?.date)
      .map(i => parseRoute(i))

    return { weeklyRoutes, otherRoutes }
  }
  else {
    return { weeklyRoutes: [], otherRoutes: [] }
  }
}

function filterAndSortByTags(list: any[]) {
  const tagObjects: {
    [key: string]: any[]
  } = {}
  list.forEach((post) => {
    post.tags.forEach((tag: string) => {
      if (tagObjects[tag])
        tagObjects[tag].push(post)
      else
        tagObjects[tag] = [post]

      tagObjects[tag].sort((a, b) => a.index - b.index)
    })
  })

  return Object.keys(tagObjects).map(key => ({ name: key, list: tagObjects[key].reverse() }))
}

const isShowList = ref(true)
function handleChangeShowMode() {
  isShowList.value = !isShowList.value
}
</script>

<template>
  <!-- 标签 -->
  <header
    class="relative mx-auto max-w-xl flex flex-col space-y-2"
    style="font-family: LXGW WenKai Screen R;"
  >
    <div
      class="relative w-fit cursor-pointer select-none text-3xl font-bold"
      @click="handleChangeShowMode"
    >
      <div class="reverse-card" :style="{ transform: isShowList ? 'rotateY(0deg)' : 'rotateY(180deg)' }">
        Blog
      </div>
      <div class="reverse-card absolute left-0 top-0" :style="{ transform: !isShowList ? 'rotateY(0deg)' : 'rotateY(180deg)' }">
        Blog
      </div>
      <div class="absolute left-18 top-4">
        <svg height="24" width="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><filter id="shadow" y="-40%" x="-40%" width="180px" height="180%" color-interpolation-filters="sRGB"><feDropShadow dx="1" dy="1" stdDeviation="1.2" flood-opacity=".5" /></filter></defs><g fill="none" transform="rotate(0 16 16)" filter="url(%23shadow)"><path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" fill="white" /><path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" fill="white" /><path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" fill="black" /><path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" fill="black" /></g></svg>
      </div>
    </div>

    <div>
      <ul class="flex flex-wrap list-none justify-start -m-1">
        <li v-for="item in allPosts" :key="item.name">
          <div
            border="1px solid #E4E4E7 dark:#3e3e3e"
            :class="
              currentTagAndList.name === item.name
                ? '!border-neutral-300 !bg-black !text-white !dark:border-[#52525B] !dark:bg-white !dark:text-black '
                : ''"
            class="m-1 inline-flex cursor-pointer appearance-none rounded-lg bg-white px-2 py-1 text-center text-xs/tight text-neutral-500 font-bold no-underline transition-colors hover:border-neutral-300 dark:bg-[rgb(24,24,27)] hover:bg-neutral-100 focus:outline-none focus-visible:ring focus:ring-0 focus-visible:ring-neutral-300 dark:hover:border-[#52525B] dark:hover:bg-[#27272A] dark:hover:text-[#E4E4E5]"
            @click="handleClick(item)"
          >
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <p class="text-sm text-[#7C7C82] font-semibold">
      {{ currentTagAndList?.list?.length }} posts
    </p>
    <br>
  </header>

  <div
    class="relative"
    style="font-family: LXGW WenKai Screen R;"
  >
    <!-- 列表数据 -->
    <ol
      v-show="isShowList"
      class="mx-auto mt-6 max-w-xl flex flex-col space-y-6"
    >
      <li
        v-for="article in currentTagAndList?.list"
        :key="article.index"
      >
        <component
          :is="article.path.includes('://') ? 'a' : 'RouterLink'"
          v-bind="
            article.path.includes('://') ? {
              href: article.path,
              target: '_blank',
              rel: 'noopener noreferrer',
            } : {
              to: article.path,
            }
          "
          class="relative flex flex-col gap-1"
        >
          <h1 class="static inline-flex cursor-pointer appearance-none items-center border-0 rounded-md bg-transparent p-0 text-xl font-bold underline decoration-1 underline-offset-2 before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:cursor-pointer hover:decoration-dotted focus:outline-none focus-visible:ring focus:ring-0 focus-visible:ring-neutral-300">
            {{ article.title }}
          </h1>

          <div class="flex flex-col gap-1.5 text-[#818188] dark:text-[#CECED1]">
            <p class="text-14px">
              {{ article.desc }}
            </p>
            <div class="[--pm-gap-inner:0.25em] [--pm-gap-x:1em] [--pm-gap-y:0.5em] [--pm-icon-size:1.25em] text-sm">
              <dl class="flex flex-wrap list-none justify-start text-[#A1A1A7] -mx-[calc(var(--pm-gap-x)/2)] -my-[calc(var(--pm-gap-y)/2)] dark:text-[#97979F]">
                <div class="flex items-center gap-[--pm-gap-inner]">
                  <dt class="inline-flex items-center">
                    <span class="sr-only">Date</span>
                    <svg fill="none" viewBox="0 0 24 24" class="h-[--pm-icon-size] w-[--pm-icon-size]" astro-icon="clock">
                      <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-width="1.5" />
                      <path stroke="currentColor" stroke-width="1.5" d="M12 8v4l2 2" />
                    </svg>
                  </dt>
                  <dd>
                    <time :datatime="article.date">
                      {{ article.date }}
                    </time>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </component>
      </li>
    </ol>

    <!-- 卡片数据 -->
    <div
      v-show="!isShowList"
      class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mx-auto mt-6 max-w-970px justify-center gap-10px rounded-xl px-5px text-start md:grid-cols-[repeat(auto-fill,minmax(240px,300px))] md:px-25px"
    >
      <component
        :is="article.path.includes('://') ? 'a' : 'RouterLink'"
        v-for="article in currentTagAndList?.list"
        :key="article.desc"
        v-bind="
          article.path.includes('://') ? {
            href: article.path,
            target: '_blank',
            rel: 'noopener noreferrer',
          } : {
            to: article.path,
          }
        "
        class="relative flex flex-col cursor-pointer justify-center overflow-hidden border-[var(--blog-card-border)] rounded-12px border-solid bg-[var(--blog-card-bg)] object-cover pb-1 text-[var(--blog-card-text)] shadow-md"
        style="border: 5px solid var(--blog-card-border);"
      >
        <img
          :alt="article.title"
          class="h-200px w-full rounded-t-md object-cover"
          :src="
            article.cover
              ? `${article.cover}?x-oss-process=image/resize,w_640/format,webp`
              : 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images乳胶漆刷墙.jpg'
          "
        >
        <div class="w-full flex items-center justify-between px-3 pt-2 leading-tight">
          <div class="line-clamp-1 overflow-hidden">
            {{ article.title }}
          </div>
          <div class="text-sm">
            {{ article.date }}
          </div>
        </div>
        <div class="line-clamp-2 h-12 w-full overflow-hidden px-3 pt-2 text-sm font-light">
          {{ article.desc }}
        </div>
      </component>
    </div>
  </div>
</template>

<style scoped>
.reverse-card {
  perspective-origin: 0 0;
  overflow: hidden;
  cursor: pointer;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
