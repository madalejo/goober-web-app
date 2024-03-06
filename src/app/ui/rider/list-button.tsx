'use client'

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place'
import { getLatLng } from "@/app/lib/actions"

interface OptionsProps {
    label: string
    value: string
}

const ListButton = ({ option }: { option: OptionsProps}) => {

    const handleSelect = async (item: string) => {
        const response = await getLatLng(item)
        console.log('item selected', response)
    }

    return (
        <ListItemButton 
            onClick={() => handleSelect(option.value)}
        >
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
    )
}

export default ListButton