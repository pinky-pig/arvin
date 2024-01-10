<script setup lang="ts">
import { parseTitleFromContentList } from '~/utils/blog'
</script>

<template>
  <ContentList path="/post">
    <template #default="{ list }">
      <div
        v-for="article in list"
        :key="article._path"
        style="border: 5px solid var(--blog-card-border);"
        class="flex flex-col justify-center overflow-hidden border-[var(--blog-card-border)] rounded-12px border-solid bg-[var(--blog-card-bg)] pb-10px text-[var(--blog-card-text)] shadow-md"
      >
        <router-link
          :to="`/blog${article._path}`"
        >
          <!-- 配图 -->
          <img
            :src="article.cover"
            class="lozad block h-200px w-full object-cover md:h-160px"
          >
          <!-- 标题 -->
          <div class="w-full flex items-center justify-between pl-3 pr-3 pt-4 text-[var(--blog-card-text)] leading-tight">
            <div class="truncate">
              {{ parseTitleFromContentList(article.title) }}
            </div>
            <div class="text-sm">
              {{ article.date }}
            </div>
          </div>
          <!-- 描述 -->
          <p class="line-clamp-2 h-50px w-full overflow-hidden px-12px pt-10px text-sm text-[var(--blog-card-text)]">
            {{ article.desc }}
          </p>
        </router-link>
      </div>
    </template>

    <template #not-found>
      <h1 class="fixed left-0 mt-1/6 w-full text-center leading-3">
        <span class="mb-6 block text-6xl font-bold italic">{{ 'Loading' }}</span>
        <span class="block italic">{{ 'No articles found' }}</span>
      </h1>
    </template>
  </ContentList>
</template>
