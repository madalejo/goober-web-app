import { JSX } from "react"

import { List } from "@mui/material"

import { queryAutocomplete } from "@/app/lib/actions"
import ListButton from "@/app/ui/rider/list-button"

interface LocationListProps {
    query: string
}

interface OptionsProps {
    label: string
    value: string
}

export const LocationsList = async ({ query }: LocationListProps): Promise<JSX.Element> => {
    const options: OptionsProps[] = await queryAutocomplete(query)

    return (
        <List>
            { options.map(( option: OptionsProps, idx: number) => (
            <ListButton 
                key={idx} 
                option={option}
            />
            ))}
        </List>
    )
}