<script setup lang="ts">
import BlogTextList from '~/components/blog/TextList.vue'
</script>

<template>
  <div>
    <Suspense>
      <div class="mx-auto block max-w-5xl min-h-full w-full flex-1 flex-col scroll-m-20 px-6">
        <div class="mx-auto max-w-xl w-full px-0">
          <BlogTextList />
        </div>
      </div>
    </Suspense>
  </div>
</template>
