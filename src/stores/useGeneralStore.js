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

    //  Data

    const allGames = ref([])
    const filteredGames = ref([])
    const page = ref(1)

    return {
        isSidebarMobileMenuOpen,
        isDesktopView,
        checkWindowWidth,
        isGridActive,
        page,
        allGames,
        filteredGames
    }
})
