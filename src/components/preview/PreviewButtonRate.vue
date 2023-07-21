<script setup>
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { ref } from 'vue'

const emits = defineEmits(['open-rate-game-window'])

const generalStore = useGeneralStore()
const { isRateGameWindowOpen, isDesktopView } = storeToRefs(generalStore)

const rateBtn = ref()

const openRateGameWindow = () => {
    if (!isDesktopView.value) {
        isRateGameWindowOpen.value = true
    }

    if (isDesktopView.value) {
        rateBtn.value.classList.add('current-rate-btn')
        emits('open-rate-game-window')
    }
}
</script>

<template>
    <button class="btn-rate" ref="rateBtn">
        <Icon class="rate-icon" icon="mdi:dots-horizontal" @click="openRateGameWindow" />
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
}

.rate-icon {
    font-size: 1.7em;
}
</style>
