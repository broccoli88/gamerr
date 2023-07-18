export const useFetchPlatforms = async () => {
    const apiKey = import.meta.env.VITE_API_KEY
    let platforms

    try {
        const response = await fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`)
        platforms = await response.json()
    } catch (err) {
        console.error(err)
    }

    return platforms
}
