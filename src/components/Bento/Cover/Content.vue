<script setup lang="ts">

</script>

<template>
  <div class="content-container border-2px border-[#457AF7] rounded-md border-solid bg-[var(--cover-main-color)] px-4 py-8 dark:border-[#474d63]">
    <span class="pointer-events-none absolute inset-0 m-10px select-none border-2 border-[#457AF7] border-dashed opacity-100 dark:border-[#474d63]">
      <span class="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -left-0.5 -top-0.5" />
      <span class="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -right-0.5 -top-0.5" />
      <span class="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -bottom-0.5 -left-0.5" />
      <span class="absolute h-1.5 w-1.5 select-none border border-[#457AF7] bg-[#457AF7] -bottom-0.5 -right-0.5" />

      <!-- <span class="absolute h-200% w-1px select-none border border-[#457AF7] border-dashed -left-0.5 -top-1/2" />
      <span class="absolute h-200% w-1px select-none border border-[#457AF7] border-dashed -right-0.5 -top-1/2" />
      <span class="absolute h-1px w-200% select-none border border-[#457AF7] border-dashed -left-1/2 -top-0.5" />
      <span class="absolute h-1px w-200% select-none border border-[#457AF7] border-dashed -bottom-0.5 -right-1/2" /> -->
    </span>

    <div class="text-[36px] text-[#c29048] font-bold leading-normal font-[fantasy]">
      My default cover
    </div>

    <div class="text-[24px] text-[#ffffff] font-bold leading-normal tracking-widest font-[fantasy]">
      {{ `< Arvin  /> ` }}
    </div>
  </div>
</template>

<style scoped>
.content-container::before {
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
