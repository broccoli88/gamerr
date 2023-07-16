<script setup>
import sidebarData from '../../data/sidebar.json'
import SidebarIconSmall from './SidebarIconSmall.vue'
import { Icon } from '@iconify/vue'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { storeToRefs } from 'pinia'

const generalStore = useGeneralStore()
const { isSidebarMobileMenuOpen } = storeToRefs(generalStore)

const openSidebarMobileMenu = () => {
    isSidebarMobileMenuOpen.value = true
}
</script>

<template>
    <nav class="nav-mobile-sidebar">
        <p class="mobile-sidebar__heading">New and trending</p>
        <ul class="mobile-sidebar__list">
            <li class="mobile-sidebar__item" v-for="section in sidebarData" :key="section.title">
                <div class="mobile-sidebar__link-wrapper" v-if="section.types">
                    <router-link
                        :to="subType.link"
                        class="mobile-sidebar__link"
                        v-for="subType in section.types"
                        :key="subType.title"
                    >
                        <SidebarIconSmall :icon="subType" />
                        <p>{{ subType.title }}</p>
                    </router-link>
                </div>
            </li>
        </ul>
        <div class="mobile-sidebar_menu-btn" @click="openSidebarMobileMenu">
            <Icon class="icon" icon="lucide:menu" />
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.nav-mobile-sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9;

    padding-inline: 1rem 0;

    display: flex;
    background-color: black;
    font-size: 1.4rem;
}

.mobile-sidebar__heading {
    font-weight: 600;
    white-space: nowrap;
    align-self: center;
    padding-block: 2.2rem 4rem;
    margin-right: 1.5rem;
}

.mobile-sidebar__list {
    display: flex;
    align-items: center;
    overflow: scroll;
    padding-block: 2.2rem 4rem;
}

.mobile-sidebar__link-wrapper {
    display: flex;
    gap: 1.5rem;
    white-space: nowrap;
}

.mobile-sidebar__link {
    display: flex;
    gap: 0.5rem;
    color: $color-text;
}

.mobile-sidebar_menu-btn {
    display: flex;
    border-left: 1px solid $color-gray-medium;
    align-items: center;
    cursor: pointer;
    padding-block: 2.2rem 4rem;
    padding-inline: 0.6rem;

    .icon {
        font-size: 1.7em;
    }
}
</style>
