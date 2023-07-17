export const useFetchGames = async (query) => {
    const apiKey = import.meta.env.VITE_API_KEY
    let data

    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&${query}`)
        data = await response.json()
    } catch (err) {
        console.error(err)
    }

    return data
}
