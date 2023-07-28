<script setup>
import platformIcons from '../../data/platformIcons.json'
import { computed } from 'vue'

const props = defineProps(['platform'])
const currentPlatformIcon = computed(() => {
    return platformIcons.find((i) => {
        if (i.title === props.platform.name) {
            return i
        }
    })
})
</script>

<template>
    <div class="platform-icon">
        <Icon :icon="currentPlatformIcon.icon" />
    </div>
</template>

<style lang="scss" scoped>
.platform-icon {
    font-size: 1.6rem;
    display: grid;
    place-content: center;
}
</style>
