'use server'
import { supabase } from "@/app/utils/supabase"

const now = new Date()

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
    pickup_address: string | null
    dropoff: string | null
    dropoff_address: string | null
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
            pickup_address: payload.pickup_address,
            dropoff_location: payload.dropoff,
            dropoff_address: payload.dropoff_address,
            fee: payload.total_fare,
            driver_fee: payload.total_fare! * ( 80 / 100 ),
            co_fee: payload.total_fare! * ( 20 / 100 ),
            rider_id: payload.rider_id
        }])
        .select()
        return data
}

export const getActiveRide = async () => {
    const { data, error } = await supabase
    .from('rides')
    .select()
    .eq('status', 'Requested')

    return data
}

export const getAcceptedRide = async () => {
    const { data, error } = await supabase
    .from('rides')
    .select()
    .eq('status', 'Accepted')
    .eq('driver_id', '269b6f7c-65a5-4cb9-b85a-7d342ff591a9')
    .limit(1)

    return data
}

export const cancelRide = async (ride_id: string, driver_id?: string | null, rider_id?: string | null) => {
    const { data, error } = await supabase
    .from('rides')
    .update({ 
        status: 'Canceled',
        canceled_at: now,
        ...( driver_id ? { driver_id: driver_id } : {}),
        ...( rider_id ? { rider_id: rider_id } : {})
    })
    .eq('ride_id', ride_id)
    .select()

    console.log(error)

    return data
}

export const acceptRide = async (ride_id: string, driver_id: string) => {
    const { data, error } = await supabase
    .from('rides')
    .update({ 
        status: 'Accepted',
        accepted_at: now,
        driver_id: driver_id 
    })
    .eq('ride_id', ride_id)
    .select()

    console.log(error)

    return data
}

export const getOngoingRide = async () => {
    const { data, error } = await supabase
    .from('rides')
    .select(`
        *,
        drivers (
            first_name,
            last_name
        )
    `)
    .eq('status', 'Accepted')
    .limit(1)

    return data
}