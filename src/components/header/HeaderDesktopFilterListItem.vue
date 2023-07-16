<script setup>
import HeaderDesktopFilterSubList from './HeaderDesktopFilterSubList.vue'
import { useHeaderStore } from '../../stores/useHeaderStore'
import { ref } from 'vue'

const props = defineProps(['filter'])

const headerStore = useHeaderStore()

const isSubListOpen = ref(false)

const showSubFilterList = () => {
    isSubListOpen.value = true
}

const hideSubFilterList = () => {
    isSubListOpen.value = false
}

const selectPlatformFilter = (selectedFilter) => {
    headerStore.selectFilter(selectedFilter)
}
</script>

<template>
    <li
        class="filtering__item"
        @mouseover="showSubFilterList"
        @mouseleave="hideSubFilterList"
        @click="selectPlatformFilter(filter)"
    >
        <p>
            {{ props.filter.name }}
            <Icon class="select-icon" icon="charm:tick" :class="{ selected: filter.selected }" />
        </p>
        <Icon icon="bi:chevron-right" class="filtering__next-menu-icon" v-if="filter.type" />

        <div v-if="isSubListOpen && filter.type" class="filtering__desktop-sub-list">
            <HeaderDesktopFilterSubList :filters="filter">
                <template v-slot:list-title>
                    {{ filter.name }}
                </template>
            </HeaderDesktopFilterSubList>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.filtering__item {
    cursor: pointer;
    padding: 0.5rem 2rem;
    border-radius: 4px;
    position: relative;
    transition: 0.2s all ease-in;

    &:hover,
    &:focus {
        background-color: $color-gray-light-90;
    }

    @include breakpoint {
        padding-inline: 1rem;
    }

    p {
        display: inline-block;
        margin-right: 0.5rem;
        position: relative;

        .select-icon {
            opacity: 0;
            margin-bottom: 0.3rem;

            position: absolute;
            left: 105%;
            top: 50%;

            transform: translateY(-50%);
            transition: opacity 0.2s ease-in;

            font-size: 1.2em;
            color: limegreen;
        }
        .selected {
            opacity: 1;
        }
    }

    .filtering__next-menu-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: $color-gray-light-40;
    }

    .filtering__desktop-sub-list {
        position: absolute;
        right: 0;
        top: -1rem;
        width: 100%;
    }
}
</style>
