<script setup>
const props = defineProps(['score'])
</script>

<template>
    <div class="metascore">
        <p class="metascore__score">{{ props.score }}</p>
    </div>
</template>

<style lang="scss" scoped>
.metascore {
    height: min-content;
    padding-inline: 0.5rem;
    border: 1px solid hsl(120, 61%, 50%, 0.7);
    border-radius: 4px;
}

.metascore__score {
    font-size: 1.3rem;
    font-weight: 700;
    color: limegreen;
}
</style>
