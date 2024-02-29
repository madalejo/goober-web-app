import { JSX, ReactNode } from "react"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const Layout = ({ children } : { children: ReactNode }): JSX.Element => {
    return (
        <Grid container justifyContent="center">
            <Grid xs={12}>
                { children }
            </Grid>
        </Grid>
    )
}

export default Layout