<script setup>
import PreviewLoadBtn from '../../components/preview/PreviewLoadBtn.vue'
import PreviewTileGrid from '../../components/preview/PreviewTileGrid.vue'
import PreviewTileSingleCol from '../../components/preview/PreviewTileSingleCol.vue'
import PreviewTileMobile from '../../components/preview/PreviewTileMobile.vue'
import { useFetchGames } from '../../modules/useFetchGames'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { useHeaderStore } from '../../stores/useHeaderStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const generalStore = useGeneralStore()
const { isDesktopView, isGridActive } = storeToRefs(generalStore)

const headerStore = useHeaderStore()
const { allGames, filteredGames, page, isFilter, currentlyDisplayedGames, currentPlatformQuery } =
    storeToRefs(headerStore)

const pending = ref(false)

const fetchAllGames = async () => {
    if (!isFilter.value) {
        isFilter.value = false
        pending.value = true
        const currentDate = new Date().toJSON().slice(0, 10)
        const query = `dates=2023-01-01,${currentDate}&ordering=-added&page=${page.value}`

        const data = await useFetchGames(query)

        data.results.forEach((game) => {
            allGames.value.push(game)
        })

        pending.value = false
    } else return
}

/*


*/

onMounted(() => {
    fetchAllGames()
    const loadBtn = document.querySelector('.load-btn')
    const loadBtnObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && allGames.value.length > 0 && !isFilter.value) {
                    page.value++
                    fetchAllGames()
                }

                if (entry.isIntersecting && filteredGames.value.length > 0 && isFilter.value) {
                    page.value++
                    headerStore.fetchGamesByFilter(currentPlatformQuery.value)
                }
            })
        },
        { rootMargin: '0px 0px 300px 0px' }
    )

    if (!isFilter.value) {
        loadBtnObserver.observe(loadBtn)
    } else {
        loadBtnObserver.unobserve(loadBtn)
    }
})

// Rendering grid
const gamesContainerWidth = ref()
const colCount = ref(null)
const gamesList1 = ref([])
const gamesList2 = ref([])
const gamesList3 = ref([])
const gamesList4 = ref([])

const getWrapperWidth = () => {
    if (isDesktopView.value && isGridActive) {
        const gamesWrapper = document.querySelector('.games-wrapper')
        if (gamesWrapper) {
            gamesContainerWidth.value = gamesWrapper.clientWidth
        }
    }
}

const gridColCount = () => {
    if (gamesContainerWidth.value <= 880) {
        colCount.value = 2
    } else if (880 < gamesContainerWidth.value <= 1180) {
        colCount.value = 3
    } else if (1180 < gamesContainerWidth.value <= 1480) {
        colCount.value = 4
    } else {
        colCount.value = 5
    }
}

const gridRender = () => {
    currentlyDisplayedGames.value.forEach((game) => {
        if (colCount.value === 2) {
            //
        }
    })
}

const handleGrid = () => {
    getWrapperWidth()
    gridColCount()
}

onMounted(() => {
    window.addEventListener('resize', handleGrid)
})
</script>

<template>
    <div class="games-wrapper">
        <div v-if="isDesktopView">
            <div class="desktop-view-grid" v-if="isGridActive">
                <PreviewTileGrid
                    v-for="game in currentlyDisplayedGames"
                    :key="game.id"
                    :game="game"
                />
            </div>
            <div class="desktop-view-col" v-else>
                <PreviewTileSingleCol
                    v-for="game in currentlyDisplayedGames"
                    :key="game.id"
                    :game="game"
                />
            </div>
        </div>
        <div class="mobile-view" v-else>
            <PreviewTileMobile
                v-for="game in currentlyDisplayedGames"
                :key="game.id"
                :game="game"
            />
        </div>
        <PreviewLoadBtn :pending="pending" />
    </div>
</template>

<style lang="scss" scoped>
.games-wrapper {
    display: grid;
}
.mobile-view {
    display: grid;
    gap: 1.5rem;
}

.desktop-view-col {
    display: grid;
    gap: 2.5rem;
}

.desktop-view-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(28rem, 100%), 1fr));
    gap: 2rem;
}
</style>
