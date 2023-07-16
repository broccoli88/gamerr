<script setup>
import { Icon } from '@iconify/vue'
</script>
<template>
    <section class="header__filtering">
        <span>
            <slot name="order-type"></slot>
        </span>
        <span class="filtering__selection">
            <slot name="filtering-option"></slot>
        </span>
        <Icon class="icon" icon="bi:chevron-down" />
    </section>
</template>

<style lang="scss" scoped>
.header__filtering {
    font-size: 1.3rem;
    background: $color-gray-dark-15;
    padding: 0.8rem 2rem;
    border-radius: 7px;
    white-space: nowrap;

    min-width: 22.5rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;

    .icon {
        margin-left: auto;
    }

    .filtering__selection {
        text-transform: capitalize;
    }

    span {
        &:nth-of-type(2) {
            font-weight: 700;
        }
    }
}
</style>
