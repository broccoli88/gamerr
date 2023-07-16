<script setup>
import sidebarData from '../../data/sidebar.json'
import SidebarMobileMenuEl from './SidebarMobileMenuEl.vue'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const generalStore = useGeneralStore()
const { isSidebarMobileMenuOpen } = storeToRefs(generalStore)

const allGames = ref(sidebarData.allGames)
const browse = ref(sidebarData.browse)
const genres = ref(sidebarData.genres)
const home = ref(sidebarData.home)
const newReleases = ref(sidebarData.newReleases)
const platforms = ref(sidebarData.platforms)
const reviews = ref(sidebarData.reviews)
const top = ref(sidebarData.top)

const moveGenresList = ref(false)
const switchCol = () => {
    moveGenresList.value = !moveGenresList.value
}

const closeMenu = () => {
    isSidebarMobileMenuOpen.value = false
}
</script>

<template>
    <section class="sidebar-mobile-menu">
        <nav class="mobile-menu__nav">
            <div class="mobile-menu__col">
                <router-link :to="home.link" class="sidebar__col-link">{{
                    home.title
                }}</router-link>
                <SidebarMobileMenuEl :data="newReleases" />
                <router-link :to="allGames.link" class="sidebar__col-link">{{
                    allGames.title
                }}</router-link>
                <SidebarMobileMenuEl :data="platforms" />
                <SidebarMobileMenuEl :data="genres" v-if="moveGenresList" />
            </div>
            <div class="mobile-menu__col">
                <router-link :to="reviews.link" class="sidebar__col-link">{{
                    reviews.title
                }}</router-link>
                <SidebarMobileMenuEl :data="top" />
                <SidebarMobileMenuEl :data="browse" @switch-col="switchCol" />
                <SidebarMobileMenuEl :data="genres" v-if="!moveGenresList" />
            </div>

            <div class="sidebar__close-btn" @click="closeMenu">
                <Icon
                    class="sidebar-close-icon"
                    icon="line-md:menu-to-close-transition"
                    color="black"
                />
            </div>
        </nav>
    </section>
</template>

<style lang="scss" scoped>
.mobile-menu__nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
    min-height: 100vh;
    padding: 2rem;
}

.sidebar-mobile-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: max-content;
    z-index: 99;
    background-color: black;
    font-size: 1.4rem;
    font-family: $ff-text;
}

.mobile-menu__col {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.sidebar__col-link {
    font-size: 1.8rem;
    color: $color-text;
    font-weight: 600;

    display: flex;
}

.sidebar__close-btn {
    padding: 1rem;
    background-color: white;
    border-radius: 50%;

    position: fixed;
    bottom: 2rem;
    right: 2rem;

    cursor: pointer;

    display: grid;
    place-content: center;

    .sidebar-close-icon {
        font-size: 1.7em;
    }
}
</style>
