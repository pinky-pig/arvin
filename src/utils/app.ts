import { SITE } from '~/config'
import '~/components/normal/lit-components'

export function AppSetup() {
  onMounted(() => {
    // eslint-disable-next-line no-console
    console.log(SITE.consoleColorFulOutput, 'color: #ffffff; background-color: #0D1117; padding: 0.2rem 0.3rem;font-size: 1rem;font-weight: 600;')
  })
}
