<script setup>
import SidebarDesktopList from './sidebar/SidebarDesktopList.vue'
import SidebarMobileList from './sidebar/SidebarMobileList.vue'
import { useGeneralStore } from '../stores/useGeneralStore'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'

const generalStore = useGeneralStore()
const { isDesktopView } = storeToRefs(generalStore)

onMounted(() => {
    generalStore.checkWindowWidth()
    window.addEventListener('resize', generalStore.checkWindowWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', generalStore.checkWindowWidth)
})
</script>
<template>
    <aside>
        <SidebarDesktopList v-if="isDesktopView" />
        <SidebarMobileList v-else />
    </aside>
</template>

<style lang="scss" scoped></style>
