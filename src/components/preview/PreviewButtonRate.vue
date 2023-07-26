<script setup>
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '../../stores/useGeneralStore'

const generalStore = useGeneralStore()
const { isRateGameMobileWindowOpen, isDesktopView } = storeToRefs(generalStore)

const emits = defineEmits(['open-desktop-rate-game-window'])

const openRateGameWindow = () => {
    if (!isDesktopView.value) {
        isRateGameMobileWindowOpen.value = true
    }

    if (isDesktopView.value) {
        emits('open-desktop-rate-game-window')
    }
}
</script>

<template>
    <button class="btn-rate" @click="openRateGameWindow">
        <Icon class="rate-icon" icon="mdi:dots-horizontal" />
    </button>
</template>

<style lang="scss" scoped>
.btn-rate {
    color: $color-text;
    background-color: hsl(0, 0%, 100%, 0.1);
    font-size: 1.15rem;

    display: flex;
    align-items: center;
    padding: 0.2rem 0.8rem 0.2rem 0.8rem;
    width: max-content;
    border-radius: 4px;

    border: none;
    cursor: pointer;
    position: relative;

    transition: 0.2s all ease-in;
    &:hover,
    &:focus {
        background-color: white;
        color: black;

        .rate-icon {
            color: black;
        }
    }
}

.rate-icon {
    font-size: 1.7em;
    transition: 0.2s all ease-in;
}
</style>
