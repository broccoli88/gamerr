<script setup></script>

<template>
    <router-link to="#" class="btn-gift">
        <Icon class="gift-icon" icon="ph:gift" />
    </router-link>
</template>

<style lang="scss" scoped>
.btn-gift {
    color: $color-text;
    background-color: hsl(0, 0%, 100%, 0.1);
    font-size: 1.15rem;

    display: flex;
    align-items: center;
    padding: 0.2rem 0.8rem 0.2rem 0.8rem;
    width: max-content;
    border-radius: 4px;
}

.gift-icon {
    font-size: 1.7em;
}
</style>
