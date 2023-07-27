export const useFetchPlatforms = async (query = '') => {
    const apiKey = import.meta.env.VITE_API_KEY
    let platforms

    const platformQuery = query
    try {
        const response = await fetch(
            `https://api.rawg.io/api/platforms${platformQuery}?key=${apiKey}`
        )
        platforms = await response.json()
    } catch (err) {
        console.error(err)
    }

    return platforms
}
