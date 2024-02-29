import { FC, JSX } from "react"
import { AppBar as TopBar, Toolbar } from "@mui/material"

const AppBar: FC = (): JSX.Element => {
    return (
        <TopBar 
            position="static"
            elevation={3}
        >
            <Toolbar>
                App Bar
            </Toolbar>
        </TopBar>
    )
} 

export default AppBar