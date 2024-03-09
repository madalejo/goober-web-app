import { FC, Suspense } from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import ActiveRidesWrap from "@/app/ui/driver/active-rides-wrap"
import ActiveRides from "@/app/ui/driver/active-rides"
import { CurrentRideSkeletong } from "@/app/ui/skeletons"

const Page: FC = (): JSX.Element => {
    return (
        <Grid
            container
            spacing={4}
        >
            <Grid xs={12}>
                <ActiveRidesWrap>
                    <Suspense fallback={<CurrentRideSkeletong />}>
                        <ActiveRides />
                    </Suspense>
                </ActiveRidesWrap>
            </Grid>
        </Grid>
    )
}

export default Page