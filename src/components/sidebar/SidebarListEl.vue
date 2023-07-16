<script setup>
import SidebarIconMedium from './SidebarIconMedium.vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

const props = defineProps(['data'])

const isListToggled = ref(false)
const toggleIcon = computed(() => (isListToggled.value ? 'bi:chevron-up' : 'bi:chevron-down'))

const shortList = computed(() =>
    props.data.types.length > 4 && !isListToggled.value
        ? props.data.types.slice(0, 3)
        : props.data.types
)

const toggleSubList = () => {
    isListToggled.value = !isListToggled.value
}

const toggleButtonText = computed(() => (isListToggled.value ? 'Hide' : 'Show all'))
</script>

<template>
    <div class="section-sidebar">
        <router-link class="sidebar__title" to="#">{{ data.title }}</router-link>
        <ul class="sidebar__list" v-if="data.types">
            <li class="sidebar__item" v-for="subType in shortList" :key="subType.title">
                <router-link :to="subType.link" class="sidebar__link">
                    <SidebarIconMedium :icon="subType" />
                    <p>{{ subType.title }}</p></router-link
                >
            </li>
        </ul>
        <div class="icon-wrapper" v-if="data.types && data.types.length > 4" @click="toggleSubList">
            <div class="icon-toggle">
                <Icon :icon="toggleIcon" />
            </div>
            <p>{{ toggleButtonText }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar__title {
    color: $color-text;
    font-size: 2.4rem;
    font-weight: 700;
    display: inline-block;
    transition: 0.2s all ease-in;

    &:hover {
        color: $color-gray-light-40;
    }
}

.sidebar__list {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin-top: 1.5rem;
}

.sidebar__item {
    display: flex;
}

.sidebar__link {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;

    color: $color-text;

    transition: 0.1s all;

    &:hover {
        .icon-container {
            color: black;
            background-color: white;
        }
    }
}

.icon-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.9rem;
    cursor: pointer;

    p {
        color: $color-gray-light-40;
    }

    &:hover {
        .icon-toggle {
            background-color: white;
            color: black;
        }
    }
}

.icon-toggle {
    width: 1.8em;
    aspect-ratio: 1;
    background-color: $color-gray-dark-15;
    display: grid;
    place-content: center;
    border-radius: 6px;
    opacity: 0.5;
    transition: 0.2s all ease-in;
}
</style>
