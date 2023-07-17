<script setup>
import PreviewScreenshots from './PreviewScreenshots.vue'
import PreviewPlatformIcon from './PreviewPlatformIcon.vue'
import PreviewMetaScoreIcon from './PreviewMetascoreIcon.vue'
import PreviewRating from './PreviewRating.vue'
import PreviewButtonAdd from './PreviewButtonAdd.vue'
import PreviewButtonGift from './PreviewButtonGift.vue'
import PreviewButtonRate from './PreviewButtonRate.vue'
import PreviewButtonShowRelated from './PreviewButtonShowRelated.vue'
import TransitionFade from '../../transitions/TransitionFade.vue'
import { ref, computed } from 'vue'

const props = defineProps(['game'])

// Displaying extended info

const isExtendedInfoShown = ref(false)

const showExtendedInfo = () => {
    isExtendedInfoShown.value = true
}
const hideExtendedInfo = () => {
    isExtendedInfoShown.value = false
}

const reducedPlatform = computed(() =>
    props.game.parent_platforms.length > 4
        ? props.game.parent_platforms.slice(0, 3)
        : props.game.parent_platforms
)

const additionalPlatforms = computed(() =>
    props.game.parent_platforms.length > 4 ? props.game.parent_platforms.length - 3 : 0
)

// Current game screenshot

const screenshotCount = ref(0)
const changeScreenshot = (currentScreenshot) => {
    screenshotCount.value = currentScreenshot
}
</script>

<template>
    <article class="preview-tile" @mouseover="showExtendedInfo" @mouseleave="hideExtendedInfo">
        <figure class="preview-tile__img-container">
            <img
                :src="game.short_screenshots[screenshotCount].image"
                alt=""
                class="preview-tile__img"
            />
            <PreviewScreenshots
                :screenshots="game.short_screenshots"
                :tab="screenshotCount"
                @change-screenshot="changeScreenshot"
            />
        </figure>
        <div class="preview-tile__content">
            <section class="preview-tile__platforms">
                <PreviewPlatformIcon
                    v-for="platform in reducedPlatform"
                    :key="platform.platform.id"
                    :platform="platform.platform"
                />
                <span v-if="game.parent_platforms.length > 4">+{{ additionalPlatforms }}</span>
                <div class="preview-tile_metascore">
                    <PreviewMetaScoreIcon :score="game.metacritic" />
                </div>
            </section>
            <section class="preview-tile__title-wrapper">
                <router-link to="#" class="preview-tile__title">
                    <p>{{ game.name }}</p>
                    <PreviewRating :ratings="game.ratings" />
                </router-link>
            </section>
            <section class="preview-tile__option-btns">
                <PreviewButtonAdd :suggestions="game.added" />
                <TransitionFade>
                    <PreviewButtonGift v-if="isExtendedInfoShown" />
                </TransitionFade>
                <TransitionFade>
                    <PreviewButtonRate v-if="isExtendedInfoShown" />
                </TransitionFade>
            </section>
        </div>

        <TransitionFade>
            <section class="preview-tile__extended-description" v-if="isExtendedInfoShown">
                <div class="preview-tile__extended-row-wrapper">
                    <div class="preview-tile__extended-row">
                        <p>Release date:</p>
                        <p>{{ game.released }}</p>
                    </div>
                    <div class="preview-tile__extended-row">
                        <p>Genres:</p>
                        <div class="preview-tile__extended-row-genre-wrapper">
                            <router-link to="#" v-for="genre in game.genres" :key="genre.id">
                                {{ genre.name }}</router-link
                            >
                        </div>
                    </div>
                    <div class="preview-tile__extended-row">
                        <p>Chart:</p>
                        <router-link to="#">Dec 31, 2023</router-link>
                    </div>
                </div>
                <PreviewButtonShowRelated />
            </section>
        </TransitionFade>
    </article>
</template>

<style lang="scss" scoped>
.preview-tile {
    border-radius: 12px;
    background-color: $color-card;
    padding-bottom: 3rem;
    position: relative;

    display: flex;
    flex-direction: column;
    height: max-content;
    transition: transform 0.2s ease-in;

    &:hover {
        transform: scale(1.03);
        z-index: 9;
    }
}

.preview-tile__content {
    padding-inline: 1.5rem;
    display: grid;
    gap: 0.6rem;
    flex: 0.4;
}

.preview-tile__img-container {
    width: 100%;
    height: 45vw;
    max-height: 20rem;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
    position: relative;

    &:hover {
        .screenshots-container {
            opacity: 1;
        }
    }

    .preview-tile__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.preview-tile__platforms {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    align-items: center;

    span {
        font-size: 1.4rem;
    }
}

.preview-tile_metascore {
    margin-left: auto;
}

.preview-tile__title {
    transition: 0.2s all ease-in;
    &:hover {
        opacity: 0.5;
    }

    p {
        font-size: 2.4rem;
        color: $color-text;
        font-weight: 600;
        margin-right: 1rem;
        display: inline;
    }

    .icon {
        transform: skew(10deg);
        margin-bottom: 0.6rem;
    }
}

.preview-tile__option-btns {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    height: 2.5rem;
}

.preview-tile__extended-description {
    display: grid;
    gap: 0.5rem;
    padding-inline: 1.5rem;
    background-color: $color-card;
    padding-bottom: 3rem;
    border-radius: 0 0 12px 12px;

    position: absolute;
    top: calc(100% - 3rem);
    left: 0;
    width: 100%;
    z-index: 9;
}

.preview-tile__extended-row-wrapper {
    display: grid;
    gap: 1rem;
}

.preview-tile__extended-row {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    border-bottom: 1px solid $color-gray-medium;
    padding: 1rem;

    p {
        &:first-child {
            color: $color-gray-light-40;
            margin-right: auto;
        }
    }

    a {
        color: $color-text;
        position: relative;
        text-decoration: underline;
    }

    .preview-tile__extended-row-genre-wrapper {
        display: flex;
        gap: 0.3rem;
    }
}
</style>
