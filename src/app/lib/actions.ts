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

export const currentLocation = async (geolocation: string) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_GMAPS_BASEURL}/geocode/json?latlng=${geolocation}&key=${process.env.NEXT_PUBLIC_GMAPS_TOKEN!}`
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

/**
 * Supabase
 */

interface CreateRideProps {
    pickup: string | null
    dropoff: string | null
    total_fare: number | null
    rider_id: string | null
}

export const getRiders = async () => {
    const { data, error } = await supabase.from('riders').select()
    return data
}

export const createRide = async (payload: CreateRideProps) => {
    const { data, error } = await supabase
        .from('rides')
        .insert([{
            status: "Requested",
            pickup_location: payload.pickup,
            dropoff_location: payload.dropoff,
            fee: payload.total_fare,
            driver_fee: payload.total_fare! * ( 80 / 100 ),
            co_fee: payload.total_fare! * ( 20 / 100 ),
            rider_id: payload.rider_id
        }])
        .select()
        return data
}