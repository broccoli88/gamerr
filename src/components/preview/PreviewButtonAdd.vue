<script setup>
const props = defineProps(['suggestions'])
</script>

<template>
    <router-link to="#" class="btn-add">
        <Icon class="add-icon" icon="icon-park-solid:cross-society" />
        <p>{{ props.suggestions }}</p>
    </router-link>
</template>

<style lang="scss" scoped>
.btn-add {
    color: $color-text;
    background-color: hsl(0, 0%, 100%, 0.1);
    font-size: 1.15rem;

    display: flex;
    align-items: center;
    padding: 0.2rem 0.8rem 0.2rem 0.5rem;
    width: max-content;
    border-radius: 4px;

    gap: 0.5rem;
    transition: 0.2s all ease-in;

    &:hover,
    &:focus {
        background-color: white;
        color: black;

        .add-icon {
            color: black;
        }
    }
}

.add-icon {
    font-size: 1.3em;
    transition: 0.2s all ease-in;
}
</style>
