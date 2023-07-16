<script setup></script>

<template>
    <router-link to="#" class="btn-show-related">
        <p>Show more like this</p>
        <Icon class="icon" icon="bi:chevron-right" />
    </router-link>
</template>

<style lang="scss" scoped>
.btn-show-related {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-text;
    background-color: $color-gray-medium;
    padding: 0.8rem 1.2rem;
    font-size: 1.3rem;
    border-radius: 10px;
    margin-top: 1.5rem;
    height: min-content;
    white-space: nowrap;

    &:hover {
        p {
            color: gold;
        }
    }

    .icon {
        color: $color-gray-light-40;
        font-size: 1.7em;
    }
}
</style>
