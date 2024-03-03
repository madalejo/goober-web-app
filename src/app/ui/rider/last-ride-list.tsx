import { FC, JSX } from "react"
import { Typography, Button } from "@mui/material"
import { supabase } from "@/app/utils/supabase"
import { getRiders } from "@/app/lib/actions"

const LastRides:FC = (): JSX.Element => {

    const pullData = async () => {
        //const { data, error } = await supabase.from('drivers').select()
        const data = await getRiders()
        console.log(data)
    }

    return (
        <>
            <Typography variant="h6">
                Last Rides
            </Typography>
            <Button
                onClick={async () => pullData()}
            >
                Pull
            </Button>
        </>
    )
}

export default LastRides