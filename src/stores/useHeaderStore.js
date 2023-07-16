import { defineStore } from 'pinia'
import filters from '../data/header.json'
import { ref, computed } from 'vue'

export const useHeaderStore = defineStore('headerStore', () => {
    // Position

    const positionX = ref(null)
    const positionY = ref(null)
    const width = ref(null)

    const checkFilterListPosition = (container) => {
        positionX.value = `${container.offsetLeft}px`
        positionY.value = `${container.offsettop}px`
        width.value = `${container.clientWidth}px`
    }

    //  Mobile Filtering

    const orderBy = ref(filters.orderBy)
    const platforms = ref(filters.platforms)

    const selectedPlatformFilter = ref(null)
    const currentPlatformTypeFilter = ref(null)
    const currentPlatformTypeParent = ref(null)

    const isPlatformFilterListOpen = ref(false)
    const isPlatformFilterSubListOpen = ref(false)

    const currentPlatformFilters = computed(() =>
        isPlatformFilterSubListOpen.value ? currentPlatformTypeFilter.value : platforms.value
    )

    const clearPlatformSelection = (filter) => {
        platforms.value.forEach((platform) => {
            if (platform.name !== filter.name) {
                platform.selected = false
            }
        })
    }

    const clearPlatformTypeSelection = (filter) => {
        platforms.value.forEach((platform) => {
            if (!platform.type) {
                return
            }
            platform.type.forEach((type) => {
                if (type.name !== filter.name) {
                    type.selected = false
                }
            })
        })
    }

    const closePlatformFilterList = () => {
        isPlatformFilterListOpen.value = false
        isPlatformFilterSubListOpen.value = false
        currentPlatformTypeFilter.value = null
    }

    // Desktop List

    const selectFilter = (selectedFilter) => {
        if (!selectedFilter.type) {
            clearPlatformSelection(selectedFilter)
            selectedFilter.selected = true
            selectedPlatformFilter.value = selectedFilter.name

            setTimeout(() => {
                closePlatformFilterList()
            }, 300)
        }
    }

    return {
        orderBy,
        platforms,
        currentPlatformTypeFilter,
        selectedPlatformFilter,
        currentPlatformFilters,
        currentPlatformTypeParent,
        isPlatformFilterSubListOpen,
        isPlatformFilterListOpen,
        clearPlatformSelection,
        closePlatformFilterList,
        clearPlatformTypeSelection,

        // Desktop

        positionX,
        positionY,
        width,
        checkFilterListPosition,
        selectFilter
    }
})
