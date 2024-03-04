import { FC, JSX, Suspense } from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { queryAutocomplete } from "@/app/lib/actions"
import DialogSearch from "@/app/ui/rider/dialog-search"
import LastRides from "@/app/ui/rider/last-ride-list"

import LocationContent from "@/app/ui/rider/location-content"
import Search from "@/app/ui/rider/search"
import AutoComplete from "@/app/ui/rider/auto-complete"
import { LocationsList } from "@/app/ui/rider/locations-list"

const Page: FC = ({
    searchParams
}: {
    searchParams?: {
        query?: string
    }
}): JSX.Element => {
    const query = searchParams?.query || ''
    
    const changeHandler = async (e: any) => {
        console.log(e.target.value)
        const suggestion = await queryAutocomplete(e.target.value) 
        console.log('Place: ', suggestion)
    }

    return (
        <Grid
            container
            spacing={4}
        >
            <Grid xs={12}>
                <DialogSearch>
                    <LocationsList query={query} />
                </DialogSearch>
            </Grid>
            <Grid xs={12}>
                {/* <LastRides /> */}
            </Grid>
        </Grid>
    )
}

export default Page