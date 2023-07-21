import { defineStore } from 'pinia'
import filters from '../data/header.json'
import { useFetchGames } from '../modules/useFetchGames'
import { useFetchPlatforms } from '../modules/useFetchPlatforms'
import { ref, computed } from 'vue'

export const useHeaderStore = defineStore('headerStore', () => {
    // Position

    const positionX = ref(null)
    const positionY = ref(null)
    const width = ref(null)

    const checkFilterListPosition = (container) => {
        positionX.value = `${container.offsetLeft}px`
        positionY.value = `${container.offsetTop}px`
        width.value = `${container.clientWidth}px`
    }

    //  Filtering

    const allGames = ref([])
    const filteredGames = ref([])
    const page = ref(1)
    const isFilter = ref(false)
    const currentPlatformQuery = ref('')
    const parentPlatformQuery = ref('/lists/parents')

    const currentlyDisplayedGames = computed(() =>
        !isFilter.value ? allGames.value : filteredGames.value
    )

    const orderByFilter = ref('')
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
        currentPlatformTypeParent.value = null
    }

    // Desktop List

    const selectFilter = async (selectedFilter, platformQuery) => {
        filteredGames.value = []
        isFilter.value = true
        page.value = 1

        if (!selectedFilter.type) {
            clearPlatformSelection(selectedFilter)
            selectedFilter.selected = true
            selectedPlatformFilter.value = selectedFilter.name

            await fetchGamesByFilter(platformQuery)

            setTimeout(() => {
                closePlatformFilterList()
            }, 300)
        }
    }

    const filterOption = computed(() => {
        switch (orderByFilter.value.toLowerCase()) {
            case 'relevance':
                return 'ordering=-updated'
            case 'date added':
                return 'ordering=-added'
            case 'name':
                return 'ordering=name'
            case 'release date':
                return 'ordering=-released'
            case 'popularity':
                return 'ordering=-added'
            case 'average rating':
                return 'ordering=-rating'
            default:
                return 'ordering=-metacritic'
        }
    })

    const fetchGamesByFilter = async (platformQuery = '') => {
        const currentDate = new Date().toJSON().slice(0, 10)

        // selectedPlatformFilter.value

        const platforms = await useFetchPlatforms(platformQuery)
        const platformsToSearch = computed(() =>
            platformQuery === '' ? 'platforms' : 'parent_platforms'
        )

        const platformId = computed(() =>
            platforms.results.find((p) => {
                if (!selectedPlatformFilter.value) {
                    return p.name.toLowerCase() === 'pc'
                } else {
                    return p.name.toLowerCase() === selectedPlatformFilter.value.toLowerCase()
                }
            })
        )

        const query = ref(
            `${filterOption.value}&${platformsToSearch.value}=${platformId.value.id}&dates=2022-01-01,${currentDate}&page=${page.value}`
        )

        const data = await useFetchGames(query.value)

        data.results.forEach((game) => {
            filteredGames.value.push(game)
        })
    }

    // Fetching filtered data

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
        selectFilter,
        orderByFilter,
        allGames,
        filteredGames,
        page,
        isFilter,
        currentlyDisplayedGames,
        fetchGamesByFilter,
        parentPlatformQuery,
        currentPlatformQuery
    }
})
