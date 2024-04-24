<script setup lang="ts">
</script>

<template>
  <div class="cover-container relative h-full w-full overflow-hidden rounded-[10px] bg-[var(--cover-main-color)]">
    <div class="inner-container pointer-events-none absolute left-1/2 top-1/2 !h-[90%] !w-[90%] border-[2px] border-[#457AF7] rounded-[6px] border-solid bg-[var(--cover-main-color)] px-4 py-8 translate-x-[-50%] translate-y-[-50%] dark:border-[#474d63]">
      <span class="pointer-events-none absolute inset-0 m-[10px] select-none border-2 border-[#457AF7] border-dashed opacity-100 dark:border-[#474d63]">
        <span class="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -left-0.5 -top-0.5" />
        <span class="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -right-0.5 -top-0.5" />
        <span class="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -bottom-0.5 -left-0.5" />
        <span class="absolute h-1.5 w-1.5 select-none border border-[#457AF7] bg-[#457AF7] -bottom-0.5 -right-0.5" />

      <!-- <span class="absolute h-200% w-[1px] select-none border border-[#457AF7] border-dashed -left-0.5 -top-1/2" />
      <span class="absolute h-200% w-[1px] select-none border border-[#457AF7] border-dashed -right-0.5 -top-1/2" />
      <span class="absolute h-[1px] w-200% select-none border border-[#457AF7] border-dashed -left-1/2 -top-0.5" />
      <span class="absolute h-[1px] w-200% select-none border border-[#457AF7] border-dashed -bottom-0.5 -right-1/2" /> -->
      </span>

      <div class="text-[36px] text-[#c29048] font-bold leading-normal font-[fantasy]">
        My default cover
      </div>

      <div class="text-[24px] text-[#ffffff] font-bold leading-normal tracking-widest font-[fantasy]">
        {{ `< Arvin  /> ` }}
      </div>
    </div>

    <!-- bg1 -->
    <div class="mask-1" />

    <!-- linear1 -->
    <div class="linear-1" />
    <div class="linear-2" />
  </div>
</template>

<style scoped>
.cover-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/noise-light.png);
  background-repeat: repeat;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  color: rgb(255, 250, 221);
}
.mask-1 {
  position: absolute;
  right: 20px;
  top: 50%;
  height: 90%;
  width: 60%;
  background-color: white;
  transform: translateY(-50%);
  backdrop-filter: blur(16px);
  opacity: 0.05;
  border-radius: 10px;
  z-index: -1;
  pointer-events: none;
}
.linear-1 {
  position: absolute;
  width: 220px;
  height: 220px;
  right: -20px;
  top: 60px;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(40px);
  background-color: #7d2bf9;
  pointer-events: none;
}
.linear-2 {
  position: absolute;
  width: 220px;
  height: 220px;
  right: 10px;
  bottom: 50px;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(60px);
  background-color: #357c36;
  mix-blend-mode: difference;
  pointer-events: none;
}
.inner-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(/noise-light.png);
  background-repeat: repeat;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  color: rgb(255, 250, 221);
}
</style>
