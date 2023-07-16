<script setup>
import SidebarIconMedium from './SidebarIconMedium.vue'
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

const props = defineProps(['data'])

const emits = defineEmits(['switch-col'])

const isListUnwrapped = ref(false)

const currentIcon = computed(() => (!isListUnwrapped.value ? `bi:chevron-down` : `bi:chevron-up`))

const partOfList = computed(() =>
    props.data.types.length > 4 && !isListUnwrapped.value
        ? props.data.types.slice(0, 3)
        : props.data.types
)

const toggleList = () => {
    isListUnwrapped.value = !isListUnwrapped.value
    emits('switch-col')
}

const buttonText = computed(() => (isListUnwrapped.value ? 'Hide' : 'Show all'))
</script>
<template>
    <div>
        <router-link to="#" class="mobile-list__section-title"> {{ data.title }}</router-link>
        <ul class="mobile-list">
            <li class="mobile-list__item" v-for="subType in partOfList" :key="subType.title">
                <SidebarIconMedium :icon="subType" />
                <router-link :to="subType.link" class="mobile-list__link">
                    {{ subType.title }}</router-link
                >
            </li>
            <button class="show-all" v-if="data.types.length > 4" @click="toggleList">
                <div class="btn-wrapper">
                    <Icon :icon="currentIcon" />
                </div>
                <p>{{ buttonText }}</p>
            </button>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.mobile-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mobile-list__section-title {
    font-size: 1.8rem;
    color: $color-text;
    font-weight: 600;
    margin-bottom: 1rem;
    display: inline-block;
}

.mobile-list__item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
}

.mobile-list__link {
    color: $color-text;
}

.btn-wrapper {
    width: 1.8em;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
}

.show-all {
    display: flex;
    align-items: center;
    gap: 1rem;

    background-color: transparent;
    border: none;

    color: $color-gray-light-40;
    font-size: 1.4rem;
    margin-top: 0.5rem;

    cursor: pointer;
}
</style>
