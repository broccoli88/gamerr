<script setup></script>

<template>
    <div class="navbar__rate-games">
        <router-link to="#">
            <Icon icon="noto:bullseye" class="button-bullseye-icon" />

            Rate top games
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.navbar__rate-games {
    width: max-content;
    background: white;
    border-radius: 4px;
    position: relative;
    font-size: 1.3rem;
    padding: 0.28em 0.6em 0.28em 1.6em;
    overflow: hidden;
    border: 1px solid $color-gray-light-40;

    a {
        color: $color-bg;
    }

    .button-bullseye-icon {
        position: absolute;
        width: 24px;
        aspect-ratio: 1;
        left: -0.2em;
        bottom: -0.4rem;
        transform: skew(20deg);
        font-size: 2.4rem;
    }
}
</style>
