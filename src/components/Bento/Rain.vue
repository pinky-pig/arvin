<script setup lang="ts">
import * as THREE from 'three'

const settings = { fps: 30, parallaxVal: 1 }
let scene: any, camera: any, renderer: any, material: any
let clock = new THREE.Clock()

async function init() {
  const container = document.getElementById('rain-container-component')
  renderer = new THREE.WebGLRenderer({
    antialias: false,
  })
  renderer.setSize(
    (document.querySelector('.parent-rain-node') as HTMLElement).offsetWidth,
    (document.querySelector('.parent-rain-node') as HTMLElement).offsetHeight,
  )
  container!.appendChild(renderer.domElement)
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  material = new THREE.ShaderMaterial({
    uniforms: {
      u_tex0: { type: 't' },
      u_time: { value: 0, type: 'f' },
      u_intensity: { value: 0.4, type: 'f' },
      u_speed: { value: 0.25, type: 'f' },
      u_brightness: { value: 0.8, type: 'f' },
      u_normal: { value: 0.5, type: 'f' },
      u_zoom: { value: 2.61, type: 'f' },
      u_blur_intensity: { value: 0.5, type: 'f' },
      u_blur_iterations: { value: 16, type: 'i' },
      u_panning: { value: false, type: 'b' },
      u_post_processing: { value: true, type: 'b' },
      u_lightning: { value: false, type: 'b' },
      u_texture_fill: { value: true, type: 'b' },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: 'v2' },
      u_tex0_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: 'v2' },
    } as any,
    vertexShader: `
      varying vec2 vUv;        
      void main() {
          vUv = uv;
          gl_Position = vec4( position, 1.0 );    
      }
    `,
  })
  material.fragmentShader = await (await fetch('/rain/rain.frag')).text()

  new THREE.TextureLoader().load('/rain/image.jpg', (tex: any) => {
    material.uniforms.u_tex0_resolution.value = new THREE.Vector2(tex.image.width, tex.image.height)
    material.uniforms.u_tex0.value = tex
  })

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 1, 1), material)
  scene.add(quad)
}

function render() {
  setTimeout(() => {
    requestAnimationFrame(render)
  }, 1000 / settings.fps)

  // reset every 6hr
  if (clock.getElapsedTime() > 21600)
    clock = new THREE.Clock()
  material.uniforms.u_time.value = clock.getElapsedTime()

  renderer.render(scene, camera)
}

onMounted(() => {
  init()
  render()
})

const router = useRouter()
function toRain() {
  router.push('/rain')
}
</script>

<template>
  <div class="parent-rain-node relative select-none overflow-hidden bg-[var(--card--bg)]">
    <div class="pointer-events-none overflow-hidden">
      <div id="rain-container-component" />
    </div>

    <button class="detail-arrow" @click="toRain">
      <div class="h-16px w-16px" i-carbon-arrow-up-right />
    </button>
  </div>
</template>

<style scoped>
.detail-arrow{
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  position: absolute;
  left: 12px;
  bottom: 10px;
  color: var(--text-color);
  border-radius: 18px;
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}

.detail-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
</style>
