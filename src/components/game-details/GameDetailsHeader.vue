<script setup>
import { onMounted, ref } from 'vue'
import PreviewPlatformIcon from '../preview/PreviewPlatformIcon.vue'

const props = defineProps(['game'])

const formattedDate = ref(null)

const formatDate = () => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]
    const dateParts = props.game.released.split('-')
    const year = dateParts[0]
    const month = months[parseInt(dateParts[1]) - 1]
    const day = dateParts[2]

    formattedDate.value = `${month} ${day}, ${year}`
}

onMounted(() => {
    formatDate()
})

console.log(props.game)
</script>

<template>
    <header class="details-game-header">
        <section class="game-header__path">
            <router-link class="game-header__path-link" to="/">home</router-link>
            <span>/</span>
            <router-link class="game-header__path-link" to="/">games</router-link>
            <span>/</span>
            <p v-if="game.name">{{ game.name }}</p>
        </section>
        <section class="game-header__info">
            <p class="game-header__release" v-if="game.released">{{ formattedDate }}</p>
            <div class="game-header__platforms">
                <PreviewPlatformIcon
                    class="game-header__platform-icon"
                    v-for="platform in game.parent_platforms"
                    :key="platform.id"
                    :platform="platform.platform"
                />
            </div>
            <p class="game-header__average-playtime">average playtime: {{ game.playtime }} hours</p>
        </section>
        <h1 class="game-header__title" v-if="game.name">{{ game.name }}</h1>
    </header>
</template>

<style lang="scss" scoped>
.details-game-header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;

    @include breakpoint {
        align-items: flex-start;
    }
}

.game-header__path {
    display: flex;
    gap: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-size: 1rem;

    .game-header__path-link,
    span,
    p {
        color: $color-gray-light-60;
    }

    .game-header__path-link {
        transition: 0.2s color ease-in;
    }

    .game-header__path-link:hover,
    .game-header__path-link:focus {
        color: $color-text;
    }
}

.game-header__info {
    width: 100%;
    display: flex;
    gap: 1.7rem;
    justify-content: center;
    flex-wrap: wrap;

    .game-header__release {
        color: black;
        text-transform: uppercase;
        font-size: 1.2rem;
        letter-spacing: 2px;
        border-radius: 4px;
        background-color: white;
        display: flex;
        align-items: center;
        padding: 0rem 1rem;
        white-space: nowrap;
    }

    .game-header__platforms {
        display: flex;
        gap: 0.5rem;
    }

    .game-header__platform-icon {
        font-size: 1.4rem;

        @include breakpoint {
            font-size: 1.7rem;
        }
    }

    .game-header__average-playtime {
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
}

.game-header__title {
    @include breakpoint {
        font-size: 7.2rem;
        font-weight: 700;
    }
}
</style>
