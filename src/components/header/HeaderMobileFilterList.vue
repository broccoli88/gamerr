<script setup>
import HeaderMobileFiltersListItem from './HeaderMobileFilterListItem.vue'
import { useHeaderStore } from '../../stores/useHeaderStore'
import { storeToRefs } from 'pinia'

const props = defineProps(['filters'])
const emits = defineEmits(['select-filter'])

const headerStore = useHeaderStore()
const { positionX, positionY, width } = storeToRefs(headerStore)

const emitSelectFilter = (filter) => {
    emits('select-filter', filter)
}
</script>

<template>
    <nav class="filtering__list-container">
        <div class="filtering__list-wrapper">
            <p class="filtering__title">
                <slot name="list-title" />
            </p>
            <slot name="clear-btn"></slot>
            <ul class="filtering__list">
                <HeaderMobileFiltersListItem
                    @select-filter="emitSelectFilter"
                    v-for="filter in props.filters"
                    :key="filter.name"
                    :filter="filter"
                />
            </ul>

            <slot name="sub-buttons"></slot>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.filtering__list-container {
    position: fixed;
    inset: 0;
    z-index: 9;
    background-color: $color-black-09;
    padding: 1rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    @include breakpoint {
        inset: initial;
        top: v-bind(positionY);
        left: v-bind(positionX);
        width: v-bind(width);

        padding: 0;
        background-color: transparent;
        align-items: initial;
        justify-content: initial;
    }
}

.filtering__list-wrapper {
    color: $color-text-dark;
    font-weight: 400;
    font-size: 1.4rem;
    text-transform: capitalize;
    text-align: center;

    padding: 2.5rem;
    border-radius: 4px;

    background: white;

    @include breakpoint {
        width: 100%;
        font-size: 1.2rem;
        text-align: left;
        padding: 1.5rem;
    }

    .filtering__title {
        color: $color-gray-light-60;
        margin-bottom: 0.7rem;
        font-size: 1.6rem;
        padding-inline: 1rem;

        @include breakpoint {
            font-size: 1.4rem;
        }
    }
}

.filtering__list {
    display: flex;
    flex-direction: column;
    position: relative;
}
</style>
