export async function registerLozad() {
  // 图片懒加载
  useScriptTag(
    'https://gw.alipayobjects.com/os/k/3j/lozad.min.js',
    (_el: HTMLScriptElement) => {
      const observer = (window as any).lozad('.lozad', {
        loaded(el: { alt: any, getAttribute: (arg0: string) => any }) {
          el.alt = el.getAttribute('data-alt')
        },
      })
      observer.observe()
    },
  )
}
