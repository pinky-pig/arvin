<script setup lang="ts">
import axios from 'axios'

const posts = await Promise.all(
  Object.entries(import.meta.glob('../../../blog/weekly/*.md', { query: '?raw' }))
    .map(async ([path, resolver]) => {
      return {
        raw: ((await resolver()) as any)?.default,
        title: (path as any).split('/').pop().split('.')[0],
        path,
      }
    }),
)
const postsMap = new Map(Object.entries(posts).map(([, post]) => [post.title, post]))

const currentPost = ref('')

async function handleAdd() {
  await axios.get('/createMd?name=test&type=post')
}
async function handleDelete() {
  await axios.get('/deleteMd?name=test&type=post')
}

function handleChangeContent(post: any) {
  currentPost.value = post.title
}

async function handleSave(_post: any) {
  await axios.get(`/updateMd`)
}
</script>

<template>
  <div>
    <div class="flex flex-row">
      <div>
        <div v-for="post in posts" :key="post.title" @click="handleChangeContent(post)">
          {{ post.title }}
        </div>
      </div>

      <textarea class="ml-6 w-[600px]" resize-initial :value="postsMap.get(currentPost)?.raw" />

      <button @click="handleSave">
        save
      </button>
    </div>
    <button @click="handleAdd">
      add
    </button>
    <br>
    <button @click="handleDelete">
      delete
    </button>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: home
    bgColor: yellow
  </route>
