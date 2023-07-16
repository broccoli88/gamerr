<script setup>
import SidebarMobileMenuWindow from './components/sidebar/SidebarMobileMenuWindow.vue'
import { RouterView } from 'vue-router'
import { useGeneralStore } from './stores/useGeneralStore'

const generalStore = useGeneralStore()
</script>
<template>
    <div>
        <RouterView />
    </div>

    <Teleport to="body">
        <SidebarMobileMenuWindow v-if="generalStore.isSidebarMobileMenuOpen" />
    </Teleport>
</template>

<style lang="scss" scoped></style>
