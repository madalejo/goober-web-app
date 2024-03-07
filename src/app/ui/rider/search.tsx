'use client'

import {  JSX } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

import { IconButton, InputAdornment, TextField } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear'

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

    const handleClear = () => {
        const params = new URLSearchParams(searchParams);
      
        // Check if "query" is present before deleting
        if (params.has("query")) {
          params.delete("query");
        }
      
        // Check if "dropoff" is present before deleting
        if (params.has("dropoff")) {
          params.delete("dropoff");
        }
        replace(`${pathName}?${params.toString()}`);
      }

    return (
        <TextField 
            label="Dropoff" 
            fullWidth
            variant="filled"
            onChange={e => handleSearch(e.target.value)}
            value={searchParams.get("query")?.toString() || ''}
            InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                    <IconButton
                        onClick={handleClear}
                        edge="end"
                    >
                        <ClearIcon />
                    </IconButton>
                </InputAdornment>
            }}
        />
    )
}

export default Search