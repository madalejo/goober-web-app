import { FC, JSX } from "react"
import { Box } from "@mui/material"

import AutoComplete from "@/app/ui/rider/auto-complete"
import CurrentLocation from "@/app/ui/rider/current-location"
import Search from "@/app/ui/rider/search"

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
            {/* <CurrentLocation /> */}
            <Search />
        </Box>
    )
}

export default LocationContent