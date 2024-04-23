<script setup lang="ts">
import axios from 'axios'

async function handleAdd() {
  await axios.get('/createMd?name=test&type=post')
}
async function handleDelete() {
  await axios.get('/deleteMd?name=test&type=post')
}
</script>

<template>
  <div>
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
    layout: default
    bgColor: yellow
  </route>
