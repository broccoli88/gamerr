<script setup>
import PreviewLoadBtn from '../../components/preview/PreviewLoadBtn.vue'
import PreviewTileGrid from '../../components/preview/PreviewTileGrid.vue'
import PreviewTileSingleCol from '../../components/preview/PreviewTileSingleCol.vue'
import PreviewTileMobile from '../../components/preview/PreviewTileMobile.vue'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const generalStore = useGeneralStore()
const { isDesktopView, isGridActive } = storeToRefs(generalStore)

const allGames = ref([])

onMounted(() => {
    console.log(allGames.value)
    const loadBtn = document.querySelector('.load-btn')
    const loadBtnObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && allGames.value.length > 0) {
                    // page.value++;
                }
            })
        },
        { rootMargin: '0px 0px 300px 0px' }
    )

    loadBtnObserver.observe(loadBtn)
})
</script>

<template>
    <div class="games-wrapper">
        <div v-if="isDesktopView">
            <div class="desktop-view-grid" v-if="isGridActive">
                <PreviewTileGrid v-for="game in allGames" :key="game.id" :game="game" />
            </div>
            <div class="desktop-view-col" v-else>
                <PreviewTileSingleCol v-for="game in allGames" :key="game.id" :game="game" />
            </div>
        </div>
        <div class="mobile-view" v-else>
            <PreviewTileMobile v-for="game in allGames" :key="game.id" :game="game" />
        </div>
        <PreviewLoadBtn />
    </div>
</template>

<style lang="scss" scoped>
.games-wrapper {
    display: grid;
}
.mobile-view {
    display: grid;
    gap: 1.5rem;
}

.desktop-view-col {
    display: grid;
    gap: 2.5rem;
}

.desktop-view-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(28rem, 100%), 1fr));
    gap: 1rem;
}
</style>
