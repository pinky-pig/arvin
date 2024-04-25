<script setup lang="ts">
import { Icon } from '@iconify/vue'

import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import MapboxModal from '~/components/bento/modal/MapboxModal.vue'

import ShadowCard from '~/components/bento/wrapper/ShadowCard.vue'
import { SITE } from '~/config/param'

const online = useOnline()

let mapInstance: mapboxgl.Map | null = null

function marsOnloaded(map: mapboxgl.Map) {
  mapInstance = map

  mapInstance.on('load', () => {
    const el = document.createElement('div')
    el.innerHTML = `<logo-marker name="${'/logo.svg'}" />`
    new mapboxgl.Marker(el)
      .setLngLat(SITE.coordinate as LngLatLike)
      .addTo(map!)
  })
}
</script>

<template>
  <ShadowCard class="!p-[5px] dark:!p-0">
    <div v-if="!online" class="mt-1/5 h-full w-full text-center font-[fantasy] italic">
      You are offline
    </div>

    <MapboxMap v-else @onload="marsOnloaded" />

    <Dialog>
      <DialogTrigger class="detail-arrow">
        <Icon class="h-[16px] w-[16px]" icon="carbon-arrow-up-right" />
      </DialogTrigger>
      <DialogContent class="h-fit max-w-unset w-fit p-[10px] !bg-[var(--card-border)] border-[var(--card-border)]">
        <DialogTitle v-show="false" />
        <DialogDescription v-show="false" />

        <MapboxModal />
      </DialogContent>
    </Dialog>
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
  position: absolute;
  right: 12px;
  bottom: 10px;
  color: var(--text-color);
  border-radius: 18px;
  background: var(--card--bg);
  box-shadow: var(--card-border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}

.detail-arrow:hover {
  cursor: pointer;
  box-shadow: var(--card-border) 0px 0px 0px 5px;
}
</style>
