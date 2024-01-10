<script setup lang="ts">
import { PROJECTS } from '~/config'

import UiShadowCard from '~/components/ui/ShadowCard.vue'
import UiShadowButton from '~/components/ui/ShadowButton.vue'

const isOpen = ref(false)
const currentProject = ref<typeof PROJECTS[0]>()

function openModal(_item: typeof PROJECTS[0]) {
  // currentProject.value = item
  // isOpen.value = true
}
</script>

<template>
  <div>
    <ClientOnly>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mx-auto max-w-970px justify-center gap-10px rounded-xl px-5px text-start md:grid-cols-[repeat(auto-fill,minmax(240px,300px))] md:px-25px">
        <UiShadowCard
          v-for="project in PROJECTS"
          :key="project.name"
          style="border: 5px solid var(--blog-card-border);"
          class="box relative flex flex-col cursor-pointer justify-center overflow-hidden border-[var(--blog-card-border)] rounded-12px border-solid bg-[var(--blog-card-bg)] object-cover text-[var(--blog-card-text)] shadow-md !p-0px hover:opacity-100"
          @click="openModal(project)"
        >
          <!-- 配图 -->

          <div class="image min-h-200px w-full select-none px-10px py-20px duration-500">
            <img
              :src="project.cover"
              class="pointer-events-none block h-full min-h-213.55px min-w-270px w-full rounded-md object-cover"
            >
          </div>
          <!-- 标题 -->
          <div
            class="pointer-events-auto absolute bottom-0 left-0 z-1 w-full flex items-center justify-between p-10px text-16px text-[var(--project-card-text)] leading-7"
          >
            <a :href="project.demoUrl" class="inline-flex gap-0.5 pr-0.5 text-[0.95em] leading-none hover:underline" target="_blank" data-state="closed" @click="event => event.stopPropagation()">
              {{ project.name }}
              <svg width="0.95em" height="0.95em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block translate-y-0.5" aria-hidden="true">
                <path d="M20 13.5001C20 14.8946 20 15.5919 19.8618 16.1673C19.4229 17.9956 17.9955 19.423 16.1672 19.8619C15.5918 20.0001 14.8945 20.0001 13.5 20.0001H12C9.19974 20.0001 7.79961 20.0001 6.73005 19.4551C5.78924 18.9758 5.02433 18.2109 4.54497 17.2701C4 16.2005 4 14.8004 4 12.0001V11.5001C4 9.17035 4 8.0055 4.3806 7.08664C4.88807 5.8615 5.86144 4.88813 7.08658 4.38066C7.86344 4.05888 8.81614 4.00915 10.5 4.00146M19.7597 9.45455C20.0221 7.8217 20.0697 6.16984 19.9019 4.54138C19.8898 4.42328 19.838 4.31854 19.7597 4.24027M19.7597 4.24027C19.6815 4.16201 19.5767 4.11023 19.4586 4.09806C17.8302 3.93025 16.1783 3.97792 14.5455 4.24027M19.7597 4.24027L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </UiShadowCard>

        <!-- <UModal v-model="isOpen" :ui="{ background: 'bg-transparent', rounded: 'rounded-[10px]' }"> -->
        <UiShadowCard v-if="currentProject" class="p-4">
          <template #default>
            <div class="pointer-events-auto p-0 md:p-1.5em">
              <div class="mb-4 flex flex-row items-center justify-between">
                <h2 class="text-[1.25rem] font-bold">
                  {{ currentProject.name }}
                </h2>

                <div class="cursor-pointer hover:opacity-50" i-carbon-close @click="isOpen = false" />
              </div>
              <img
                :src="currentProject.cover"
                class="pointer-events-none mb-4 block h-full w-full rounded-md object-cover"
              >
            </div>
          </template>

          <template #footer>
            <div class="flex flex-row justify-between gap-20px p-0 md:p-1.5em">
              <UiShadowButton class="rounded-md">
                <div class="truncate">
                  {{ currentProject.desc }}
                </div>
              </UiShadowButton>
              <div class="flex flex-shrink-0 flex-row gap-4">
                <UiShadowButton class="rounded-md">
                  <router-link i-carbon-logo-github class="h-24px w-24px" :to="currentProject.repoUrl" target="_blank" />
                </UiShadowButton>
                <UiShadowButton class="rounded-md">
                  <router-link :to="currentProject.demoUrl" target="_blank">
                    <svg class="z-10" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.2" d="M7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14L10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" fill="currentColor" />
                      <path d="M21 9L21 3M21 3H15M21 3L13 11M10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </router-link>
                </UiShadowButton>
              </div>
            </div>
          </template>
        </UiShadowCard>

        <!-- </UModal> -->
      </div>
    </ClientOnly>
    <div />
  </div>
</template>

<style scoped>
.box:hover .image {
  transform: scale(1.1);
}
.box {
  position: relative;
}
.box::after {
  content: '';
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    50%,
    rgba(0, 0, 0, 0)
  );
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 200px;
  bottom: -150px;
  transition: opacity 200ms ease 0s;
}
</style>
