<script setup>
import SidebarMobileMenuWindow from './components/sidebar/SidebarMobileMenuWindow.vue'
import PreviewRateGameWindowMobile from './components/preview/PreviewRateGameWindowMobile.vue'
import { RouterView } from 'vue-router'
import { useGeneralStore } from './stores/useGeneralStore'
import { storeToRefs } from 'pinia'

const generalStore = useGeneralStore()
const { isSidebarMobileMenuOpen, isRateGameMobileWindowOpen, isDesktopView } =
    storeToRefs(generalStore)
</script>
<template>
    <div>
        <RouterView />
    </div>

    <Teleport to="body">
        <SidebarMobileMenuWindow v-if="isSidebarMobileMenuOpen" />
        <PreviewRateGameWindowMobile v-if="isRateGameMobileWindowOpen && !isDesktopView" />
    </Teleport>
</template>

<style lang="scss" scoped></style>
