<script setup>
import { useFetchSingleGame } from '../../modules/useFetchSingleGame'
import PreviewPlatformIcon from '../preview/PreviewPlatformIcon.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug
const game = await useFetchSingleGame(slug)

console.log(game)
</script>

<template>
    <header>
        <section>
            <router-link to="/">home</router-link><span>/</span>
            <router-link to="/">games</router-link><span>/</span>
            <p v-if="game.name">{{ game.name }}</p>
        </section>
        <section>
            <div>
                <PreviewPlatformIcon
                    v-for="platform in game.parent_platforms"
                    :key="platform.id"
                    :platform="platform.platform"
                />
            </div>
            <div>average playtime: {{ game.playtime }} hours</div>
        </section>
        <h2 v-if="game.name">{{ game.name }}</h2>
    </header>
</template>

<style lang="scss" scoped></style>
