<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['ratings'])
const rating = ref(props.ratings)

const higherRating = computed(() => {
    return rating.value.sort((a, b) => {
        return a.percent - b.percent
    })
}).value.reverse()

const rankingIcon = computed(() => {
    if (higherRating[0].title === 'exceptional') return 'twemoji:bullseye'
    if (higherRating[0].title === 'recommended') return 'noto:thumbs-up'
    if (higherRating[0].title === 'meh') return 'twemoji:expressionless-face'
    if (higherRating[0].title === 'skip') return 'fluent-emoji-flat:stop-sign'
})
</script>

<template>
    <Icon class="ranking-icon" :icon="rankingIcon" />
</template>

<style lang="scss" scoped>
.ranking-icon {
    font-size: 2.2rem;
}
</style>
