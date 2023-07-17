<script setup>
const props = defineProps(['pending'])
const emits = defineEmits(['fetch-next-page'])

const emitFetchNextPage = () => {
    emits('fetch-next-page')
}
</script>

<template>
    <button class="load-btn" @click="emitFetchNextPage">
        <p v-if="!props.pending">Load more</p>
        <Icon class="spinner-icon" icon="svg-spinners:ring-resize" v-else />
    </button>
</template>

<style lang="scss" scoped>
.load-btn {
    border: none;
    background-color: $color-card;
    font-size: 1.8rem;
    color: $color-text;
    width: 20rem;
    height: 5rem;
    border-radius: 8px;
    margin-inline: auto;
    margin-block: 2rem;
    cursor: pointer;
}

.spinner-icon {
    font-size: 3rem;
}
</style>
