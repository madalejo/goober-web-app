import { FC, JSX } from "react"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"

import { navObj } from "@/app/lib/placeholder-data"

const NavBar: FC = (): JSX.Element => {
    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={0}
            >
                {
                    navObj.map((value, idx) => (
                        <BottomNavigationAction 
                            key={idx}
                            label={value.label} 
                            icon={<value.icon />}
                            disabled
                        />
                    ))
                }
            </BottomNavigation>
        </Paper>
    )
}

export default NavBar