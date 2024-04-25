<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { SITE } from '~/config/param'

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
  <div class="h-[calc(60vh_-_60px)] max-w-[800px] w-[calc(100vw_-_60px)]">
    <MapboxMap class="rounded-lg" :options="{ zoom: 1 }" @onload="marsOnloaded" />
  </div>
</template>

<style scoped>

</style>
