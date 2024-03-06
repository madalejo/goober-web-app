'use server'
import { supabase } from "@/app/utils/supabase"

/*
* Google Maps
*/
export const queryAutocomplete = async (input: string) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_GMAPS_BASEURL}/place/queryautocomplete/json?input=${input}&key=${process.env.NEXT_PUBLIC_GMAPS_TOKEN!}`
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const formattedData = data.predictions.map((location: any) => ({
            label: location.description,
            value: location.place_id
        }))
        return formattedData
    } catch (error) {
        console.error('Error fetching place suggestion: ', error)
        return []
    }
}

export const currentLocation = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_GMAPS_BASEURL}/geocode/json?latlng=40.750562,-73.989296&key=${process.env.NEXT_PUBLIC_GMAPS_TOKEN!}`
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.results[0]
    } catch (error) {
        console.error('Error fetching location: ', error)
        return []
    }
}

export const getLatLng = async (place_id: string) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_GMAPS_BASEURL}/geocode/json?place_id=${place_id}&key=${process.env.NEXT_PUBLIC_GMAPS_TOKEN!}`
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.results[0].geometry.location
    } catch (error) {
        console.error('Error fetching location: ', error)
        return []
    }
}

export const getRiders = async () => {
    /* try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL!}/rest/v1/drivers?select=*`, {
            headers: {
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data: ', error)
        return []
    } */
    const { data, error } = await supabase.from('drivers').select()
    return data
}