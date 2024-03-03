'use server'
import { supabase } from "@/app/utils/supabase"

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