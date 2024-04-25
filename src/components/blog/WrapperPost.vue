<script setup lang='ts'>
import { formatDate } from '~/utils/blog'
import { registerGiscus } from '~/utils/giscus'

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const route = useRoute()
const content = ref<HTMLDivElement>()

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      const el = document.querySelector(decodeURIComponent(location.hash))
      if (el) {
        const rect = el.getBoundingClientRect()
        const y = window.scrollY + rect.top - 40
        window.scrollTo({
          top: y,
          behavior: 'smooth',
        })
        return true
      }
    }
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  setTimeout(() => {
    if (!navigate())
      setTimeout(navigate, 1000)
  }, 1)
})

const giscusRoot = ref<HTMLElement | null> (null)

watchOnce(giscusRoot, (root) => {
  if (root && root instanceof HTMLElement)
    registerGiscus(root)
})
onActivated(() => {
  if (giscusRoot.value && giscusRoot.value instanceof HTMLElement)
    registerGiscus(giscusRoot.value)
})
</script>

<template>
  <main id="blog-root" style="font-family: LXGW WenKai Screen R;" class="relative z-[1] mx-auto max-w-[760px] w-full rounded-[10px] border-unset bg-transparent px-2 pt-[10px] text-start md:border md:border-[var(--blog--border)] md:border-solid md:bg-[var(--blog-bg)] md:p-10 md:px-[36px]">
    <ClientOnly v-if="frontmatter.plum">
      <Plum />
    </ClientOnly>
    <div
      v-if="frontmatter.display ?? frontmatter.title"
      class="m-auto mb-8 prose"
      :class="[frontmatter.wrapperClass]"
    >
      <h1 class="slide-enter-50 mb-0">
        {{ frontmatter.display ?? frontmatter.title }}
      </h1>
      <p
        v-if="frontmatter.date"
        class="slide-enter-50 opacity-50"
      >
        {{ formatDate(frontmatter.date, false) }} <span v-if="frontmatter.duration">· {{ frontmatter.duration }}</span>
      </p>
      <p
        v-if="frontmatter.desc"
        class="slide-enter-50"
        style="font-size: 80%;"
      >
        {{ frontmatter.desc }}
      </p>
      <p v-if="frontmatter.place" class="mt--4!">
        <span op50>at </span>
        <a v-if="frontmatter.placeLink" :href="frontmatter.placeLink" target="_blank">
          {{ frontmatter.place }}
        </a>
        <span v-else font-bold>
          {{ frontmatter.place }}
        </span>
      </p>
      <p
        v-if="frontmatter.subtitle"
        class="slide-enter italic opacity-50 !-mt-6"
      >
        {{ frontmatter.subtitle }}
      </p>
      <p
        v-if="frontmatter.draft"
        class="slide-enter" border="l-3 orange-4" bg-orange-4:10 px4 py2 text-orange-4
      >
        This is a draft post, the content may be incomplete. Please check back later.
      </p>
    </div>
    <article
      ref="content"
      :class="[frontmatter.tocAlwaysOn ? 'toc-always-on' : '', frontmatter.class]"
    >
      <slot />
    </article>

    <div class="slide-enter m-auto mt-8 animate-delay-500 prose print:hidden">
      <!-- <div class="h-1 w-full border-t" /> -->

      <div class="mb-[10px] flex flex-col items-center justify-between font-mono op50 md:flex-row hover:op75">
        <div class="flex-1">
          发布日期: {{ frontmatter.date }}
        </div>
        <div class="mt-4 flex-1 text-right md:mt-0">
          <a href="https://github.com/" title="Star" target="_blank" class="hidden lg:inline-block"> Github</a>
        </div>
      </div>
    </div>

    <div v-if="route.path !== '/'" class="slide-enter m-auto mb-8 animate-delay-500 prose print:hidden">
      <br>

      <span font-mono op50> {{ `> ` }}</span>
      <RouterLink
        to="/blog"
        class="font-mono op50 hover:op75"
      >
        {{ 'cd ..' }}
      </RouterLink>

      <div class="py-4" />
      <!-- comment -->
      <div ref="giscusRoot" />
    </div>
    <ScrollTopButton />
  </main>
</template>

<style scoped>
#blog-root::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/noise.png);
  background-repeat: repeat;
  opacity: 0.04;
  z-index: -1;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>
