<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps(['icon'])
</script>

<template>
    <div class="icon-container">
        <Icon :icon="icon.icon" v-if="props.icon.icon" />
        <img :src="icon.img" alt="" v-else />
    </div>
</template>

<style lang="scss" scoped>
.icon-container {
    width: 1.8em;
    aspect-ratio: 1;
    background-color: $color-gray-dark-15;
    border-radius: 6px;

    display: grid;
    place-content: center;
    transition: 0.2s all ease-in;

    img {
        width: 100%;
        object-fit: cover;
    }
}
</style>
