interface ISetConfigMessage {
  setConfig: {
    theme?: any
    repo?: string
    repoId?: string
    category?: string
    categoryId?: string
    term?: string
    description?: string
    backLink?: string
    number?: number
    strict?: boolean
    reactionsEnabled?: boolean
    emitMetadata?: boolean
    inputPosition?: any
    lang?: any
  }
}

// https://giscus.app/zh-CN
export function registerGiscus(root: HTMLElement) {
  const giscusFrame = document.getElementById('giscus-frame')
  if (giscusFrame) {
    return null
  }
  else {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'pinky-pig/Arvin')
    script.setAttribute('data-repo-id', 'R_kgDOLC_KIQ')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOLC_KIc4CexE9')
    script.setAttribute('data-mapping', 'og:title')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', getCommentTheme(isDark.value ? 'dark' : 'light'))
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', '')
    root.appendChild(script)
    updateGiscusTheme()
  }
  return { root }
}

export function updateGiscusConfig(message: ISetConfigMessage) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (!iframe)
    return
  iframe.contentWindow!.postMessage({ giscus: message }, 'https://giscus.app')
}

export function updateGiscusTheme() {
  watch(isDark, () => {
    updateGiscusConfig({
      setConfig: {
        theme: getCommentTheme(isDark.value ? 'dark' : 'light'),
      },
    })
  })
}

export function getCommentTheme(color: string) {
  if (color === 'dark')
    return `${window.location.protocol}//${window.location.host}/styles/giscus/dark-comment.css`
  else
    return `${window.location.protocol}//${window.location.host}/styles/giscus/light-comment.css`
}
