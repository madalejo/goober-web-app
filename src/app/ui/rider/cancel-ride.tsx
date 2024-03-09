'use client'

import { JSX, useState } from "react"
import { CardActions, Button, Snackbar, Alert, CircularProgress } from "@mui/material"

import { cancelRide } from "@/app/lib/actions"

const CancelCurrentRide = ({
    ride_id, 
    rider_id
}: {
    ride_id: string
    rider_id: string
}):JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = async () => {
        setIsLoading(true)
        const response = await cancelRide(ride_id, null, rider_id)
        if (response) {
            setOpen(true)
        }
        setIsLoading(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <CardActions>
                <Button
                    onClick={handleClick}
                    disabled={isLoading}
                >
                    { isLoading ? <CircularProgress size={24} /> : "Cancel" }
                </Button>
            </CardActions>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                    Ride canceled succesfully!
                </Alert>
            </Snackbar>
        </>
    )
}

export default CancelCurrentRide