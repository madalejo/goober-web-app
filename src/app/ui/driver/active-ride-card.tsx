'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/app/utils/supabase"

import { Card, CardContent, Box, Typography, Chip, Button, CardActions } from "@mui/material"

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'

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

const ActiveRideCard = ({
    activeRide
}: {
    activeRide: ActiveRideProps[]
}) => {
    const [rides, setRides] = useState<ActiveRideProps[]>(activeRide)

    console.log(rides)

    useEffect(() => {
        const channel = supabase.channel('active_rides').on('postgres_changes', {
            event: 'INSERT' , schema: 'public', table: 'rides'
        }, (payload) => {
            setRides([...rides, payload.new as ActiveRideProps])
        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <>
            {   rides.map((ride: ActiveRideProps, idx: number) => (
                    <Card 
                        key={idx} 
                        sx={{
                            mb: 2
                        }}
                    >
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
                                    <Typography variant="h6">
                                        { 
                                            ride.status === 'Requested' && !ride.driver_id ? 'Looking for drivers' : 'Driver'
                                        }
                                    </Typography>
                                    <Chip label={ride.status} variant="outlined" color="primary" size="small" icon={<HourglassEmptyIcon />} />
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
                            <Button>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                disableElevation
                            >
                                Accept
                            </Button>
                        </CardActions>
                    </Card>
            ))}
        </>
    )
}

export default ActiveRideCard