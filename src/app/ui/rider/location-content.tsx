import { FC, JSX } from "react"
import { Box, Button } from "@mui/material"

import AutoComplete from "@/app/ui/rider/auto-complete"
import { currentLocation } from "@/app/lib/actions"
import CurrentLocation from "@/app/ui/rider/current-location"

const LocationContent: FC = (): JSX.Element => {

    const handleLocation = async () => {
        const response = await currentLocation()
        console.log(response.formatted_address)
    }

    return (
        <Box
            component="div"
            sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
        >
            <Button
                onClick={handleLocation}
            >
                current location                                
            </Button>
            <CurrentLocation />
            <AutoComplete />
        </Box>
    )
}

export default LocationContent