<script async setup>
import GameDetailsHeader from '../../components/game-details/GameDetailsHeader.vue'
import GameDetailsFloatIconButton from '../../components/game-details/GameDetailsFloatIconButton.vue'
import GameDetailsIconButton from '../../components/game-details/GameDetailsIconButton.vue'
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
            <GameDetailsFloatIconButton
                class="details-btn details-btn--large details-btn--white details-btn--white-hover"
            >
                <template v-slot:top-text> Add to </template>
                <template v-slot:bottom-text> My games </template>
                <template v-slot:icon-right>
                    <Icon class="details-btn__icon" icon="ic:sharp-add" />
                </template>
            </GameDetailsFloatIconButton>
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
    padding-inline: 1rem;

    @include breakpoint {
        max-width: none;
        margin-inline: 0;
    }
}
</style>
