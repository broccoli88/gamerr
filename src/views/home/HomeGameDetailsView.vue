<script async setup>
import GameDetailsHeader from '../../components/game-details/GameDetailsHeader.vue'
import { useFetchSingleGame } from '../../modules/useFetchSingleGame'
import { useGameDetailsStore } from '../../stores/useGameDetailsStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const gameDetailsStore = useGameDetailsStore()
const { gameBackgroundImage } = storeToRefs(gameDetailsStore)
const route = useRoute()
const slug = route.params.slug

const game = ref()

const fetchSingleGame = async () => {
    game.value = await useFetchSingleGame(slug)
    gameBackgroundImage.value = `url('${game.value.background_image}')`
}

await fetchSingleGame()
</script>

<template>
    <section class="game">
        <section class="game__content">
            <GameDetailsHeader :game="game" />
        </section>
    </section>
</template>

<style lang="scss" scoped>
.game {
    display: grid;
    margin-top: 2rem;
}

.game__content {
    width: 100%;
    max-width: 48rem;
    margin-inline: auto;

    @include breakpoint {
        max-width: none;
        margin-inline: 0;
    }
}
</style>
