import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeneralStore = defineStore('generalStore', () => {
    const isSidebarMobileMenuOpen = ref(false)
    const isGridActive = ref(true)

    const isDesktopView = ref(true)
    const checkWindowWidth = () => {
        if (window.innerWidth >= 980) {
            isDesktopView.value = true
        } else {
            isDesktopView.value = false
        }
    }

    const isRateGameMobileWindowOpen = ref(false)
    const isGameDetailsOn = ref(false)
    const isHeader = ref(true)
    const isSideBar = ref(true)

    return {
        isSidebarMobileMenuOpen,
        isDesktopView,
        checkWindowWidth,
        isGridActive,
        isRateGameMobileWindowOpen,
        isGameDetailsOn,
        isHeader,
        isSideBar
    }
})
