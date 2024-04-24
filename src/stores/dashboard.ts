import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IDashboardNav } from '~/typings/dashboard'

export const useDashBoardStore = defineStore('dashboard', () => {
  const currentNav = ref<IDashboardNav>()

  function setCurrentNav(nav: IDashboardNav) {
    currentNav.value = nav
  }

  return {
    currentNav,
    setCurrentNav,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
