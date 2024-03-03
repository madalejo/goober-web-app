import { ChangeEvent, FC, JSX, useState } from "react"

import { TextField, Autocomplete, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import PlaceIcon from '@mui/icons-material/Place'

import { queryAutocomplete } from "@/app/lib/actions"

const AutoComplete: FC = (): JSX.Element => {
    const [option, setOption] = useState<string[]>([])

    const changeHandler = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const response = await queryAutocomplete(e.target.value)
        const formatedResponse = response.predictions.map((location: any) => ({
            label: location.description,
            value: location.place_id
        }))
        setOption(formatedResponse)
    }

    return (
        <Autocomplete
            disablePortal
            options={option}
            renderInput={
                (params) => (
                    <TextField 
                        {...params} 
                        label="Where to?" 
                        fullWidth
                        onChange={e => changeHandler(e)}
                    />
                )
            }
            renderOption={(props, option: any) => (
                <li {...props}>
                    <Grid
                        container
                        alignItems="center"
                    >
                        <Grid 
                            sx={{
                                display: "flex",
                                width: 44,
                            }}
                        >
                            <PlaceIcon />
                        </Grid>
                        <Grid
                            sx={{
                                width: "calc(100% - 44px)",
                                wordWrap: "break-word"
                            }}
                        >
                            <Typography
                                variant="body2"
                            >
                                { option.label }
                            </Typography>
                        </Grid>
                    </Grid>
                </li>
            )}
      />
    )
}

export default AutoComplete