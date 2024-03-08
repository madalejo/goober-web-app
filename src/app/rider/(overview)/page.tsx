import { FC, JSX, Suspense } from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"

import DialogSearch from "@/app/ui/rider/dialog-search"
import LastRides from "@/app/ui/rider/last-ride-list"
import { LocationsList } from "@/app/ui/rider/locations-list"
import { LocationListSkeleton, CurrentRideSkeletong } from "@/app/ui/skeletons"
import CurrentRideWrapper from "@/app/ui/rider/current-ride-wrapper"
import CurrentRide from "@/app/ui/rider/current-ride"

const Page: FC = ({
    searchParams
}: {
    searchParams?: {
        query?: string
    }
}): JSX.Element => {
    const query = searchParams?.query || ''
    
    return (
        <Grid
            container
            spacing={4}
        >
            <Grid xs={12}>
                <DialogSearch>
                    <Suspense key={query} fallback={<LocationListSkeleton />}>
                        <LocationsList query={query} />
                    </Suspense>
                </DialogSearch>
            </Grid>
            <Grid xs={12}>
                <CurrentRideWrapper>
                        <Suspense fallback={<CurrentRideSkeletong />}>
                            <CurrentRide />
                        </Suspense>
                </CurrentRideWrapper>
            </Grid>
            <Grid xs={12}>
                {/* <LastRides /> */}
            </Grid>
        </Grid>
    )
}

export default Page