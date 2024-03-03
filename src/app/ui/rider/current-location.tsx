import { FC, JSX, useEffect, useState } from "react"

import { TextField } from "@mui/material"
import { currentLocation } from "@/app/lib/actions"

const CurrentLocation: FC = (): JSX.Element => {
    const [place, setPlace] = useState<string>('Loading...')

    const getLocation = async () => {
        const response = await currentLocation()
        setPlace(response.formatted_address)
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <TextField 
            fullWidth
            disabled
            value={place}
        />
    )
}

export default CurrentLocation