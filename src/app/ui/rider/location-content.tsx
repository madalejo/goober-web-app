import { FC, JSX } from "react"
import { Box, Button } from "@mui/material"

import AutoComplete from "@/app/ui/rider/auto-complete"
import { currentLocation } from "@/app/lib/actions"
import CurrentLocation from "@/app/ui/rider/current-location"

const LocationContent: FC = (): JSX.Element => {

    return (
        <Box
            sx={{ 
                flexGrow: 1, 
                display: "flex",
                alignSelf: "flex-end",
                flexDirection: "column",
                pt: 4,
                rowGap: 1
            }}
        >
            <CurrentLocation />
            <AutoComplete />
        </Box>
    )
}

export default LocationContent