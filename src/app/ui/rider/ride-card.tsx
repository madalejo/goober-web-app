'use client'
import { useEffect, useState } from "react"

import { Card, CardContent, Typography, Chip, Box } from "@mui/material"
import { grey } from "@mui/material/colors"

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import ExploreOffOutlinedIcon from '@mui/icons-material/ExploreOffOutlined'

import CancelCurrentRide from "@/app/ui/rider/cancel-ride"
import { supabase } from "@/app/utils/supabase"

const RideCard = ({
    activeRides,
    pickup_location,
    dropoff_location
}: {
    activeRides: any
    pickup_location: any
    dropoff_location: any
}) => {
    const [rides, setRides] = useState<any>(activeRides)

    useEffect(() => {
        const channel = supabase.channel('realtime_rides').on('postgres_changes', {
            event: 'UPDATE', schema: 'public', table: 'rides'
        }, (payload) => {
            setRides(payload.new)
        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <>
            {
                !rides || rides.status !== "Requested" ? ( 
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
                :
                (
                    <Card variant="outlined">
                        <>
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
                                                    rides.status === 'Requested' && !rides.driver_id ? 'Looking for drivers' : 'Driver'
                                                }
                                            </Typography>
                                            <Chip label={rides.status} variant="outlined" color="primary" size="small" icon={<HourglassEmptyIcon />} />
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
                                                    { pickup_location?.address_components[2].short_name }
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    { pickup_location?.formatted_address }
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
                                                    { dropoff_location?.address_components[2].short_name }
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    { dropoff_location?.formatted_address }
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                            </CardContent>
                            <CancelCurrentRide 
                                ride_id={rides.ride_id}
                            />
                        </>
                    </Card>
                )
            }
        </>
    )
}

export default RideCard