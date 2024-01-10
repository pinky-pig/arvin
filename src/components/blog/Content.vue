<script setup lang="ts">
import { parseTitleFromContentList } from '~/utils/blog'

const props = defineProps({
  emptyTip: {
    type: String,
    required: false,
    default: 'This page is empty',
  },
  path: {
    type: String,
    required: true,
  },
})

const giscusRoot = ref<HTMLElement | null> (null)

watchOnce(giscusRoot, (root) => {
  if (root && root instanceof HTMLElement)
    registerGiscus(root)
})
onActivated(() => {
  if (giscusRoot && giscusRoot.value instanceof HTMLElement)
    registerGiscus(giscusRoot.value)
})
</script>

<template>
  <div>
    <ClientOnly>
      <ContentDoc :path="path">
        <template #default="{ doc }">
          <main class="mx-auto max-w-872px w-full flex rounded-xl border-unset bg-transparent px-2 pt-10px text-start md:border md:border-[var(--blog--border)] md:border-solid md:bg-[var(--blog-bg)] md:p-4 md:px-36px">
            <!-- <div class="heti max-w-50rem w-full flex-shrink-0 flex-grow-0 p-[0.8rem,2rem,4rem] pb-20"> -->
            <div class="max-w-50rem w-full flex-shrink-0 flex-grow-0 p-[0.8rem,2rem,4rem] pb-20">
              <!-- title -->
              <h1 class="content-title flex align-middle">
                {{ parseTitleFromContentList(doc.title || ' ') }}
              </h1>
              <!-- body -->
              <ContentRenderer :value="doc" />
              <hr>

              <!-- foot -->
              <div class="post-footer mb-50px mt-2 flex flex-col items-center justify-between md:flex-row">
                <div class="flex-1">
                  发布日期：<a href="https://github.com/" target="_blank" title="Edit">{{ doc.date }}</a>
                </div>
                <div class="mt-4 flex-1 text-right md:mt-0">
                  <a href="https://github.com/" target="_blank" title="Follow">Twitter</a>
                  <a href="https://github.com/" title="Star" target="_blank" class="hidden lg:inline-block"> | Github</a>
                </div>
              </div>

              <!-- comment -->
              <div ref="giscusRoot" />

              <!-- scrollTop -->
              <ScrollTopButton />
            </div>
          </main>
        </template>

        <template #not-found>
          <h1 class="fixed left-0 mt-1/6 w-full text-center leading-3">
            <span class="mb-6 block text-6xl font-bold italic">{{ 'Loading' }}</span>
            <span class="block italic">{{ 'No articles found' }}</span>
          </h1>
        </template>
        <template #empty>
          <h1>{{ emptyTip }}</h1>
        </template>
      </ContentDoc>
    </ClientOnly>
  </div>
</template>

<style scoped>
h1.content-title:first-child {
  margin-block-start: 8px !important;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
  font-size: 2.3rem;
  font-weight: 800;
  line-height: 2;
}

@media (max-width: 50em) {
  h1.content-title:first-child {
    margin-bottom: 2.3rem;
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1.8;
  }
}
</style>
