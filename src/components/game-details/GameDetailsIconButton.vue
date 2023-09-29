<script setup></script>

<template>
    <button class="details-btn">
        <slot name="icon-left" />
        <p></p>
    </button>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/_button.scss';

.details-btn {
    // @include details-btn;

    display: grid;
    place-content: center;
}
</style>
