export async function registerHeti() {
  // 字体间距优化
  useScriptTag(
    '/heti/heti-addon.min.js',
    (_el: HTMLScriptElement) => {
      const heti = new (window as any).Heti('.heti')
      heti.autoSpacing()
    },
  )
}
