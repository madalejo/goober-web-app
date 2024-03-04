import { JSX } from "react"

import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place'

import { queryAutocomplete } from "@/app/lib/actions"

interface LocationListProps {
    query: string
}

export const LocationsList = async ({ query }: LocationListProps): Promise<JSX.Element> => {
    const options = await queryAutocomplete(query)

    console.log(options)
    return (
        <List>
            { options.map(( option: any, idx: number) => (
            <ListItemButton key={idx}>
                <ListItemIcon>
                    <PlaceIcon />
                </ListItemIcon>
                <ListItemText 
                    primary={option.label} 
                    sx={{
                        color: "black"
                    }}
                />
            </ListItemButton>
            ))}
        </List>
    )
}