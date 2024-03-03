'use server'
import { ChangeEvent, FC, JSX } from "react"

import { TextField, Autocomplete, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import PlaceIcon from '@mui/icons-material/Place'

import { queryAutocomplete } from "@/app/lib/actions"

import Search from "@/app/ui/rider/search"

const AutoComplete: FC = async ({
    searchParams
}: {
    searchParams?: {
        query?: string
    }
}): Promise<JSX.Element> => {
    const query = searchParams?.query || '';
    //const [option, setOption] = useState<string[]>([])
    const options = await queryAutocomplete(query)

    const changeHandler = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const response = await queryAutocomplete(e.target.value)
        //setOption(response)
    }

    return (
        <Autocomplete
            disablePortal
            options={options}
            renderInput={
                (params) => (
                    <Search />
                )
            }
            renderOption={(props: any, option: any) => (
                <li {...props}>
                    <Grid
                        container
                        alignItems="center"
                        sx={{
                            my: 2
                        }}
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