<script setup>
import TheSearchBar from '../components/TheSearchBar.vue'
import TheSideBar from '../components/TheSideBar.vue'
import TheHeader from '../components/TheHeader.vue'
import { RouterView, useRoute } from 'vue-router'
import { watch, ref } from 'vue'

const route = useRoute()
const displayHeader = ref(true)

watch(
    () => route.fullPath,
    () => {
        if (route.fullPath.includes('/game')) {
            displayHeader.value = false
        } else {
            displayHeader.value = true
        }
    }
)
</script>

<template>
    <header>
        <TheSearchBar />
    </header>
    <main>
        <TheSideBar />
        <section class="main-section">
            <TheHeader v-if="displayHeader" />
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
