<script setup lang="ts">
import HeaderLogo from './Logo.vue'
import HeaderNav from './Nav.vue'
</script>

<template>
  <div
    id="nav-bg"
    class="fixed left-0 top-0 z-2 h-fit w-full flex flex-row items-center justify-between px-3.5vw py-18px md:h-80px md:py-unset"
  >
    <HeaderLogo />
    <HeaderNav />

    <div class="grid h-40px w-40px place-items-center">
      <DarkToggle />
    </div>
  </div>
</template>

<style scoped>
#nav-bg {
  will-change: opacity, transform;
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  box-shadow:
    0 0 transparent,
    0 0 transparent,
    var(--header-avatar-shadow);

  /* 下面这个是上下渐变 */
  background: linear-gradient(to bottom, var(--background), transparent);
  /* 加上下面这个是设置渐变毛玻璃 */
  /* background: red;
  mask-image: linear-gradient(to top, transparent, #000);
  -webkit-mask-image: linear-gradient(to top, transparent, #000); */
}

@media (min-width: 768px) {
  #nav-bg {
    height: 80px;
  }
}
</style>
