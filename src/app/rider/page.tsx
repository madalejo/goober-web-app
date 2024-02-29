import { FC, JSX } from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

const Page: FC = (): JSX.Element => {
    return (
        <>
            <TextField 
                label="Where to?"
                variant="filled"
                fullWidth
                InputProps={{
                    startAdornment: 
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }}
            />
        </>
    )
}

export default Page