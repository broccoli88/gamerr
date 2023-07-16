<script setup>
const props = defineProps(['filter'])
const emits = defineEmits(['select-filter'])

const emitSelectFilter = (filter) => {
    emits('select-filter', filter)
}
</script>

<template>
    <li class="filtering__item" @click="emitSelectFilter(filter)">
        <p>
            {{ props.filter.name }}
            <Icon class="select-icon" icon="charm:tick" :class="{ selected: filter.selected }" />
        </p>
        <Icon icon="bi:chevron-right" class="filtering__next-menu-icon" v-if="filter.type" />
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
            color: limegreen;
            font-size: 1.2em;
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

    .filtering__next-menu-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: $color-gray-light-40;
    }

    .filtering__desktop-sub-list {
        position: absolute;
        right: -100%;
        top: -1rem;
        width: 100%;
    }
}
</style>
