<script setup>
import { useHeaderStore } from '../../stores/useHeaderStore'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { useFetchPlatforms } from '../../modules/useFetchPlatforms'
import { useFetchGames } from '../../modules/useFetchGames'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const props = defineProps(['filters'])

const headerStore = useHeaderStore()
const generalStore = useGeneralStore()
const { filteredGames, isFilter } = storeToRefs(generalStore)

const selectPlatformTypeFilter = async (selectedFilter) => {
    filteredGames.value = []
    isFilter.value = true

    headerStore.clearPlatformTypeSelection(selectedFilter)
    headerStore.selectFilter(selectedFilter)
}
</script>
<template>
    <div>
        <nav class="filtering__list-container">
            <div class="filtering__list-wrapper">
                <p class="filtering__title">
                    <slot name="list-title" />
                </p>
                <slot name="clear-btn"></slot>
                <ul class="filtering__list">
                    <li
                        @click="selectPlatformTypeFilter(filter)"
                        class="filtering__item"
                        v-for="filter in props.filters.type"
                        :key="filter.name"
                    >
                        <p>
                            {{ filter.name }}
                            <Icon
                                icon="charm:tick"
                                class="icon"
                                size="1.2em"
                                :class="{ selected: filter.selected }"
                            />
                        </p>
                    </li>
                </ul>
                <button class="sub-button" @click="selectAllTypes">Select All</button>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
.filtering__list-container {
    position: absolute;
    top: -3rem;
    right: -100%;
    width: 100%;

    z-index: 9;

    padding: 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}

.filtering__list-wrapper {
    color: $color-text-dark;
    font-weight: 400;

    text-transform: capitalize;

    border-radius: 4px;

    background: white;

    width: 100%;
    font-size: 1.2rem;
    text-align: left;
    padding: 1.5rem;

    .filtering__title {
        color: $color-gray-light-60;
        margin-bottom: 0.7rem;

        padding-inline: 1rem;

        font-size: 1.4rem;
    }
}

.filtering__list {
    display: flex;
    flex-direction: column;
    position: relative;
}

.filtering__item {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    position: relative;
    transition: 0.2s all ease-in;

    &:hover,
    &:focus {
        background-color: $color-gray-light-90;
    }
}

p {
    display: inline-block;
    margin-right: 0.5rem;
    position: relative;
    .icon {
        opacity: 0;
        color: limegreen;
        margin-bottom: 0.3rem;

        position: absolute;
        left: 105%;
        top: 50%;

        transform: translateY(-50%);
        transition: opacity 0.2s ease-in;
    }
    .selected {
        opacity: 1;
    }
}

.sub-button {
    background: transparent;
    border: none;
    width: 100%;

    border-radius: 4px;
    font-family: $ff-text;
    font-size: 1.2rem;
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
}
</style>
