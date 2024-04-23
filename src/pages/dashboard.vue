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
  <button @click="handleAdd">
    add
  </button>
  <br>
  <button @click="handleDelete">
    delete
  </button>
</template>

<style scoped>

</style>
