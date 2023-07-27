import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameDetailsStore = defineStore('gameDetailsStore', () => {
    const gameBackground = ref()

    return { gameBackground }
})
