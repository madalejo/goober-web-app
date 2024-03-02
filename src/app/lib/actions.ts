'use server'

export const queryAutocomplete = async (input: string) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${input}&key=${process.env.GMAPS_TOKEN!}`
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching place suggestion: ', error)
        return []
    }
}