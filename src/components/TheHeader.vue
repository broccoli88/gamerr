<script setup>
import HeaderFilterBar from './header/HeaderFilterBar.vue'
import HeaderMobileFilterList from './header/HeaderMobileFilterList.vue'
import HeaderDesktopFilterList from './header/HeaderDesktopFilterList.vue'
import { useHeaderStore } from '../stores/useHeaderStore'
import { useGeneralStore } from '../stores/useGeneralStore'
import { storeToRefs } from 'pinia'
import { useFetchGames } from '../modules/useFetchGames'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const generalStore = useGeneralStore()
const { isDesktopView, isGridActive, page, filteredGames, isFilter } = storeToRefs(generalStore)
const headerStore = useHeaderStore()
const {
    orderBy,
    platforms,
    selectedPlatformFilter,
    currentPlatformTypeFilter,
    currentPlatformTypeParent,
    currentPlatformFilters,
    isPlatformFilterSubListOpen,
    isPlatformFilterListOpen
} = storeToRefs(headerStore)

//...::: [ Order by filtering ] :::...

const orderByFilter = ref('')
const isOrderByFilterListOpen = ref(false)

const filterOption = computed(() => {
    switch (orderByFilter.value.toLowerCase()) {
        case 'relevance':
            return 'ordering=-updated'
        case 'date added':
            return 'ordering=-added'
        case 'name':
            return 'ordering=-name'
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

const openOrderByFilterList = () => {
    const orderByHeaderFiltering = document.querySelector('.orderby-header-filtering')

    headerStore.checkFilterListPosition(orderByHeaderFiltering)
    isOrderByFilterListOpen.value = !isOrderByFilterListOpen.value
}

const closeOrderByFilterList = () => {
    isOrderByFilterListOpen.value = false
}

const selectOrderByFilter = async (filter) => {
    orderByFilter.value = null
    isFilter.value = true
    filteredGames.value = []
    page.value = 1

    orderByFilter.value = filter.name
    filter.selected = true

    orderBy.value.forEach((orderType) => {
        if (orderType.name !== filter.name) {
            orderType.selected = false
        }
    })

    const includedPlatforms = ref(`parent_platforms=1`)
    const query = ref(`${filterOption.value}&page=${page.value}&${includedPlatforms.value}`)
    const data = await useFetchGames(query.value)

    data.results.forEach((game) => {
        filteredGames.value.push(game)
    })

    setTimeout(() => {
        closeOrderByFilterList()
    }, 300)
}

//  ...::: [ Filtering by platform ] :::...

// Clear selection

const showClearBtn = computed(() => (selectedPlatformFilter.value ? 1 : 0))

const clearAllPlatformFilterSelections = () => {
    selectedPlatformFilter.value = null
    platforms.value.forEach((platform) => {
        platform.selected = false

        if (platform.type) {
            platform.type.forEach((type) => {
                type.selected = false
            })
        }
    })
}

// Sub list buttons
const backToPlatformsFilteringList = () => {
    currentPlatformTypeFilter.value = null
    setTimeout(() => {
        isPlatformFilterSubListOpen.value = false
    }, 0)
}

const openPlatformFilterList = () => {
    const platformHeaderFiltering = document.querySelector('.platform-header-filtering')

    headerStore.checkFilterListPosition(platformHeaderFiltering)
    isPlatformFilterListOpen.value = !isPlatformFilterListOpen.value
}

const selectPlatformFilter = (filter) => {
    // Selecting platform without additional types

    if (!filter.type && !isPlatformFilterSubListOpen.value) {
        headerStore.clearPlatformSelection(filter)
        filter.selected = true
        selectedPlatformFilter.value = filter.name

        setTimeout(() => {
            headerStore.closePlatformFilterList()
        }, 300)
    }

    // Selecting platform with additional types

    if (filter.type) {
        currentPlatformTypeFilter.value = filter.type
        currentPlatformTypeParent.value = filter
        setTimeout(() => {
            isPlatformFilterSubListOpen.value = true
        }, 0)
    }
    if (!filter.type && isPlatformFilterSubListOpen.value && currentPlatformTypeFilter.value) {
        headerStore.clearPlatformSelection(currentPlatformTypeParent.value)
        headerStore.clearPlatformTypeSelection(filter)

        selectedPlatformFilter.value = filter.name
        filter.selected = true

        platforms.value.forEach((platform) => {
            if (platform.name === currentPlatformTypeParent.value.name) {
                platform.selected = true
            }
        })

        setTimeout(() => {
            headerStore.closePlatformFilterList()
        }, 300)
    }
}

const selectAllTypes = () => {
    currentPlatformTypeParent.value.selected = true
    selectedPlatformFilter.value = currentPlatformTypeParent.value.name

    setTimeout(() => {
        headerStore.closePlatformFilterList()
    }, 300)
}

// ...::: [ Global hooks ] :::...

const handleOrdereByFilterListWindowClick = (e) => {
    const target = e.target
    const listContainer = document.querySelector(
        '.filtering__list-container.order-by .filtering__list-wrapper'
    )
    const filteringElement = document.querySelectorAll('.header__filtering')

    if (
        listContainer &&
        filteringElement[0] &&
        !listContainer.contains(target) &&
        !filteringElement[0].contains(target)
    ) {
        closeOrderByFilterList()
    }
}
const handlePlatformFilterListWindowClick = (e) => {
    e.stopPropagation()
    const target = e.target
    const listContainer = document.querySelector(
        '.filtering__list-container.platforms .filtering__list-wrapper'
    )
    const filteringElement = document.querySelectorAll('.header__filtering')

    if (
        listContainer &&
        filteringElement[1] &&
        !listContainer.contains(target) &&
        !filteringElement[1].contains(target)
    ) {
        // Solve closing problem
        headerStore.closePlatformFilterList()
    }
}

onMounted(() => {
    window.addEventListener('click', handleOrdereByFilterListWindowClick)
    window.addEventListener('click', handlePlatformFilterListWindowClick)
})

onUnmounted(() => {
    window.removeEventListener('click', handleOrdereByFilterListWindowClick)
    window.removeEventListener('click', handlePlatformFilterListWindowClick)
})

// Grid Layout

const activateCol = () => {
    isGridActive.value = false
}

const activateGrid = () => {
    isGridActive.value = true
}
</script>

<template>
    <section class="header">
        <header class="header__heading">
            <h1>New and trending</h1>
            <p>Based on player counts and release date</p>
        </header>
        <section class="header__filters">
            <div class="header__filter-bar-container">
                <div>
                    <HeaderFilterBar
                        class="orderby-header-filtering"
                        @click="openOrderByFilterList"
                    >
                        <template v-slot:order-type>Order by: </template>
                        <template v-slot:filtering-option
                            >{{ orderByFilter || 'Relevance' }}
                        </template>
                    </HeaderFilterBar>
                    <HeaderMobileFilterList
                        class="order-by"
                        v-if="isOrderByFilterListOpen"
                        :filters="orderBy"
                        @select-filter="selectOrderByFilter"
                    >
                        <template v-slot:list-title> Order by:</template>
                    </HeaderMobileFilterList>
                </div>
                <div>
                    <HeaderFilterBar
                        @click="openPlatformFilterList"
                        class="platform-header-filtering"
                    >
                        <template v-slot:filtering-option>
                            {{ selectedPlatformFilter || 'Platforms' }}</template
                        >
                    </HeaderFilterBar>
                    <div v-if="isDesktopView">
                        <HeaderDesktopFilterList
                            v-if="isPlatformFilterListOpen"
                            class="platforms"
                            :filters="platforms"
                        >
                            <template v-slot:list-title> Platforms</template>
                            <template v-slot:clear-btn>
                                <button
                                    class="filtering__clear-btn"
                                    @click="clearAllPlatformFilterSelections"
                                    v-if="showClearBtn && !isPlatformFilterSubListOpen"
                                >
                                    Clear
                                </button>
                            </template>
                        </HeaderDesktopFilterList>
                        <div class="grid-layout"></div>
                    </div>
                    <div v-else>
                        <HeaderMobileFilterList
                            v-if="isPlatformFilterListOpen"
                            class="platforms"
                            :filters="currentPlatformFilters"
                            @select-filter="selectPlatformFilter"
                        >
                            <template v-slot:list-title> Platforms</template>
                            <template v-slot:clear-btn>
                                <button
                                    class="filtering__clear-btn"
                                    @click="clearAllPlatformFilterSelections"
                                    v-if="showClearBtn && !isPlatformFilterSubListOpen"
                                >
                                    Clear
                                </button>
                            </template>
                            <template v-slot:sub-buttons>
                                <div class="sub-buttons" v-if="isPlatformFilterSubListOpen">
                                    <button @click="selectAllTypes">Select All</button>
                                    <button @click="backToPlatformsFilteringList">Back</button>
                                </div>
                            </template>
                        </HeaderMobileFilterList>
                    </div>
                </div>
            </div>
            <div class="grid-layout-icons">
                <p>Display options:</p>

                <div
                    @click="activateGrid"
                    class="icon-container"
                    :class="{ 'selected-grid': isGridActive }"
                >
                    <Icon class="icon" icon="circum:grid-4-2" />
                </div>
                <div
                    @click="activateCol"
                    class="icon-container"
                    :class="{ 'selected-grid': !isGridActive }"
                >
                    <Icon class="icon" icon="fluent:column-20-regular" />
                </div>
            </div>
        </section>
    </section>
</template>

<style lang="scss" scoped>
.header {
    font-weight: 300;
    font-size: 1.5rem;

    @include container;

    .header__heading {
        text-align: center;

        @include breakpoint {
            text-align: left;
        }
    }

    .header__filters {
        display: flex;
        overflow: scroll;
        margin-top: 2rem;
        padding-block: 2rem;
        justify-content: space-between;

        .header__filter-bar-container {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .grid-layout-icons {
            display: none;
            @include breakpoint {
                display: flex;
                gap: 1rem;
                align-items: center;
                margin-right: 4rem;
            }

            .selected-grid {
                opacity: 1;
            }
        }

        .icon-container {
            height: 3em;
            padding-inline: 0.5rem;
            background-color: $color-gray-light-30;
            border-radius: 6px;
            display: grid;
            place-content: center;
            cursor: pointer;
            opacity: 0.4;
            transition: 0.2s all ease-in;

            .icon {
                font-size: 2.5em;
            }
        }
    }

    .filtering__clear-btn {
        border: none;
        background-color: transparent;
        padding: 0.2em 2rem;
        margin-bottom: 0.7rem;

        border-radius: 4px;
        color: red;
        font-size: 1.4rem;
        font-weight: 300;
        font-family: $ff-text;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        cursor: pointer;
        position: relative;

        &::before {
            content: '';
            background-color: $color-gray-light-80;

            position: absolute;
            bottom: -0.7rem;
            left: 0;
            width: 100%;
            height: 1px;
        }

        @include breakpoint {
            font-size: 1.2rem;
            padding-inline: 1rem;
            justify-content: flex-start;
        }
    }

    .sub-buttons {
        display: flex;
        flex-direction: column;

        button {
            background: transparent;
            border: none;

            border-radius: 4px;
            font-family: $ff-text;
            font-size: 1.4rem;
            padding: 1.3rem;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease-in;

            &:hover,
            &:focus {
                background-color: $color-gray-light-90;
            }

            &:first-of-type {
                color: green;
                margin-top: 0.7rem;
            }

            &::before {
                content: '';
                background-color: $color-gray-light-80;

                position: absolute;
                left: 50%;
                top: 0;
                width: 95%;
                height: 1px;

                transform: translateX(-50%);
            }

            @include breakpoint {
                font-size: 1.2rem;
            }
        }
    }
}
</style>
