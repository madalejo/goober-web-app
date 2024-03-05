'use client'
import { ReactNode, JSX } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { TextField } from "@mui/material"

const Search = (): JSX.Element => {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`${pathName}?${params.toString()}`)
    }

    return (
        <TextField 
            label="Drop off" 
            fullWidth
            onChange={e => handleSearch(e.target.value)}
            defaultValue={searchParams.get("query")?.toString()}
        />
    )
}

export default Search