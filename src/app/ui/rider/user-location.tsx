'use client'

import { JSX, useEffect, useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { TextField } from "@mui/material"

import { currentLocation, getRiders } from "@/app/lib/actions"

interface PlaceProps {
    latlng: string
    address: string
}

const UserLocation = (): JSX.Element => {
    const [place, setPlace] = useState<PlaceProps>({
        latlng: '',
        address: ''
    })
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()

    const getLocation = async (geolocation: string) => {
        const response = await currentLocation(geolocation)
        const rider = await getRiders()
        
        setPlace({
            latlng: `${response.geometry.location.lat},${response.geometry.location.lng}`,
            address: response.formatted_address
        })
        const params = new URLSearchParams(searchParams)
        if (response) {
            params.set("pickup", `${response.geometry.location.lat},${response.geometry.location.lng}`)
            params.set("id", rider![0].rider_id)
        } else {
            params.delete("pickup")
            params.delete("id")
        }
        replace(`${pathName}?${params.toString()}`)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getLocation(`${position.coords.latitude},${position.coords.longitude}`)
        })
    }, [])

    return (
        <TextField 
            fullWidth
            disabled
            label="Pickup"
            value={place.address}
            variant="filled"
        />
    )
}

export default UserLocation