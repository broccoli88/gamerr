<script setup>
import TheSearchBar from '../components/TheSearchBar.vue'
import TheSideBar from '../components/TheSideBar.vue'
import TheHeader from '../components/TheHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
    <header>
        <TheSearchBar />
    </header>
    <main>
        <TheSideBar />
        <section class="main-section">
            <TheHeader />
            <RouterView />
        </section>
    </main>
</template>

<style lang="scss" scoped>
main {
    @include breakpoint {
        display: grid;
        grid-template-columns: auto 1fr;
    }
}

.main-section {
    padding: 1rem;
}
</style>
