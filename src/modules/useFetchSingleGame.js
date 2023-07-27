export const useFetchSingleGame = async (query) => {
    const apiKey = import.meta.env.VITE_API_KEY
    let game

    try {
        const response = await fetch(`https://api.rawg.io/api/games/${query}?key=${apiKey}`)
        game = await response.json()
    } catch (err) {
        console.error(err)
    }

    return game
}
