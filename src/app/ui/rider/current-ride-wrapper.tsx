'use client'
import { ReactNode, JSX } from "react"
import { createTheme, ThemeProvider } from "@mui/material"

interface CurrentRideWrapProps {
    children: ReactNode
}

const CurrentRideWrapper = ({ children }: CurrentRideWrapProps): JSX.Element => {
    const theme = createTheme({ palette: { mode: "dark" } })
    return (
        <ThemeProvider theme={theme}>
            { children }
        </ThemeProvider>
    )
}

export default CurrentRideWrapper