import { FC } from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import ActiveRidesWrap from "@/app/ui/driver/active-rides-wrap"

const Page: FC = (): JSX.Element => {
    return (
        <Grid
            container
            spacing={4}
        >
            <Grid xs={12}>
                <ActiveRidesWrap>
                    Driver Page
                </ActiveRidesWrap>
            </Grid>
        </Grid>
    )
}

export default Page