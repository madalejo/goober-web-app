'use client'

import { useEffect, useState } from "react"

import { Card, CardContent, Typography, Chip, Box, createTheme, ThemeProvider } from "@mui/material"
import { grey } from "@mui/material/colors"
import { APIProvider } from "@vis.gl/react-google-maps"

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import ExploreOffOutlinedIcon from '@mui/icons-material/ExploreOffOutlined'

import CancelCurrentRide from "@/app/ui/rider/cancel-ride"
import CardMap from "@/app/ui/card-map"

import { supabase } from "@/app/utils/supabase"

interface RideProps {
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
    drivers?: DriverProps
}

interface DriverProps {
    first_name: string
    last_name: string
}

const RideCard = ({
    activeRides
}: {
    activeRides: RideProps[]
}) => {
    const [rides, setRides] = useState<RideProps[]>(activeRides)
    const dark = createTheme({ palette: { mode: "dark" } })
    const light = createTheme({ palette: { mode: "light" } })

    useEffect(() => {
        const channel = supabase.channel('realtime_rides')
        .on('postgres_changes', {
            event: 'UPDATE', schema: 'public', table: 'rides'
        }, (payload) => {
            if (payload.new.status === "Canceled") {
                setRides([])
            } else {
                setRides([{...payload.new as RideProps, drivers: { first_name: "Chuck", last_name: "Norris"}}])
            }
        })
        .on('postgres_changes', {
            event: 'INSERT', schema: 'public', table: 'rides'
        }, (payload) => {
            setRides([payload.new as RideProps])
        })
        .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <>
        <ThemeProvider theme={rides?.[0]?.status === "Accepted" ? light : dark}>
            
        <APIProvider 
                apiKey={process.env.NEXT_PUBLIC_GMAPS_TOKEN!}
            >
            {
                rides.length === 0 ? ( 
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 1,
                            justifyContent: "center",
                            alignItems: "center"

                        }}
                    >
                        <Typography variant="h5" color="GrayText">
                            No Active Rides
                        </Typography>
                        <ExploreOffOutlinedIcon sx={{ width: 72, height: 72, color: grey[500] }} />
                    </Box>
                )
                : rides.map((ride: RideProps, idx: number) => (
                    <Card variant="outlined" key={idx}>
                        <>
                            { ride.status === "Accepted" && (
                                <CardMap 
                                    pickup={ride.pickup_location}
                                    dropoff={ride.dropoff_location}
                                />
                            )}
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
                                                    ride.status === 'Requested' && !ride.driver_id ? 'Looking for drivers' : `Driver: ${ride.drivers?.first_name} ${ride.drivers?.last_name}`
                                                }
                                            </Typography>
                                            <Chip label={ride.status} variant="outlined" color="primary" size="small" icon={<HourglassEmptyIcon />} />
                                        </Box>
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
                            <CancelCurrentRide 
                                ride_id={ride.ride_id}
                                rider_id={ride.rider_id}
                            />
                        </>
                    </Card>
                ))
            }
            </APIProvider>
            </ThemeProvider>
        </>
    )
}

export default RideCard