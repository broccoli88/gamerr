<script setup>
import SidebarMobileMenuWindow from './components/sidebar/SidebarMobileMenuWindow.vue'
import PreviewRateGameWindow from './components/preview/PreviewRateGameWindow.vue'
import { RouterView } from 'vue-router'
import { useGeneralStore } from './stores/useGeneralStore'
import { storeToRefs } from 'pinia'

const generalStore = useGeneralStore()
const { isSidebarMobileMenuOpen, isRateGameWindowOpen, isDesktopView } = storeToRefs(generalStore)
</script>
<template>
    <div>
        <RouterView />
    </div>

    <Teleport to="body">
        <SidebarMobileMenuWindow v-if="isSidebarMobileMenuOpen" />
        <PreviewRateGameWindow v-if="isRateGameWindowOpen && !isDesktopView" />
    </Teleport>
</template>

<style lang="scss" scoped></style>
