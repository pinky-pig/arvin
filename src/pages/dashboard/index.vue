<script setup lang="ts">
import Board from './Board.vue'
import { mails, user } from './data/mails'
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 top-0 h-vh w-vw flex flex-col overflow-hidden bg-[#09090b] p-4">
    <Board
      :user="user"
      :mails="mails"
      :nav-collapsed-size="4"
    />
  </div>
</template>

<route lang="yaml">
  meta:
    layout: home
  </route>
