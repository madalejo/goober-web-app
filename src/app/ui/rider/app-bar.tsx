import { FC, JSX } from "react"
import { AppBar as TopBar, Toolbar, Typography } from "@mui/material"

const AppBar: FC = (): JSX.Element => {
    return (
        <TopBar 
            position="static"
            elevation={3}
        >
            <Toolbar>
                <Typography variant="h5">
                    Goober App
                </Typography>
            </Toolbar>
        </TopBar>
    )
} 

export default AppBar