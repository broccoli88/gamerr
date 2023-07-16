<script setup>
import { computed } from 'vue'

const props = defineProps(['screenshots', 'tab'])
const emits = defineEmits(['change-screenshot'])

const screenshotsQuantity = computed(() => props.screenshots.length)

const emitChangeScreenshot = (currentScreenshot) => {
    emits('change-screenshot', currentScreenshot)
}
</script>

<template>
    <div class="screenshots-container">
        <div
            class="screenshots"
            v-for="(n, index) in screenshotsQuantity"
            :key="n"
            @mouseenter="emitChangeScreenshot(index)"
        >
            <div class="screenshots__tab" :class="{ active: n === tab + 1 }"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.screenshots-container {
    position: absolute;
    inset: 0;
    z-index: 99;

    display: grid;
    grid-auto-flow: column;
    gap: 1rem;

    padding: 1rem;
    opacity: 0;
    transition: opacity 0.2s ease-in;
}
.screenshots {
    display: flex;
    align-items: flex-end;
}

.screenshots__tab {
    width: 100%;
    height: 4px;
    border-radius: 3px;
    background-color: $color-text;
    opacity: 0.5;
}

.active {
    opacity: 1;
}
</style>
