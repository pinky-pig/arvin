import { SITE } from '~/config'
import '~/components/lit-components'

export function AppSetup() {
  // const messages = [
  //   'No match found for location with path "/blog/', // 中文博客路由匹配
  //   'NotFoundError: The object can not be found here.', // safari
  // ]
  // if (typeof window !== 'undefined') {
  //   window.addEventListener('error', (ev) => {
  //     if (messages.includes(ev.message)) {
  //       ev.preventDefault()
  //       window.location.reload()
  //     }
  //   })
  // }

  onMounted(() => {
    // eslint-disable-next-line no-console
    console.log(SITE.consoleColorFulOutput, 'color: #ffffff; background-color: #0D1117; padding: 0.2rem 0.3rem;font-size: 1rem;font-weight: 600;')
  })
}
