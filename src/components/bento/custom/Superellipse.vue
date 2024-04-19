<script setup lang="ts">
// https://mathworld.wolfram.com/Superellipse.html
// https://github.com/georgedoescode/squircle
// https://www.cocoanetics.com/2013/06/ios-7-icon-squircle/
// https://www.w3cplus.com/css/smooth-corners-with-css-houdini.html

function open(twitterUrl = 'https://twitter.com/ArvinnWang') {
  window.open(twitterUrl)
}
</script>

<template>
  <div
    class="relative flex flex-col place-items-center items-center justify-center !bg-transparent"
    style="box-shadow: unset !important;"
  >
    <SuperellipseGeneratorBySVG
      class="pointer-events-none absolute left-0 top-0 h-full w-full text-[#98CFFF] dark:text-[var(--card--bg)]"
    />

    <div
      class="pointer-events-auto relative z99 cursor-pointer !select-none"
      @click="open()"
    >
      <div
        class="h-20 w-20 text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:animate-[shake_1.5s_ease-in-out_infinite] dark:text-[#98CFFF]"
        i-carbon:logo-twitter
      />
    </div>
  </div>
</template>
