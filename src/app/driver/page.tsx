import { FC } from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"

const Page: FC = (): JSX.Element => {
    return (
        <Grid
            container
            spacing={4}
        >
            <Grid xs={12}>
                Driver Page
            </Grid>
        </Grid>
    )
}

export default Page