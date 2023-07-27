<script setup>
import GameDetailsHeader from '../../components/game-details/GameDetailsHeader.vue'
</script>
<template>
    <section class="game">
        <Suspense>
            <GameDetailsHeader />
        </Suspense>
    </section>
</template>

<style lang="scss" scoped></style>
