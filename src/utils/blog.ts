import dayjs from 'dayjs'

export function parseTitleFromContentList(oldTitle: string) {
  return `第${oldTitle.split(' ')[0]}期 - ${oldTitle.split(' ')[1]}`
}

// 转化文章路由地址
export function parseLinkToRoute(oldTitle: string) {
  const index = Number.parseInt(oldTitle.split('-')[0])
  const linkNum = index > 9 ? `${index}` : `0${index}`
  const path = `/${linkNum}`
  return path
}

// 排序所有的文章
export function sortPosts(allPosts: any) {
  return allPosts.sort((a: { url: string }, b: { url: string }) => {
    return (
      Number.parseInt(b.url.split('/posts/')[1].split('-')[0])
      - Number.parseInt(a.url.split('/posts/')[1].split('-')[0])
    )
  })
}

// 回到顶部
export function scrollToBlogTop() {
  window && window?.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
  // const el = ref<HTMLElement | null>(null)
  // const { x, y } = useScroll(el, { behavior: 'smooth' })
  // x.value = 0
  // return { el, x, y }
}

export function formatDate(d: string | Date, onlyDate = true) {
  const date = dayjs(d)
  if (onlyDate || date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}
