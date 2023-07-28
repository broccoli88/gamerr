<script setup>
import TheSearchBar from '../components/TheSearchBar.vue'
import TheSideBar from '../components/TheSideBar.vue'
import TheHeader from '../components/TheHeader.vue'
import { useGeneralStore } from '../stores/useGeneralStore'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

const generalStore = useGeneralStore()
const { isDesktopView, isGameDetailsOn, isHeader, isSideBar } = storeToRefs(generalStore)
</script>

<template>
    <header>
        <TheSearchBar />
    </header>
    <main class="main-view">
        <TheSideBar v-if="!isGameDetailsOn" />
        <section>
            <TheHeader v-if="!isGameDetailsOn" />
            <Suspense>
                <RouterView />
            </Suspense>
        </section>
    </main>
</template>

<style lang="scss" scoped>
.main-view {
    @include breakpoint {
        display: grid;
        grid-template-columns: auto 1fr;
    }
}
.game-details {
    @include breakpoint {
        display: grid;
        grid-template-columns: 1fr;
    }
}
</style>
