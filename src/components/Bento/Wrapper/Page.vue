<script setup lang="ts">
const isOpen = ref(true)
const router = useRouter()

onMounted(() => {
  document.body.style.overflow = 'hidden'
  isOpen.value = true
})
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
onActivated(() => {
  document.body.style.overflow = 'hidden'
  isOpen.value = true
})

function closeAndToHome() {
  isOpen.value = false
  setTimeout(() => {
    router.push('/')
  }, 600)
}
</script>

<template>
  <div
    :class="isOpen ? 'bubbleCardUp' : 'bubbleCardDown'"
    class="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col"
  >
    <nav class="bg-[var(--bg-second-color)] px-4 py-3 font-medium md:px-8">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-4">
          <div class="return-arrow" @click="closeAndToHome">
            <div i-carbon:direction-loop-left />
          </div>
          <span>
            <slot name="title" />
          </span>
        </div>
        <div class="flex items-center justify-end gap-2">
          <DarkToggle />
        </div>
      </div>
    </nav>
    <main class="flex-1 flex-grow-2 overflow-hidden bg-[var(--background)] p-4">
      <slot />
    </main>
    <div class="bg-[var(--background)]">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.bubbleCardUp{
  animation: slide-up .6s ease-in-out;
}

.return-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  border-radius: 18px;
  color: var(--text-color);
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.return-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}

.bubbleCardDown{
  animation: slide-down .6s ease-in-out;
}
@keyframes slide-up {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0%);
  }
}
@keyframes slide-down {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
</style>
