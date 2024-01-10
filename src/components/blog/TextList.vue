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
</script>

<template>
  <!-- 标签 -->
  <header class="flex flex-col space-y-2">
    <h1 class="text-3xl font-bold">
      Blog
    </h1>
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

  <!-- 列表数据 -->
  <ol class="mt-6 flex flex-col space-y-6">
    <li
      v-for="article in currentTagAndList?.list"
      :key="article.title"
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
</template>
