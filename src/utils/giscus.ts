import { giscusSetting } from '~/config/param'

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
    script.setAttribute('data-repo', giscusSetting['data-repo'])
    script.setAttribute('data-repo-id', giscusSetting['data-repo-id'])
    script.setAttribute('data-category', giscusSetting['data-category'])
    script.setAttribute('data-category-id', giscusSetting['data-category-id'])
    script.setAttribute('data-mapping', giscusSetting['data-mapping'])
    script.setAttribute('data-strict', giscusSetting['data-strict'])
    script.setAttribute('data-reactions-enabled', giscusSetting['data-reactions-enabled'])
    script.setAttribute('data-emit-metadata', giscusSetting['data-emit-metadata'])
    script.setAttribute('data-input-position', giscusSetting['data-input-position'])
    script.setAttribute('data-theme', getCommentTheme(isDark.value ? 'dark' : 'light'))
    script.setAttribute('data-lang', giscusSetting['data-lang'])
    // script.setAttribute('data-loading', 'lazy')
    script.setAttribute('crossorigin', giscusSetting.crossorigin)
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
