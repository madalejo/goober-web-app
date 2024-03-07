'use client'
import { JSX } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place'

import { getLatLng } from "@/app/lib/actions"

interface OptionsProps {
    label: string
    value: string
}

const ListButton = ({ 
        option 
    }: { 
        option: OptionsProps
    }): JSX.Element => {
        const searchParams = useSearchParams()
        const pathName = usePathname()
        const { replace } = useRouter()

    const handleSelect = async (item: OptionsProps) => {
        const params = new URLSearchParams(searchParams)
        const response = await getLatLng(item.value)
        if (response) {
            params.set("dropoff", `${response.lat},${response.lng}`)
            params.set("query", item.label)
        } else {
            params.delete("dropoff")
        }
        replace(`${pathName}?${params.toString()}`)
    }

    return (
        <ListItemButton 
            onClick={() => handleSelect(option)}
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