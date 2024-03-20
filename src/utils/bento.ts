import { markRaw } from 'vue'
import BentoProfile from '~/components/Bento/Profile.vue'
import BentoWeekly from '~/components/Bento/Weekly.vue'
import BentoMapbox from '~/components/Bento/Mapbox.vue'
import BentoCountDown from '~/components/Bento/CountDown.vue'
import BentoDark from '~/components/Bento/Dark.vue'

// import BentoNotion from '~/components/Bento/Notion.vue'

// import BentoRain from '~/components/Bento/Rain.vue'
// import BentoPreview from '~/components/Bento/Preview.vue'
import MouseTail from '~/components/Bento/MouseTail.vue'
import DragMotion from '~/components/Bento/DragMotion.vue'
import Superellipse from '~/components/Bento/Superellipse.vue'
import StrokeText from '~/components/Bento/StrokeText.vue'
import P5Bg from '~/components/Bento/P5Bg.vue'
import Cover from '~/components/Bento/Cover/index.vue'
import Sticker8 from '~/components/Bento/Sticker8.vue'
import PlaneView from '~/components/Bento/PlaneView.vue'

// import GitHubSticker from '~/components/Bento/GitHubSticker.vue'

export const bentoCellsInDesktop = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(BentoProfile) },
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(BentoWeekly) },
  { id: '3', x: 0, y: 1, width: 2, height: 1, component: markRaw(BentoMapbox) },
  { id: '4', x: 3, y: 1, width: 1, height: 1, component: markRaw(BentoDark) },
  { id: '5', x: 3, y: 2, width: 2, height: 1, component: markRaw(BentoCountDown) },
  // { id: '6', x: 0, y: 3, width: 1, height: 1, component: markRaw(BentoNotion) },
  // { id: '7', x: 0, y: 4, width: 1, height: 1, component: markRaw(BentoRain) },
  // { id: '8', x: 1, y: 4, width: 1, height: 1, component: markRaw(BentoPreview) },
  { id: '9', x: 2, y: 4, width: 1, height: 1, component: markRaw(MouseTail) },
  { id: '10', x: 3, y: 4, width: 1, height: 1, component: markRaw(DragMotion) },
  { id: '11', x: 4, y: 4, width: 1, height: 1, component: markRaw(Superellipse) },
  { id: '12', x: 5, y: 4, width: 1, height: 1, component: markRaw(StrokeText) },
  // { id: '13', x: 1, y: 5, width: 2, height: 1, component: markRaw(GitHubSticker) },
  { id: '14', x: 6, y: 3, width: 1, height: 1, component: markRaw(P5Bg) },
  { id: '15', x: 6, y: 4, width: 1, height: 2, component: markRaw(Cover) },
  { id: '16', x: 6, y: 5, width: 1, height: 1, component: markRaw(Sticker8) },
  { id: '17', x: 1, y: 6, width: 1, height: 2, component: markRaw(PlaneView) },
]

export const bentoCellsInMobile = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(BentoProfile) },
  { id: '2', x: 0, y: 2, width: 2, height: 1, component: markRaw(BentoWeekly) },
  { id: '3', x: 0, y: 3, width: 2, height: 1, component: markRaw(BentoMapbox) },
  { id: '4', x: 0, y: 4, width: 2, height: 1, component: markRaw(BentoCountDown) },
  { id: '5', x: 0, y: 5, width: 1, height: 1, component: markRaw(BentoDark) },
  // { id: '6', x: 1, y: 5, width: 1, height: 1, component: markRaw(BentoNotion) },
  // { id: '7', x: 1, y: 4, width: 1, height: 1, component: markRaw(BentoRain) },
  // { id: '8', x: 1, y: 4, width: 1, height: 1, component: markRaw(BentoPreview) },
  { id: '9', x: 2, y: 4, width: 1, height: 1, component: markRaw(MouseTail) },
  { id: '10', x: 0, y: 6, width: 1, height: 1, component: markRaw(DragMotion) },
  { id: '11', x: 1, y: 6, width: 1, height: 1, component: markRaw(Superellipse) },
  { id: '12', x: 2, y: 6, width: 1, height: 1, component: markRaw(StrokeText) },
  // { id: '13', x: 1, y: 7, width: 2, height: 1, component: markRaw(GitHubSticker) },
  { id: '14', x: 1, y: 7, width: 1, height: 1, component: markRaw(P5Bg) },
  { id: '15', x: 1, y: 8, width: 1, height: 2, component: markRaw(Cover) },
  { id: '16', x: 1, y: 8, width: 1, height: 1, component: markRaw(Sticker8) },
  { id: '17', x: 1, y: 9, width: 1, height: 2, component: markRaw(PlaneView) },

]
