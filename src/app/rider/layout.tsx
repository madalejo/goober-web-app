'use client'
import { JSX, ReactNode } from "react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"


import Grid from "@mui/material/Unstable_Grid2/Grid2"

// Navigation Components
import AppBar from "@/app/ui/rider/app-bar"
import NavBar from "@/app/ui/rider/nav-bar"

const Layout = ({ children } : { children: ReactNode}): JSX.Element => {

    return (
        <Grid container justifyContent="center">
            <Grid xs={12}>
                <AppBar />
            </Grid>
            <Grid xs={12} md={4} sx={{ m: 2 }}>
                <AppRouterCacheProvider>
                    { children }
                </AppRouterCacheProvider>
            </Grid>
            <Grid xs={12}>
                <NavBar />
            </Grid>
        </Grid>
    )
}

export default Layout