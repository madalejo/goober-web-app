import { Card, CardContent, Typography, Chip, Stack, LinearProgress, Box } from "@mui/material"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'

import { getActiveRide, currentLocation } from "@/app/lib/actions"

const CurrentRide = async () => {
    const activeRides = await getActiveRide()
    const pickup_location = await currentLocation(activeRides?.[0].pickup_location)
    const dropoff_location = await currentLocation(activeRides?.[0].dropoff_location)

    return (
        <>
            {
                activeRides?.map((ride, idx) => (
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
                                                { pickup_location.address_components[2].short_name }
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                { pickup_location.formatted_address }
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
                                                { dropoff_location.address_components[2].short_name }
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                { dropoff_location.formatted_address }
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                        </CardContent>
                        </>
                    </Card>
            ))}
        </>
    )
}

export default CurrentRide