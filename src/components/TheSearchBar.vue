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
                <router-link to="#" class="logo">RAWG</router-link>
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            class="search-icon"
                        >
                            <path
                                fill="currentColor"
                                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
                            />
                        </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z"
                    />
                </svg>
            </div>
            <div class="navbar__user">
                <router-link class="user__acc" to="#">log in</router-link>
                <router-link class="user__acc" to="#">sign up</router-link>
                <router-link class="user__acc" to="#">api</router-link>

                <svg
                    class="user__menu"
                    @mouseover="showUserMenu"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z"
                    />
                </svg>
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
                        <svg
                            class="close-mobile"
                            @click="hideMobileNav"
                            xmlns="http://www.w3.org/2000/svg"
                            width="34"
                            height="34"
                            viewBox="0 0 24 24"
                        >
                            <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                            >
                                <path d="M5 5L12 5L19 5">
                                    <animate
                                        fill="freeze"
                                        attributeName="d"
                                        dur="0.4s"
                                        values="M5 5L12 5L19 5;M5 5L12 12L19 5"
                                    />
                                </path>
                                <path d="M5 12H19">
                                    <animate
                                        fill="freeze"
                                        attributeName="d"
                                        dur="0.4s"
                                        values="M5 12H19;M12 12H12"
                                    />
                                </path>
                                <path d="M5 19L12 19L19 19">
                                    <animate
                                        fill="freeze"
                                        attributeName="d"
                                        dur="0.4s"
                                        values="M5 19L12 19L19 19;M5 19L12 12L19 19"
                                    />
                                </path>
                            </g>
                        </svg>
                        <router-link to="#" class="btn-mobile">
                            <div class="link-icon-mobile">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                >
                                    <g fill="white">
                                        <path
                                            d="M14 19a1 1 0 1 0 0 2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-5a1 1 0 1 0 0 2h5v14h-5z"
                                        />
                                        <path
                                            d="M15.714 12.7a.996.996 0 0 0 .286-.697v-.006a.997.997 0 0 0-.293-.704l-4-4a1 1 0 1 0-1.414 1.414L12.586 11H3a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4l.007-.007z"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <p>Log in</p>
                        </router-link>
                        <router-link to="#" class="btn-mobile">
                            <div class="link-icon-mobile">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="white"
                                        d="M12.5 11.95q.725-.8 1.113-1.825T14 8q0-1.1-.388-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8q0 1.5-1 2.625t-2.5 1.325ZM18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3h-2Zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2h-2ZM8 12q-1.65 0-2.825-1.175T4 8q0-1.65 1.175-2.825T8 4q1.65 0 2.825 1.175T12 8q0 1.65-1.175 2.825T8 12Zm-8 8v-2.8q0-.85.438-1.563T1.6 14.55q1.55-.775 3.15-1.163T8 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20H0Z"
                                    />
                                </svg>
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

        background-color: $color-gray-medium;
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
                path {
                    fill: black;
                }
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

            color: $color-gray-light-40;
            font-size: 1.4rem;
        }

        .navbar__search-btn {
            border: none;
            background-color: transparent;
            display: flex;
            align-items: center;

            .search-icon {
                height: 2rem;
                color: $color-gray-light-40;

                path {
                    transition: 0.3s all ease-in;
                }
            }
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
