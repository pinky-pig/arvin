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
    <div class="back-to-top-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><g filter="url(#f2377id0)"><path fill="url(#f2377id2)" d="m7.545 10.19l7.57-8.13a.992.992 0 0 1 1.43-.01l7.57 8.13c.56.597.12 1.564-.71 1.564h-3.64c-.35 0-.64.284-.64.626v5.194c0 .645-.53 1.163-1.19 1.163h-4.22c-.65 0-1.19-.518-1.18-1.153v-5.195a.637.637 0 0 0-.64-.625h-3.64c-.83 0-1.27-.958-.71-1.563" /></g><g fill="#59555F" filter="url(#f2377id1)"><path d="M12.27 20.569H5.83c-.55 0-1 .45-1 1s.45 1 1 1h2.22v6.17c0 .55.45 1 1 1s1-.45 1-1v-6.17h2.22c.55 0 1-.45 1-1c0-.56-.45-1-1-1m9.39.01h2.77c1.51 0 2.74 1.23 2.74 2.74c0 1.51-1.23 2.74-2.74 2.74h-1.77v2.69c0 .55-.45 1-1 1s-1-.45-1-1v-7.17c0-.55.45-1 1-1m1 3.48h1.77c.41 0 .74-.33.74-.74s-.33-.74-.74-.74h-1.77zm-9.39 2.55c0 1.73 1.41 3.14 3.15 3.14c1.73 0 3.15-1.41 3.15-3.14v-2.88c0-1.73-1.41-3.14-3.15-3.14s-3.15 1.41-3.15 3.14zm2-2.88a1.15 1.15 0 0 1 2.3 0v2.88c0 .64-.52 1.15-1.15 1.15c-.63 0-1.15-.52-1.15-1.15z" /></g><defs><filter id="f2377id0" width="18.571" height="18.976" x="6.794" y=".751" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="-.5" dy=".5" /><feGaussianBlur stdDeviation=".375" /><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" /><feColorMatrix values="0 0 0 0 0.505882 0 0 0 0 0.47451 0 0 0 0 0.537255 0 0 0 1 0" /><feBlend in2="shape" result="effect1_innerShadow_18590_958" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dy="-1" /><feGaussianBlur stdDeviation=".5" /><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" /><feColorMatrix values="0 0 0 0 0.152941 0 0 0 0 0.12549 0 0 0 0 0.188235 0 0 0 1 0" /><feBlend in2="effect1_innerShadow_18590_958" result="effect2_innerShadow_18590_958" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="1" dy="-1" /><feGaussianBlur stdDeviation=".5" /><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" /><feColorMatrix values="0 0 0 0 0.152941 0 0 0 0 0.12549 0 0 0 0 0.188235 0 0 0 1 0" /><feBlend in2="effect2_innerShadow_18590_958" result="effect3_innerShadow_18590_958" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="1" dy="1" /><feGaussianBlur stdDeviation=".5" /><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" /><feColorMatrix values="0 0 0 0 0.239216 0 0 0 0 0.192157 0 0 0 0 0.290196 0 0 0 1 0" /><feBlend in2="effect3_innerShadow_18590_958" result="effect4_innerShadow_18590_958" /></filter><filter id="f2377id1" width="23.19" height="9.83" x="4.63" y="19.919" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dy="-.65" /><feGaussianBlur stdDeviation=".325" /><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" /><feColorMatrix values="0 0 0 0 0.176471 0 0 0 0 0.141176 0 0 0 0 0.211765 0 0 0 1 0" /><feBlend in2="shape" result="effect1_innerShadow_18590_958" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx=".65" /><feGaussianBlur stdDeviation=".325" /><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" /><feColorMatrix values="0 0 0 0 0.176471 0 0 0 0 0.141176 0 0 0 0 0.211765 0 0 0 1 0" /><feBlend in2="effect1_innerShadow_18590_958" result="effect2_innerShadow_18590_958" /><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="-.2" /><feGaussianBlur stdDeviation=".25" /><feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" /><feColorMatrix values="0 0 0 0 0.176471 0 0 0 0 0.141176 0 0 0 0 0.211765 0 0 0 1 0" /><feBlend in2="effect2_innerShadow_18590_958" result="effect3_innerShadow_18590_958" /></filter><linearGradient id="f2377id2" x1="15.83" x2="15.83" y1="5.028" y2="18.727" gradientUnits="userSpaceOnUse"><stop stop-color="#61576D" /><stop offset="1" stop-color="#4D4753" /></linearGradient></defs></g></svg>
    </div>
    <div class="button-glowing" />
  </div>
</template>

<style scoped>
.top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 100%;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.top-btn:hover > .back-to-top-btn {
  transform: scale(1.1);
  background-position: right center;
  background-size: 200% auto;
  /* -webkit-animation: pulse 1.5s forwards; */
  /* animation: pulse512 1.5s forwards; */
}

.top-btn:hover > .button-glowing {
  opacity: 1;
}

.back-to-top-btn {
  width: 40px;
  height: 60px;
  display: grid;
  place-items: center;
  background: var(--blog-btn);
  border-radius: 99999px;
  transition: all ease-in-out 0.2s;
}

.button-glowing {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  transition: all 1s ease;
  pointer-events: none;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(60px);
  background-image: linear-gradient(45deg, #5021ff, #36e4da, #0047e1);
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
