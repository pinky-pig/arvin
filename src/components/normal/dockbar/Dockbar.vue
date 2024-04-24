<template>
  <div class="max-w-[100vw] px-5 m-5" style="width: fit-content;">
    <div class="rounded-full no-scrollbar overflow-x-auto sm:overflow-visible bg-[var(--dockbar-bg)]">
      <div class="flex p-2 items-center space-x-2 text-2xl md:justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>
