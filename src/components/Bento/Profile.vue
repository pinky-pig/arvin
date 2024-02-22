<script setup lang="ts">
import Typed from 'typed.js'

const typedInstance = ref<Typed>()
const iconRef = ref<HTMLElement | null>(null)
const avatarBgRef = ref<HTMLElement | null>(null)
const avatarImgRef = ref<HTMLElement | null>(null)
const currentAvatar = ref('Arvin')
function handleSwitch() {
  clearAllSetTimeout()
  avatarImgRef.value?.classList.add('expanding-avatar-circle')
  setTimeout(() => {
    currentAvatar.value = currentAvatar.value === 'Arvin' ? 'Arvin2' : 'Arvin'
    avatarBgRef.value?.classList.add('expanding-bg-circle')
    setTimeout(() => {
      avatarBgRef.value?.classList.remove('expanding-bg-circle')
    }, 1000)
  }, 500)

  setTimeout(() => {
    avatarImgRef.value?.classList.remove('expanding-avatar-circle')
  }, 1000)

  typedRestart()
}

function clearAllSetTimeout() {
  let id = setTimeout(() => { }, 0) as unknown as number
  while (id--)
    clearTimeout(id)
}

// https://jsfiddle.net/mattboldt/60h9an7y/
const $s1h = ref<HTMLElement>()
const $s1 = ref<HTMLElement>()

onMounted(async () => {
  typedInstance.value = await typeSentence1()
})

function typedRestart() {
  typedInstance.value?.reset()
}
async function typeSentence1() {
  return new Promise<Typed>((resolve) => {
    const _ = new Typed($s1.value, {
      stringsElement: $s1h.value,
      // cursorChar: ' ▋ ', // 光标字符
      typeSpeed: 50,
      onBegin(_self) {
        // self.cursor.style.opacity = '1'
      },
      onComplete(self) {
        self.cursor.style.opacity = '0'
        // resolve(self)
      },
    })

    resolve(_)
  })
}
</script>

<template>
  <ShadowCard class="justify-between !p-5px">
    <div>
      <div ref="$s1h" hidden>
        <div>
          <span class="text-20px font-[cursive]">
            我是
            <span class="text-30px font-[cursive]">Arvin</span>
            , 目前生活在南京的开发者。我很喜欢 Vue、Nuxt。目前从事前端开发及 WebGIS 。
          </span>
        </div>
      </div>
    </div>

    <div class="pointer-events-none relative min-h-[calc(100%_-_50px)] p-6">
      <div class="relative mb-30px h-96px w-96px">
        <div ref="avatarImgRef" class="avatar-img absolute left-0 top-0 z-20 mb-8 h-96px w-96px rounded-full dark:bg-[var(--header-avatar-bg)]">
          <div v-if="currentAvatar === 'Arvin'" class="h-full w-full" i-fluent-emoji:partying-face />
          <img v-else ref="avatarImgRef" class="h-full w-full" src="/logo.png" alt="">
        </div>
        <div ref="avatarBgRef" class="avatar-bg" />
      </div>

      <span ref="$s1" />

      <button class="switch-btn pointer-events-auto" @click="handleSwitch">
        <div ref="iconRef" class="icon" :class="currentAvatar === 'Arvin' ? 'icon_rotate_one' : 'icon_rotate_two'" style="transform: rotate(0);">
          <svg
            width="15.702"
            height="15.702"
            viewBox="0 0 15.702 15.702"
          >
            <g transform="translate(2.62 2.617)">
              <path d="M14.8,12.032a5.229,5.229,0,0,1-9.824,2.482" transform="translate(-4.34 -6.777)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M4,9.149A5.231,5.231,0,0,1,13.83,6.731" transform="translate(-4.004 -4)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M15.953,6.952h2.313V4.639" transform="translate(-8.135 -4.221)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M6.825,15.825H4.512v2.313" transform="translate(-4.18 -8.088)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
            </g>
            <path id="Path_9" data-name="Path 9" d="M0,0H15.7V15.7H0Z" fill="none" />
          </svg>
        </div>
        <p class="text">
          Toggle
        </p>
      </button>
    </div>

    <div class="flex flex-row justify-end gap-4 px-6">
      <!-- 掘金 -->
      <a class="detail-arrow text-[#1F80FF]" href="https://juejin.cn/user/149189314490520/posts" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m12 14.316l7.454-5.88l-2.022-1.625L12 11.1l-.004.003l-5.432-4.288l-2.02 1.624l7.452 5.88Zm0-7.247l2.89-2.298L12 2.453l-.004-.005l-2.884 2.318l2.884 2.3Zm0 11.266l-.005.002l-9.975-7.87L0 12.088l.194.156l11.803 9.308l7.463-5.885L24 12.085l-2.023-1.624Z" /></svg>
      </a>
      <!-- GitHub -->
      <a class="detail-arrow" href="https://github.com/pinky-pig" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="currentColor" fill-rule="evenodd" d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2Z" /></svg>
      </a>
    </div>
  </ShadowCard>
</template>

<style scoped>
.detail-arrow {
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;

  color: var(--text-color);
  border-radius: 18px;
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}

.detail-arrow:hover {
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}

.intro-text {
  margin-top: 60px;
  text-align: start;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.5px;
  font-weight: 400;
  color: var(--text-color);
}
.switch-btn {
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  position: absolute;
  height: 36px;
  padding: 0px 12px;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 18px;
  background: transparent;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.2s ease-out 0s;
  will-change: box-shadow, transform;
  gap: 10px;
  transition: box-shadow 0.2s ease-out 0s;
}
.switch-btn:hover {
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
.switch-btn .icon {
  color: var(--text-color);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.switch-btn .text {
  line-height: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.25px;
  font-weight: 400;
  color: var(--text-color);
  margin-left: 6px;
}
.avatar-img {
  border-radius: 50%;
  box-shadow: var(--header-avatar-shadow), var(--header-avatar-shadow-1);
}

.icon_rotate_one {
  animation: rotation 0.5s cubic-bezier(0.42, 0, 1, 1) forwards;
  transform: rotate(180deg);
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.icon_rotate_two {
  animation: rotation-reverse 0.5s cubic-bezier(0.42, 0, 1, 1) forwards;
  transform: rotate(180deg);
}
@keyframes rotation-reverse {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.expanding-bg-circle {
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 42px;
  transform: translate(-50%, 0);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: transparent;
  animation: bg-expanding 1s cubic-bezier(0.42, 0, 0.5, 1) forwards;
}

.expanding-avatar-circle {
  animation: avatar-expanding 1s cubic-bezier(0.42, 0, 0.5, 1) forwards;
}
@keyframes bg-expanding {
  0% {
    background-color: rgba(152, 208, 255, 0.5);
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    background-color: rgba(152, 208, 255, 0.5);
    opacity: 0;
    transform: scale(40);
  }
}

@keyframes avatar-expanding {
  0% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  25% {
    opacity: 0.5;
    transform: scale(0.5) rotate(-15deg);
  }
  50% {
    opacity: 0;
    transform: scale(0) rotate(-30deg);
  }
  75% {
    opacity: 0.5;
    transform: scale(0.5) rotate(-15deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
</style>
