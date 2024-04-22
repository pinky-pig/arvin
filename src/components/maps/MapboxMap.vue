<script setup lang="ts">
import mapboxgl from 'mapbox-gl'
import { onMounted, ref } from 'vue'
import { MapboxSetting } from '~/config'

const props = withDefaults(
  defineProps<{
    options?: any
  }>(),
  {
    options: () => ({}),
  },
)

const emit = defineEmits(['onload'])

let map: mapboxgl.Map | null
const mapContainer = ref(null)

onMounted(() => {
  initMars3d(props.options)
})
onUnmounted(() => {
  map!.remove()
})
function initMars3d(option: any) {
  map = new mapboxgl.Map({
    container: mapContainer.value!,
    ...option,
    style: MapboxSetting.mapDarkStyle,
    center: [118.888175, 32.048268],
    zoom: 4,
    accessToken: MapboxSetting.token,
  })
  emit('onload', map)
}
</script>

<template>
  <div ref="mapContainer" style="width: 100%; height: 100%;" />
</template>
