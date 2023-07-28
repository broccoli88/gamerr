<script setup>
import SidebarMobileMenuWindow from './components/sidebar/SidebarMobileMenuWindow.vue'
import PreviewRateGameWindowMobile from './components/preview/PreviewRateGameWindowMobile.vue'
import { RouterView, useRoute } from 'vue-router'
import { useGeneralStore } from './stores/useGeneralStore'
import { useGameDetailsStore } from './stores/useGameDetailsStore'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'

const generalStore = useGeneralStore()
const { isSidebarMobileMenuOpen, isRateGameMobileWindowOpen, isDesktopView, isGameDetailsOn } =
    storeToRefs(generalStore)

const gameDetailsStore = useGameDetailsStore()
const { gameBackgroundImage } = storeToRefs(gameDetailsStore)

const route = useRoute()

watch(
    () => route.fullPath,
    () => {
        if (route.fullPath.includes('/games/')) {
            isGameDetailsOn.value = true
        }

        if (!route.fullPath.includes('/games/')) {
            isGameDetailsOn.value = false
        }
    }
)
</script>
<template>
    <div :class="{ 'game-details-container': isGameDetailsOn }">
        <RouterView />
    </div>

    <Teleport to="body">
        <SidebarMobileMenuWindow v-if="isSidebarMobileMenuOpen" />
        <PreviewRateGameWindowMobile v-if="isRateGameMobileWindowOpen && !isDesktopView" />
    </Teleport>
</template>

<style lang="scss" scoped>
.game-details-container {
    position: relative;
    isolation: isolate;
}

.game-details-container::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    z-index: -1;
    background-image: linear-gradient(hsl(0, 0%, 15%, 0.9), hsl(0, 0%, 9%, 0.7), hsl(0, 0%, 8%));
}

.game-details-container::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    background-image: v-bind('gameBackgroundImage');
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -2;
    // opacity: 0.3;
}
</style>
