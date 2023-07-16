<script setup>
import sidebarData from '../../data/sidebar.json'
import SidebarListEl from './SidebarListEl.vue'
</script>

<template>
    <div class="disebar-desktop-container">
        <SidebarListEl v-for="section in sidebarData" :key="section.title" :data="section" />
    </div>
</template>

<style lang="scss" scoped>
.disebar-desktop-container {
    padding: 5rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>
