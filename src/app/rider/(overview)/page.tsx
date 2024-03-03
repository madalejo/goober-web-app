'use client'
import { ChangeEvent, FC, JSX, Suspense } from "react"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { InputAdornment, TextField, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import { queryAutocomplete } from "@/app/lib/actions"
import DropSearch from "@/app/ui/rider/drop_search"
import LastRides from "@/app/ui/rider/last-ride-list"

import LocationContent from "@/app/ui/rider/location-content"

const Page: FC = (): JSX.Element => {

    const changeHandler = async (e: any) => {
        console.log(e.target.value)
        const suggestion = await queryAutocomplete(e.target.value) 
        console.log('Place: ', suggestion)
    }

    return (
        <Grid
            container
            spacing={4}
        >
            <Grid xs={12}>
                <Suspense fallback={<>Loading...</>}>
                    <DropSearch>
                        <LocationContent />
                    </DropSearch>
                </Suspense>
            </Grid>
            <Grid xs={12}>
                <LastRides />
            </Grid>
            <TextField 
                label="Where to?"
                variant="filled"
                fullWidth
                onChange={ async (e) => changeHandler(e)}
                InputProps={{
                    startAdornment: 
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }}
            />
        </Grid>
    )
}

export default Page