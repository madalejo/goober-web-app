import { Card, CardContent, Typography, Chip, Box } from "@mui/material"
import { grey } from "@mui/material/colors"

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import ExploreOffOutlinedIcon from '@mui/icons-material/ExploreOffOutlined'

import { getActiveRide, currentLocation } from "@/app/lib/actions"
import CancelCurrentRide from "@/app/ui/rider/cancel-ride"

const CurrentRide = async () => {
    const activeRides = await getActiveRide()
    const pickup_location = await currentLocation(activeRides?.[0]?.pickup_location)
    const dropoff_location = await currentLocation(activeRides?.[0]?.dropoff_location)

    return (
        <>
            {
                !activeRides?.[0] ? ( 
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
                activeRides?.map((ride: any, idx: number) => (
                    <Card key={idx} variant="outlined">
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
                                                    ride.status === 'Requested' && !ride.driver_id ? 'Looking for drivers' : 'Driver'
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
                                ride_id={ride.ride_id}
                            />
                        </>
                    </Card>
            ))}
        </>
    )
}

export default CurrentRide