export type CurrentTransitionNameType = 'page' | 'translateY' | 'null'

export const currentBlogTag = useStorage('currentBlogTag', '')

/** 当前页面过渡方式，CSS 在 global.css 中配置 */
export const currentTransitionName = useStorage<CurrentTransitionNameType>('currentTransitionName', 'page')
