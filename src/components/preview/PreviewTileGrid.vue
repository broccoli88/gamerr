<script setup>
import PreviewScreenshots from './PreviewScreenshots.vue'
import PreviewPlatformIcon from './PreviewPlatformIcon.vue'
import PreviewMetaScoreIcon from './PreviewMetascoreIcon.vue'
import PreviewRating from './PreviewRating.vue'
import PreviewButtonAdd from './PreviewButtonAdd.vue'
import PreviewButtonGift from './PreviewButtonGift.vue'
import PreviewButtonRate from './PreviewButtonRate.vue'
import PreviewButtonShowRelated from './PreviewButtonShowRelated.vue'
import PreviewRateGameWindowDessktop from './PreviewRateGameWindowDessktop.vue'
import TransitionFade from '../../transitions/TransitionFade.vue'
import { useGeneralStore } from '../../stores/useGeneralStore'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'

const generalStore = useGeneralStore()
const { isDesktopView } = storeToRefs(generalStore)

const props = defineProps(['game'])
const gameInfo = ref(props.game)

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

// Rate Game Window

const isRateGameDesktopWindowOpen = ref(false)
const rateGameContainerRef = ref()
const rateGameWrapperRef = ref()
const rateButtonRef = ref()
const previewTileOptionBtnsRef = ref()
const previewTileWrapperRef = ref()
const rateGameWindowPositionX = ref(null)
const rateGameWindowPositionY = ref(null)

const rateGameWindowPosition = () => {
    const lastCols = document.querySelector('.desktop-view-grid').children
    const lastCol = lastCols[lastCols.length - 1]

    if (!lastCol.contains(previewTileWrapperRef.value)) {
        rateGameWindowPositionX.value = `${previewTileOptionBtnsRef.value.offsetLeft}px`
        rateGameWindowPositionY.value = `${previewTileOptionBtnsRef.value.offsetTop}px`
        return
    }

    if (lastCol.contains(previewTileWrapperRef.value)) {
        rateGameWindowPositionX.value = `-26%`
        rateGameWindowPositionY.value = `${previewTileOptionBtnsRef.value.offsetTop}px`
    }
}

const openRateGameDesktopWindow = () => {
    rateGameWindowPosition()
    isRateGameDesktopWindowOpen.value = true
}

const closeRateGameDesktopWindow = () => {
    isRateGameDesktopWindowOpen.value = false
}

const handleRateGameDesktopWindow = (e) => {
    const target = e.target
    if (
        !isRateGameDesktopWindowOpen.value &&
        !rateGameContainerRef.value &&
        !rateGameWrapperRef.value &&
        !isDesktopView.value &&
        rateButtonRef.value.contains(target)
    )
        return

    if (
        rateGameWrapperRef.value &&
        !rateGameWrapperRef.value.contains(target) &&
        (!rateButtonRef.value || !rateButtonRef.value.contains(target))
    ) {
        isRateGameDesktopWindowOpen.value = false
    }
}

onMounted(() => {
    window.addEventListener('click', handleRateGameDesktopWindow)
})

onUnmounted(() => {
    window.removeEventListener('click', handleRateGameDesktopWindow)
})
</script>

<template>
    <div
        class="preview-tile-wrapper"
        @mouseover="showExtendedInfo"
        @mouseleave="hideExtendedInfo"
        ref="previewTileWrapperRef"
    >
        <article class="preview-tile">
            <figure
                class="preview-tile__img-container"
                v-if="gameInfo.short_screenshots !== null && gameInfo.short_screenshots.length > 0"
            >
                <img
                    :src="gameInfo.short_screenshots[screenshotCount].image"
                    alt=""
                    class="preview-tile__img"
                />
                <PreviewScreenshots
                    :screenshots="gameInfo.short_screenshots"
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
                    <span v-if="gameInfo.parent_platforms.length > 4"
                        >+{{ additionalPlatforms }}</span
                    >
                    <div class="preview-tile_metascore">
                        <PreviewMetaScoreIcon
                            :score="gameInfo.metacritic"
                            v-if="gameInfo.metacritic !== null"
                        />
                    </div>
                </section>
                <section class="preview-tile__title-wrapper">
                    <router-link to="#" class="preview-tile__title">
                        <p>{{ gameTitle }}</p>
                        <PreviewRating
                            :ratings="gameInfo.ratings"
                            v-if="gameInfo.ratings.length > 0"
                        />
                    </router-link>
                </section>
                <section class="preview-tile__option-btns" ref="previewTileOptionBtnsRef">
                    <PreviewButtonAdd :suggestions="gameInfo.added" />
                    <TransitionFade>
                        <PreviewButtonGift v-if="isExtendedInfoShown" />
                    </TransitionFade>
                    <TransitionFade>
                        <div v-if="isExtendedInfoShown" ref="rateButtonRef">
                            <PreviewButtonRate
                                @open-desktop-rate-game-window="openRateGameDesktopWindow"
                            />
                        </div>
                    </TransitionFade>
                </section>
            </div>
        </article>
        <TransitionFade>
            <section class="preview-tile__extended-description" v-if="isExtendedInfoShown">
                <div class="preview-tile__extended-row-wrapper">
                    <div class="preview-tile__extended-row">
                        <p>Release date:</p>
                        <p>{{ gameInfo.released }}</p>
                    </div>
                    <div class="preview-tile__extended-row">
                        <p>Genres:</p>
                        <div class="preview-tile__extended-row-genre-wrapper">
                            <router-link to="#" v-for="genre in gameInfo.genres" :key="genre.id">
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

        <TransitionFade>
            <div
                v-if="isRateGameDesktopWindowOpen"
                class="rate-game-container"
                ref="rateGameContainerRef"
            >
                <div ref="rateGameWrapperRef">
                    <PreviewRateGameWindowDessktop
                        @close-rate-game-desktop-window="closeRateGameDesktopWindow"
                    />
                </div>
            </div>
        </TransitionFade>
    </div>
</template>

<style lang="scss" scoped>
.preview-tile-wrapper {
    margin-bottom: 2rem;
    position: relative;

    &:hover {
        .preview-tile,
        .preview-tile__extended-description {
            transform: scale(1.03);
        }
    }
}

.preview-tile {
    border-radius: 12px;
    background-color: $color-card;
    padding-bottom: 3rem;

    display: flex;
    flex-direction: column;
    height: max-content;
    transition: transform 0.2s ease-in;
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
        text-transform: capitalize;
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
    position: relative;
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
    z-index: 98;
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

.rate-game-container {
    position: absolute;
    top: calc(v-bind(rateGameWindowPositionY) - 1.5rem);
    left: calc(v-bind(rateGameWindowPositionX) + 35%);

    z-index: 99;

    display: grid;
    justify-content: end;
    align-items: end;
}

.fade-leave-active {
    transition: none;
}
</style>
