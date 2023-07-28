<script setup>
import PreviewLoadBtn from '../../components/preview/PreviewLoadBtn.vue'
import PreviewTileGrid from '../../components/preview/PreviewTileGrid.vue'
import PreviewTileSingleCol from '../../components/preview/PreviewTileSingleCol.vue'
import PreviewTileMobile from '../../components/preview/PreviewTileMobile.vue'
import { useFetchGames } from '../../modules/useFetchGames'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { useHeaderStore } from '../../stores/useHeaderStore'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const generalStore = useGeneralStore()
const { isDesktopView, isGridActive } = storeToRefs(generalStore)

const headerStore = useHeaderStore()
const {
    allGames,
    filteredGames,
    page,
    isFilter,
    currentlyDisplayedGames,
    currentPlatformQuery,
    pending
} = storeToRefs(headerStore)

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

// Rendering grid
const gamesContainerWidth = ref()
const colCount = ref(null)
const addGameCount = ref(1)

const gridGameLists = ref({
    gamesListCol1: [],
    gamesListCol2: [],
    gamesListCol3: [],
    gamesListCol4: [],
    gamesListCol5: []
})

const getWrapperWidth = () => {
    if (isDesktopView.value && isGridActive) {
        const gamesWrapper = document.querySelector('.games-wrapper')
        if (gamesWrapper) {
            gamesContainerWidth.value = gamesWrapper.clientWidth
        }
    }
}

const gridColCount = () => {
    if (gamesContainerWidth.value > 1380) {
        colCount.value = 5
    } else if (1100 < gamesContainerWidth.value && gamesContainerWidth.value <= 1380) {
        colCount.value = 4
    } else if (820 < gamesContainerWidth.value && gamesContainerWidth.value <= 1100) {
        colCount.value = 3
    } else if (820 >= gamesContainerWidth.value) {
        colCount.value = 2
    }
}

const clearGridLists = () => {
    addGameCount.value = 1
    gridGameLists.value.gamesListCol1 = []
    gridGameLists.value.gamesListCol2 = []
    gridGameLists.value.gamesListCol3 = []
    gridGameLists.value.gamesListCol4 = []
    gridGameLists.value.gamesListCol5 = []
}

const gridRender = () => {
    currentlyDisplayedGames.value.forEach((game) => {
        if (colCount.value === 2) {
            if (addGameCount.value === 1) {
                gridGameLists.value.gamesListCol1.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 2) {
                gridGameLists.value.gamesListCol2.push(game)
                addGameCount.value = 1
            }
        }

        if (colCount.value === 3) {
            if (addGameCount.value === 1) {
                gridGameLists.value.gamesListCol1.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 2) {
                gridGameLists.value.gamesListCol2.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 3) {
                gridGameLists.value.gamesListCol3.push(game)
                addGameCount.value = 1
            }
        }

        if (colCount.value === 4) {
            if (addGameCount.value === 1) {
                gridGameLists.value.gamesListCol1.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 2) {
                gridGameLists.value.gamesListCol2.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 3) {
                gridGameLists.value.gamesListCol3.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 4) {
                gridGameLists.value.gamesListCol4.push(game)
                addGameCount.value = 1
            }
        }

        if (colCount.value > 4) {
            if (addGameCount.value === 1) {
                gridGameLists.value.gamesListCol1.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 2) {
                gridGameLists.value.gamesListCol2.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 3) {
                gridGameLists.value.gamesListCol3.push(game)
                addGameCount.value++
            } else if (addGameCount.value === 4) {
                gridGameLists.value.gamesListCol4.push(game)
                addGameCount.value++
            } else if (addGameCount.value > 4) {
                gridGameLists.value.gamesListCol5.push(game)
                addGameCount.value = 1
            }
        }
    })
}

const handleGrid = () => {
    clearGridLists()
    gridRender()
}

watch(gamesContainerWidth, () => {
    gridColCount()
})

watch(colCount, () => {
    handleGrid()
})

watch(pending, () => {
    handleGrid()
})

let loadBtnObserver

onMounted(async () => {
    window.addEventListener('resize', () => {
        getWrapperWidth()
    })

    await fetchAllGames()
    getWrapperWidth()
    gridColCount()

    const loadBtn = document.querySelector('.load-btn')
    loadBtnObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && allGames.value.length > 0 && !isFilter.value) {
                    page.value++
                    fetchAllGames()
                    if (isGridActive) {
                        handleGrid()
                    }
                }

                if (entry.isIntersecting && filteredGames.value.length > 0 && isFilter.value) {
                    page.value++
                    headerStore.fetchGamesByFilter(currentPlatformQuery.value)
                    if (isGridActive) {
                        handleGrid()
                    }
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

onUnmounted(() => {
    if (loadBtnObserver) {
        loadBtnObserver.disconnect()
    }
})
</script>

<template>
    <div class="games-wrapper">
        <div v-if="isDesktopView">
            <div class="desktop-view-grid" v-if="isGridActive">
                <div>
                    <PreviewTileGrid
                        v-for="game in gridGameLists.gamesListCol1"
                        :key="game.id"
                        :game="game"
                    />
                </div>
                <div>
                    <PreviewTileGrid
                        v-for="game in gridGameLists.gamesListCol2"
                        :key="game.id"
                        :game="game"
                    />
                </div>
                <div v-if="colCount > 2">
                    <PreviewTileGrid
                        v-for="game in gridGameLists.gamesListCol3"
                        :key="game.id"
                        :game="game"
                    />
                </div>
                <div v-if="colCount > 3">
                    <PreviewTileGrid
                        v-for="game in gridGameLists.gamesListCol4"
                        :key="game.id"
                        :game="game"
                    />
                </div>
                <div v-if="colCount > 4">
                    <PreviewTileGrid
                        v-for="game in gridGameLists.gamesListCol5"
                        :key="game.id"
                        :game="game"
                    />
                </div>
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
    padding: 1rem;
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
    grid-template-columns: repeat(auto-fit, minmax(min(26rem, 100%), 1fr));
    gap: 2rem;
}
</style>
