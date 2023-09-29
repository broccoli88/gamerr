<script setup></script>

<template>
    <button class="details-btn">
        <p>
            <slot name="top-text" />
        </p>

        <slot name="bottom-text" />

        <div class="details-btn__icon-container">
            <slot name="icon-right" />
        </div>
    </button>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/_button.scss';
.details-btn {
    @include details-btn;
}
</style>

<style lang="scss">
@import '../../assets/scss/_button.scss';

.details-btn__icon {
    font-size: 3.5rem;
    color: white;
}

// Sizes

.details-btn--large {
    @include details-btn-large;
}

// Type

.details-btn--white {
    @include details-btn-white;

    .details-btn__top-txt {
        @include details-btn-top-txt;
    }

    .details-btn__bottom-txt {
        @include details-btn-bottom-txt;
    }

    .details-btn__icon-container {
        @include details-btn-icon-container;
        @include details-btn-icon-container-green;
    }
}

.details-btn--outline-white {
    @include details-btn-outline-white;

    .details-btn__top-txt {
        @include details-btn-top-txt;
    }

    .details-btn__bottom-txt {
        @include details-btn-bottom-txt(white);
    }

    .details-btn__icon-container {
        @include details-btn-icon-container(-0.4rem);
    }
}

// Hover

.details-btn--white-hover {
    @include details-btn-white-hover;
}

.details-btn--outline-white-hover {
    @include details-btn-outline-white-hover;
}
</style>
