<script setup lang="ts">
const { data: resData } = await useFetch('/api/vote')
</script>

<template>
  {{ resData }}
</template>

<style scoped>

</style>
