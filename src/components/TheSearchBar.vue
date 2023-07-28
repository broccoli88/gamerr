<script setup>
import links from '../data/links.json'
import ButtonRateGame from './ButtonRateGame.vue'
import TransitionFade from '../transitions/TransitionFade.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const navMobileLinks = links.navMobile
const usersLinks = links.userLinks

const isMobileNavOpen = ref(false)

const showMobileNav = () => {
    isMobileNavOpen.value = true
}
const hideMobileNav = () => {
    isMobileNavOpen.value = false
}

const isUserNavOpen = ref(false)
const showUserMenu = () => {
    isUserNavOpen.value = !isUserNavOpen.value
}

// Shortcut for focusing search input

const isSearchBarFocused = ref(false)

const hanadleKeyDown = (e) => {
    if (e.altKey && e.key === 'Enter') {
        focusInput()
    }
}

const focusInput = () => {
    const inputEl = document.querySelector('.navbar__input')
    isSearchBarFocused.value = true
    inputEl.focus()
}

const checkFocus = () => {
    isSearchBarFocused.value = false
}

onMounted(() => {
    document.addEventListener('keydown', hanadleKeyDown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', hanadleKeyDown)
})
</script>

<template>
    <header class="navbar">
        <div class="navbar__content">
            <div>
                <router-link to="/" class="logo">RAWG</router-link>
            </div>
            <div class="navbar__rate-btn">
                <ButtonRateGame />
            </div>

            <div class="navbar__search">
                <form
                    @submit.prevent="handleSearch"
                    class="navbar__form"
                    :class="{ active: isSearchBarFocused }"
                >
                    <button class="navbar__search-btn" title="search">
                        <Icon icon="ic:baseline-search" class="search-icon" />
                    </button>
                    <input
                        @blur="checkFocus"
                        ref="searchBar"
                        class="navbar__input"
                        type="text"
                        placeholder="Search for games"
                    />

                    <TransitionFade>
                        <div class="shortcuts" v-if="!isSearchBarFocused">
                            <div class="shortcut">alt</div>
                            <div>+</div>
                            <div class="shortcut">enter</div>
                        </div>
                    </TransitionFade>
                </form>
            </div>
            <div class="navbar__menu-button" @click="showMobileNav">
                <Icon icon="lucide:menu" class="mobile-menu-icon" />
            </div>
            <div class="navbar__user">
                <router-link class="user__acc" to="#">log in</router-link>
                <router-link class="user__acc" to="#">sign up</router-link>
                <router-link class="user__acc" to="#">api</router-link>
                <Icon icon="mdi:dots-horizontal" class="user__menu" @mouseover="showUserMenu" />

                <TransitionFade>
                    <ul class="user__list" v-if="isUserNavOpen" @mouseleave="showUserMenu">
                        <li class="user__item" v-for="link in usersLinks" :key="link.name">
                            <router-link :to="link.link" class="user__link">
                                {{ link.name }}</router-link
                            >
                        </li>
                    </ul>
                </TransitionFade>
            </div>
        </div>
        <TransitionFade>
            <div class="mobile-container" v-if="isMobileNavOpen">
                <nav class="navbar__nav-mobile">
                    <div class="nav-mobile__content">
                        <ButtonRateGame />
                        <ul class="nav__list">
                            <li class="nav__item">
                                <router-link to="#" class="nav__link">Home</router-link>
                            </li>
                            <li class="nav__item">
                                <router-link to="#" class="nav__link">Reviews</router-link>
                            </li>
                            <li class="nav__item">
                                <router-link to="#" class="nav__link">Browse</router-link>
                                <ul class="subnav-mobile">
                                    <li
                                        class="mobile__item"
                                        v-for="link in navMobileLinks"
                                        :key="link.name"
                                    >
                                        <router-link :to="link.link" class="mobile__link">
                                            {{ link.name }}
                                        </router-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav__item">
                                <router-link to="#" class="nav__link">API</router-link>
                            </li>
                            <li class="nav__item">
                                <router-link to="#" class="nav__link"> Get an API key </router-link>
                            </li>
                            <li class="nav__item">
                                <router-link to="#" class="nav__link"> Sitemap </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="buttons-mobile">
                        <Icon
                            @click="hideMobileNav"
                            icon="line-md:menu-to-close-transition"
                            class="close-mobile"
                        />

                        <router-link to="#" class="btn-mobile">
                            <div class="link-icon-mobile">
                                <Icon icon="mi:log-in" class="icon" />
                            </div>
                            <p>Log in</p>
                        </router-link>
                        <router-link to="#" class="btn-mobile">
                            <div class="link-icon-mobile">
                                <Icon icon="material-symbols:group-add" class="icon" />
                            </div>
                            <p>Sign up</p>
                        </router-link>
                    </div>
                </nav>
            </div>
        </TransitionFade>
    </header>
</template>

<style lang="scss" scoped>
.navbar {
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @include breakpoint {
        padding: 3rem;
    }
    .navbar__content {
        display: flex;
        justify-content: space-between;

        gap: 2rem;
        align-items: center;

        @include breakpoint {
            justify-content: initial;
        }
    }

    .logo {
        font-size: 1.8rem;
        font-weight: 800;
        letter-spacing: 4px;
        color: $color-text;
        white-space: nowrap;
        text-transform: uppercase;
        margin-right: 2rem;
    }

    .navbar__rate-btn {
        display: none;

        @include breakpoint {
            display: initial;
        }
    }

    .navbar__search {
        width: min(30rem, 100%);

        @include breakpoint {
            flex: 1;
        }
    }

    .navbar__form {
        display: flex;
        align-items: center;

        background-color: $color-gray-light-30;
        border-radius: 50px;
        overflow: hidden;
        padding: 0.2em 1rem;
        transition: background 0.3s ease-in;

        @include breakpoint {
            padding-block: 0;
        }

        &:hover,
        &:focus {
            background: white;

            .navbar__input {
                color: black;
            }

            .search-icon {
                color: black;
            }
        }

        @include breakpoint {
            padding: 0.5em 1em;
        }

        .navbar__input {
            width: 100%;
            border: none;
            background-color: transparent;
            outline: none;
            padding-block: 0.3em;

            color: $color-gray-light-50;
            font-size: 1.4rem;

            &::placeholder {
                color: $color-gray-light-60;
            }
        }

        .navbar__search-btn {
            border: none;
            background-color: transparent;
            display: flex;
            align-items: center;
        }
        .search-icon {
            font-size: 2rem;
            color: $color-gray-light-60;
            margin-right: 0.5rem;
            transition: color 0.3s ease-in;
        }

        .shortcuts {
            display: none;

            @include breakpoint {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                font-size: 1.2rem;
                color: $color-gray-light-40;
            }

            .shortcut {
                border: 1px solid $color-gray-light-40;
                border-radius: 4px;
                padding: 0.1em 0.6em;
            }
        }
    }

    .navbar__menu-button {
        height: 3.2rem;
        aspect-ratio: 1;
        cursor: pointer;
        @include breakpoint {
            display: none;
        }

        .mobile-menu-icon {
            font-size: 2.6rem;
        }
    }

    .navbar__user {
        display: none;
        position: relative;

        @include breakpoint() {
            display: flex;
            gap: 2rem;
            align-items: center;
            margin-left: 2rem;
        }

        .user__menu {
            font-size: 2.6rem;
        }

        .user__acc {
            color: $color-text;
            text-transform: uppercase;
            font-size: 1.4rem;
            position: relative;

            &::after {
                content: none;

                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: white;
            }

            &:hover::after {
                content: '';
            }
        }

        .user__list {
            background: white;
            padding: 2rem 1rem;
            border-radius: 4px;

            position: absolute;
            right: 0;
            top: 0;
        }

        .user__item {
            padding: 0.3rem 0.6rem;

            &:hover,
            &:focus {
                border-radius: 4px;
                background-color: $color-gray-light-90;
            }
        }

        .user__link {
            font-size: 1.4rem;
            display: block;
            color: black;
            text-transform: capitalize;
        }
    }

    .active {
        background: white;
    }
}

.mobile-container {
    position: absolute;
    inset: 0;
    z-index: 9;
    background-color: $color-black-09;

    @include breakpoint {
        display: none;
    }

    .navbar__nav-mobile {
        margin-left: auto;
        max-width: 32rem;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4rem;
        background: white;
        padding: 4rem 1.5rem 2rem 2.5rem;
        border-radius: 25px;

        .buttons-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.7rem;

            .close-mobile {
                color: black;
                margin-bottom: 1rem;
                cursor: pointer;
                font-size: 3.3rem;
            }

            .btn-mobile {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;

                .link-icon-mobile {
                    display: grid;
                    place-content: center;
                    aspect-ratio: 1;
                    background: black;
                    padding: 1.1rem;
                    border-radius: 50%;
                }

                .icon {
                    color: white;
                    cursor: pointer;
                    font-size: 2.8rem;
                }

                p {
                    font-size: 1.1rem;
                    color: $color-gray-light-70;
                }
            }
        }

        .nav__list {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .nav__link {
                font-size: 2.4rem;
                font-weight: 600;
                color: black;
            }

            .subnav-mobile {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .mobile__link {
                font-size: 1.7rem;
                text-transform: capitalize;
                color: black;
            }
        }
    }
}
</style>
