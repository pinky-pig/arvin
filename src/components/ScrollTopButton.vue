<script setup lang="ts">
const { y } = useWindowScroll()

const isLargeScreen = useMediaQuery('(min-width: 540px)')
const isShow = computed(() => {
  return y.value > 200
})
function scrollToTop() {
  window?.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div
    class="top-btn"
    :class="(isLargeScreen && isShow) ? 'opacity-100' : 'opacity-0'"
    @click="scrollToTop"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="currentColor" d="M56 297.365V336h120v160h160V336h120v-38.626l-199.8-200ZM304 304v160h-96V304H94.639l161.535-161.37L417.384 304ZM56 16.002h400v32H56z" /></svg>
  </div>
</template>

<style scoped>
.top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: grid;
  place-items: center;
  cursor: pointer;
  border: 1px solid var(--blog-btn);
  color: var(--blog-btn);
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  transition: all ease-in-out 0.2s;
}
.top-btn:hover {
  transform: scale(1.1);
  background-position: right center;
  background-size: 200% auto;
  -webkit-animation: pulse 1.5s forwards;
  animation: pulse512 1.5s forwards;
}

@keyframes pulse512 {
  0% {
    box-shadow: 0 0 0 0 var(--blog-btn-shadow);
  }
  70% {
    box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
  }
  100% {
    box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
  }
}
</style>
