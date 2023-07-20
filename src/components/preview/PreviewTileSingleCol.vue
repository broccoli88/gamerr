<script setup>
import PreviewScreenshots from './PreviewScreenshots.vue'
import PreviewPlatformIcon from './PreviewPlatformIcon.vue'
import PreviewMetaScoreIcon from './PreviewMetascoreIcon.vue'
import PreviewRating from './PreviewRating.vue'
import PreviewButtonAdd from './PreviewButtonAdd.vue'
import PreviewButtonGift from './PreviewButtonGift.vue'
import PreviewButtonRate from './PreviewButtonRate.vue'
import PreviewButtonShowRelated from './PreviewButtonShowRelated.vue'

import { computed, ref } from 'vue'
const props = defineProps(['game'])
const gameInfo = ref(props.game)

const reducedPlatform = computed(() =>
    props.game.parent_platforms.length > 4
        ? props.game.parent_platforms.slice(0, 3)
        : props.game.parent_platforms
)

const additionalPlatforms = computed(() =>
    props.game.parent_platforms.length > 4 ? props.game.parent_platforms.length - 3 : 0
)

const regEx = /^[a-zA-Z0-9.,!?@#$%^&*()_+{}[\]:;<=>/'"\\|~` \t:-]+$/
const checkGameName = regEx.test(gameInfo.value.name)

const gameTitle = computed(() =>
    checkGameName ? gameInfo.value.name : gameInfo.value.slug.split('-').join(' ')
)

// Current game screenshot

const screenshotCount = ref(0)
const changeScreenshot = (currentScreenshot) => {
    screenshotCount.value = currentScreenshot
}
</script>

<template>
    <article class="preview-tile">
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
                v-if="game.short_screenshots.length > 0"
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
            </section>
            <section class="preview-tile__title-wrapper">
                <router-link to="#" class="preview-tile__title">
                    <p>{{ gameTitle }}</p>

                    <PreviewRating :ratings="game.ratings" v-if="game.ratings.length > 0" />
                </router-link>
                <PreviewButtonShowRelated />
            </section>
            <section class="preview-tile__option-btns">
                <PreviewButtonAdd :suggestions="game.added" />
                <PreviewButtonGift />
                <PreviewButtonRate />
            </section>
            <div class="preview-tile__extended-row-wrapper">
                <div class="preview-tile__extended-row">
                    <p>Metascore:</p>
                    <PreviewMetaScoreIcon :score="game.metacritic" />
                </div>
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
        </div>
    </article>
</template>

<style lang="scss" scoped>
.preview-tile {
    width: min(71.5rem, 100%);
    margin-inline: auto;

    border-radius: 12px;
    background-color: $color-card;

    display: grid;
    grid-template-rows: auto auto;
    height: max-content;

    position: relative;
}

.preview-tile__img-container {
    width: 100%;
    height: 45vw;
    max-height: 40rem;
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

.preview-tile__content {
    padding: 3rem 3rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.preview-tile__title-wrapper {
    display: grid;
    grid-template-columns: 1fr 30%;
    align-items: center;
}

.preview-tile__platforms {
    display: flex;
    gap: 0.7rem;
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
        font-size: 2.2rem;
        color: $color-text;
        font-weight: 600;
        margin-right: 1rem;
        display: inline;
    }

    .icon {
        transform: skew(7deg);
        margin-bottom: 0.6rem;
    }
}

.preview-tile__option-btns {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    height: 2.5rem;
}

.btn-toggle-details {
    border: none;
    background: none;
    color: $color-text;
    cursor: pointer;
    margin-top: 1rem;
    font-weight: 300;
    font-family: $ff-text;
    font-size: 1.2rem;
    text-decoration: underline;
}

.preview-tile__extended-row-wrapper {
    display: flex;
    gap: 2rem;
}

.preview-tile__extended-row {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    align-items: center;
    flex-wrap: wrap;

    p {
        &:first-child {
            color: $color-gray-light-40;
            margin-right: 0.5rem;
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
