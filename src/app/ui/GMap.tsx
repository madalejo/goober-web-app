import { useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps"
import { Box, Card, CardContent, Typography } from "@mui/material"


const GMap = () => {

    const position = {
        lat: 43.6532,
        lng: -79.3832
    }

    return (
        <div
            style={{
                width: '100%',
                height: '65vh',
                position: "relative"
            }}
        >
        <APIProvider 
            apiKey={process.env.NEXT_PUBLIC_GMAPS_TOKEN!}
        >
            <Map
                defaultCenter={position}
                defaultZoom={9}
                fullscreenControl={false}
                mapTypeControl={false}
                zoomControl={false}
                streetViewControl={false}
                mapId={process.env.NEXT_PUBLIC_GMAP_ID}
            >
                <Directions />
            </Map>
        </APIProvider>
        </div>
    )
}

const Directions = () => {
    const map = useMap()
    const routesLibrary = useMapsLibrary("routes")
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>()
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>()
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([])
    const [routeIndex, setRouteIndex] = useState(0)
    const selected = routes[routeIndex]
    const leg = selected?.legs[0]
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathName = usePathname()
    const { replace } = useRouter()

    const calculateFare = (time: number, distance: number) => {
        const base = 2.00
        const minuteCharge = 0.20
        const mileCharge = 1.50
    
        const calcTimeCharge = minuteCharge * time
        const calDistanceCharge = mileCharge * distance
    
        const calcTotalFare = base + calcTimeCharge + calDistanceCharge

        params.set("total_fare", calcTotalFare.toString())
        replace(`${pathName}?${params.toString()}`)
    
        return calcTotalFare
    }

    useEffect(() => {
        if(!routesLibrary || !map) return

        setDirectionsService(new routesLibrary.DirectionsService())
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
    }, [routesLibrary, map])

    useEffect(() => {
        if(!directionsService || !directionsRenderer) return
        
        directionsService.route({
            origin: params.get("pickup") || '',
            destination: params.get("dropoff") || '',
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        }).then( response => {
            directionsRenderer.setDirections(response)
            setRoutes(response.routes)
        })
    }, [directionsService, directionsRenderer])

    if (!leg) return null
    
    return (
        <Card
            style={{
                position: "absolute",
                zIndex: 1,
                padding: 8,
                right: 4,
                top: 4,
            }}
        >
            <CardContent>
                <Typography variant="h6" component="div">
                    { selected.summary }
                </Typography>
                <Typography>
                    { leg.start_address.split(",")[0] } ➡️ {leg.end_address.split(",")[0]}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "baseline",
                        columnGap: 1
                    }}
                >
                    <Typography variant="subtitle1" component="div">
                        Distance:
                    </Typography>
                    <Typography variant="body1" component="div">
                        { leg.distance?.text }
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "baseline",
                        columnGap: 1
                    }}
                >
                    <Typography variant="subtitle1" component="div">
                        Duration:
                    </Typography>
                    <Typography variant="body1" component="div">
                        { leg.duration?.text }
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "baseline",
                        columnGap: 1
                    }}
                >
                    <Typography variant="subtitle1" component="div">
                        Total Fare:
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="success.main">
                        { `$ ${calculateFare(Number(parseInt(leg.duration?.text!)), Number(parseInt(leg.distance?.text!)))} USD` }
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default GMap