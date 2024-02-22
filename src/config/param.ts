export const SITE = {
  title: '博客',
  author: 'Arvin',
  description: '记录 Arvin 的不枯燥生活',
  profileContent: '我是Arvin，目前生活在南京的开发者。我很喜欢 Vue、Nuxt。目前从事前端开发及 WebGIS 。',
  keywords: 'Arvin,Pinky-pig,Blog,前端,Vue',
  icon: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imageslogo.svg',
  pic: 'https://cdn.fliggy.coblogPagem/upic/2XFNGI.png',
  homePage: '/',
  profilePage: '/profile',
  twitterId: 'ArvinnWang',
  githubId: 'pinky-pig',
  repo: 'pinky-pig/what-is-my-astro-blog',
  notion: 'https://hail-manatee-fc5.notion.site/a3d8b723782e48a3b3570980e83c70ae?v=0c510fa996e2492b943e7746c1bd9974',
  consoleColorFulOutput: '%cDon\'t ignore your dreams \nDon\'t work too much \nsay what you think \ncultivate friendships \nbe happy~ ',
}

export const navFilter = [
  { label: '组件', route: '/' },
  { label: '文章', route: '/blog' },
  { label: '项目', route: '/project' },
]

export const PROJECTS = [
  {
    name: 'Arvin',
    desc: '个人网站',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230625154539.png',
    demoUrl: 'https://mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/Arvin',
  },
  {
    name: 'Superellipse SVG',
    desc: 'SVG 超椭圆生成器，支持直接下载及用作 SVG background-image',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230728150846.png',
    demoUrl: 'https://superellipse.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/superellipse-svg',
  },
  {
    name: 'Encode SVG',
    desc: 'SVG 格式化，转 Base64 。background-image 可用',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20240222135732.png',
    demoUrl: 'https://encodesvg.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/encode-svg',
  },
  {
    name: 'Html2particel',
    desc: 'DOM 元素转 Canvas 粒子',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20240222140019.png',
    demoUrl: 'https://html2particle.mmeme.me/guide/demo.html',
    repoUrl: 'https://github.com/pinky-pig/html2particle',
  },
  {
    name: 'What Is My V3 Dragblock',
    desc: 'Vue3 实现的拖拽组件',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230629151111.png',
    demoUrl: 'https://dragblock.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/what-is-v3-dragblock',
  },
  {
    name: 'What Is My MouseTrail',
    desc: '浏览器插件：显示鼠标轨迹',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230701013633.png',
    demoUrl: 'https://mousetrail.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/what-is-my-mouse-trail/tree/refactor',
  },
  {
    name: 'My Love',
    desc: '我们',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20231023093538.png',
    demoUrl: 'https://love.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/my-love',
  },
  {
    name: 'What Holidays',
    desc: '地区节假日查询',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230922130106.png',
    demoUrl: 'https://holiday.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/what-holidays',
  },
  {
    name: 'Plane Window Scene',
    desc: '学习 Cesium 的过程中，实现的飞机窗口场景',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230725171710.png',
    demoUrl: 'https://scene.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/plane-window-scene',
  },

  {
    name: 'What Is My HTML Preview',
    desc: '使用 Monaco Editor 实现的 HTML 预览',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230627103859.png',
    demoUrl: 'https://playground.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/what-is-my-html-playground',
  },
  {
    name: 'SVG Path Editor',
    desc: 'VUE 版本实现 SvgPathEditor',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230627103811.png',
    demoUrl: 'https://svgpath.mmeme.me/',
    repoUrl: 'https://github.com/pinky-pig/icons-basic-edit',
  },
]

export enum UnsplashSetting {
  ApplicationName = 'what-is-my-new-tab',
  AccessKey = 'KM1kMtcaYX2SZQR1m_o-pwg4RJZUVivPZgfJsbw5h2o',
  SecretKey = 'ma572d0k1fKQIBlLm49h9k3A7np9X_ezS1hfu4Upaeo',
}

export enum MapboxSetting {
  token = 'pk.eyJ1IjoicGlua3ktcGlnIiwiYSI6ImNsZnJvZ2Q1cDAwZ3ozcG56bXFwbjAzZjAifQ.eEOFvRbKqZHQ3OxeqPBsXw',
  mapLightStyle = 'mapbox://styles/pinky-pig/clgc32u1e004g01n2bitvj86a',
  mapDarkStyle = 'mapbox://styles/pinky-pig/clft35kll000o01osk8svnlfg',
}

// https://console.upstash.com/
export enum UpstashSetting {
  UPSTASH_REDIS_REST_URL = 'https://emerging-roughy-42883.upstash.io',
  UPSTASH_REDIS_REST_TOKEN = 'AaeDASQgODUzYmUyMTgtMTVlZS00NzVlLTliZGQtYWYzN2Y4MjU0N2RkYjI3ZDY1ZWU3Y2JjNDQwM2JjM2M2OTMwZTJjYTFjNDg=',
}
