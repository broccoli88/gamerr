<script setup>
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { onMounted, ref } from 'vue'

const generalStore = useGeneralStore()
const { isDesktopView, isRateGameWindowOpen } = storeToRefs(generalStore)

const emits = defineEmits(['close-rate-game-window'])

const ratingIcons = ref({
    exceptional: 'twemoji:bullseye',
    recommended: 'noto:thumbs-up',
    meh: 'twemoji:expressionless-face',
    skip: 'fluent-emoji-flat:stop-sign'
})

const rateGameWrapper = ref()
const rateGameWrapperHeight = ref()

const closeRateGameWindow = () => {
    if (!isDesktopView.value) {
        isRateGameWindowOpen.value = false
    }

    if (isDesktopView.value) {
        emits('close-rate-game-window')
    }
}

onMounted(() => {
    if (isDesktopView) {
        rateGameWrapperHeight.value = `calc(${rateGameWrapper.value.clientHeight}px - 1.7em - 1.6rem)`
    }
})
</script>

<template>
    <div class="rate-game-container">
        <div class="rate-game-wrapper" ref="rateGameWrapper">
            <div class="rate-game">
                <p>Rate in one click</p>
                <section class="rate-game__icons">
                    <div
                        v-for="(value, key) in ratingIcons"
                        :key="key"
                        class="rate-game__icon-container"
                        @click="closeRateGameWindow"
                    >
                        <Icon :icon="value" class="rate-game__icon" />
                        <p>{{ key }}</p>
                    </div>
                </section>
            </div>
            <div class="rate-game__btns">
                <button class="rate-game__btn-review">Write a review</button>
                <div class="btn-wrapper">
                    <button class="rate-game__btn-collection" @click="closeRateGameWindow">
                        Add to collection
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.rate-game-container {
    background-color: hsl(0, 0%, 0%, 0.8);

    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 99;

    display: grid;
    justify-content: end;
    align-items: end;

    @include breakpoint {
        left: 30%;
        top: v-bind(rateGameWrapperHeight);
    }
}

.rate-game-wrapper {
    background-color: white;
    width: 25rem;
    display: grid;
    gap: 1rem;
    border-radius: 6px;
    overflow: hidden;

    margin: 1rem;

    @include breakpoint {
        margin: 0;
    }
}

.rate-game {
    display: grid;
    gap: 1rem;
    color: $color-gray-light-40;
    font-size: 1.4rem;
    font-family: $ff-text;
    padding: 1.5rem;
}

.rate-game__icons {
    display: grid;
    gap: 2px;
    grid-template-columns: repeat(2, 1fr);
    font-size: 1.2rem;
    color: black;
    text-transform: capitalize;
    background-color: $color-gray-light-90;
    border: 2px solid $color-gray-light-90;
    border-radius: 6px;
    overflow: hidden;

    .rate-game__icon-container {
        // aspect-ratio: 1;
        display: grid;
        gap: 0.5rem;
        place-content: center;
        text-align: center;
        background-color: white;
        cursor: pointer;
        transition: background-color 0.2s ease-in;
        padding-block: 1.5rem;

        &:hover,
        &:focus {
            background-color: $color-gray-light-90;
        }
    }

    .rate-game__icon {
        font-size: 4rem;
        margin-inline: auto;
    }
}

.rate-game__btns {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .rate-game__btn-review,
    .rate-game__btn-collection {
        border: none;
        background: transparent;
        font-size: 1.4rem;
        font-family: $ff-text;
        transition: background-color 0.2s ease-in;
        cursor: pointer;
        margin-inline: 1.5rem;
        border-radius: 6px;
    }

    .rate-game__btn-review {
        border: 2px solid $color-gray-light-90;
        padding: 0.7em 2em;

        &:hover,
        &:focus {
            background-color: $color-gray-light-90;
        }
    }

    .btn-wrapper {
        background-color: $color-gray-light-90;
        padding-block: 1rem;
        display: grid;
    }

    .rate-game__btn-collection {
        padding: 1rem;

        &:hover,
        &:focus {
            background-color: hsl(0, 0%, 83%);
        }
    }
}
</style>
