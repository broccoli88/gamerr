<template>
    <button class="btn-rate">
        <Icon class="rate-icon" icon="mdi:dots-horizontal" />
    </button>
</template>

<script setup></script>

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
}

.rate-icon {
    font-size: 1.7em;
}
</style>
