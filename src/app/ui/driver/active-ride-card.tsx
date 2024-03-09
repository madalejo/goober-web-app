'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/app/utils/supabase"

import { 
    Card, 
    CardContent, 
    Box, 
    Typography, 
    Chip, 
    Button, 
    CardActions, 
    Snackbar, 
    Alert,
    CircularProgress
} from "@mui/material"
import { grey } from "@mui/material/colors"
import { APIProvider } from "@vis.gl/react-google-maps"

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import ExploreOffOutlinedIcon from '@mui/icons-material/ExploreOffOutlined'
import RouteIcon from '@mui/icons-material/Route'

import CardMap from "@/app/ui/card-map"
import { cancelRide, acceptRide } from "@/app/lib/actions"

interface ActiveRideProps {
    ride_id: string
    created_at: string
    accepted_at: string | null
    completed_at: string | null
    canceled_at: string | null
    pickup_location: string
    dropoff_location: string
    status: string
    fee: number
    driver_fee: number
    co_fee: number
    rider_id: string
    driver_id: string | null
    pickup_address: string
    dropoff_address: string
}

interface AlertProps {
    status: "success" | "error" | "info" | "warning"
    message: string
    open: boolean
}

const ActiveRideCard = ({
    availableRides
}: {
    availableRides: ActiveRideProps[]
}) => {
    const [rides, setRides] = useState<ActiveRideProps[]>(availableRides)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<AlertProps>({
        status: "success",
        message: "",
        open: false
    })

    const handleCancel = async (ride_id: string) => {
        setIsLoading(true)
        const response = await cancelRide(ride_id, 'driver_id' ,"269b6f7c-65a5-4cb9-b85a-7d342ff591a9")
        if (response) {
            setOpen(prevState => ({
                ...prevState,
                message: "Ride canceled successfully",
                open: true
            }))
        }
        setIsLoading(false)
    }

    const handleAccept = async (ride_id: string) => {
        setIsLoading(true)
        const response = await acceptRide(ride_id, "269b6f7c-65a5-4cb9-b85a-7d342ff591a9")
        if (response) {
            setOpen(prevState => ({
                ...prevState, 
                message: "Ride accepted successfully",
                open: true
            }))
        }
        setIsLoading(false)
    }

    const handleClose = () => {
        setOpen(prevState => ({
            ...prevState, 
            open: false
        }))
    }

    useEffect(() => {
        const channel = supabase.channel('active_rides')
        .on('postgres_changes', {
            event: 'INSERT' , schema: 'public', table: 'rides'
        }, (payload) => {
            setRides([...rides, payload.new as ActiveRideProps])
        })
        .on('postgres_changes', {
            event: 'UPDATE' , schema: 'public', table: 'rides'
        }, (payload) => {
            if(payload.new.status === 'Requested') {
                setRides([...rides, payload.new as ActiveRideProps])
            } else if (payload.new.status === "Accepted") {
                setRides([payload.new as ActiveRideProps])
            } else {
                setRides([])
            }
        })
        .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <Box sx={{ mb: 8 }}>
            <APIProvider 
                apiKey={process.env.NEXT_PUBLIC_GMAPS_TOKEN!}
            >
                { rides.length === 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            height: '70vh'

                        }}
                    >
                        <Typography variant="h5" color="GrayText">
                            No Active Rides
                        </Typography>
                        <ExploreOffOutlinedIcon sx={{ width: 72, height: 72, color: grey[500] }} />
                    </Box>
                )  
                : rides.map((ride: ActiveRideProps, idx: number) => (
                        <Card 
                            key={idx} 
                            sx={{
                                mb: 2
                            }}
                        >
                            <CardMap
                                pickup={ride.pickup_location}
                                dropoff={ride.dropoff_location}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 2
                                    }}
                                >
                                    <Box
                                    >
                                        <Chip 
                                            label={ride.status === "Accepted" ? "Ongoing" : ride.status} 
                                            variant="outlined" 
                                            color={ride.status === "Accepted" ? "success" : "primary"}
                                            size="small" 
                                            icon={ride.status === "Accepted" ? <RouteIcon /> : <HourglassEmptyIcon />} 
                                        />
                                    </Box>
                                    <Typography variant="h4">
                                        {`$${ride.driver_fee}`}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            columnGap: 1
                                        }}
                                    >
                                        <LocationOnOutlinedIcon 
                                            fontSize="small" 
                                        />
                                        <Box>
                                            <Typography variant="subtitle2">
                                                { ride.pickup_address }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            columnGap: 1
                                        }}
                                    >
                                        <FlagOutlinedIcon 
                                            fontSize="small" 
                                            color="success"
                                        />
                                        <Box>
                                            <Typography variant="subtitle2">
                                                { ride.dropoff_address }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => handleCancel(ride.ride_id)}
                                    disabled={isLoading}
                                >
                                { isLoading ? <CircularProgress size={24} /> : "Cancel" }
                                </Button>
                                { ride.status === "Requested" && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    disableElevation
                                    onClick={() => handleAccept(ride.ride_id)}
                                    disabled={isLoading}
                                >
                                    { isLoading ? <CircularProgress size={24} /> : "Accept" }
                                </Button>
                                )}
                            </CardActions>
                        </Card>
                ))}
            </APIProvider>
            <Snackbar open={open.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity={open.status}
                variant="filled"
                sx={{ width: '100%' }}
                >
                    {open.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default ActiveRideCard