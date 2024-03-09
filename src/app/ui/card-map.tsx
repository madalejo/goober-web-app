'use client'

import { useEffect, useState } from "react"

import { APIProvider, Map, useMapsLibrary, useMap } from "@vis.gl/react-google-maps"

interface CardMapProps {
    pickup: string
    dropoff: string
}

const CardMap = (trip: CardMapProps) => {
    
    const convertLocationString = (locationString: string) => {
        const [lat, lng] = locationString.split(',').map(Number)
        return { lat: lat, lng: lng}
    }

    const position = convertLocationString(trip.pickup)

    return (
        <div
            style={{
                width: '100%',
                height: '25vh',
                position: "relative"
            }}
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
                <Directions 
                    pickup={trip.pickup}
                    dropoff={trip.dropoff}
                />
            </Map>
        </div>
    )
}

const Directions = ({pickup, dropoff}: {pickup: string, dropoff: string}) => {
    const map = useMap()
    const routesLibrary = useMapsLibrary("routes")
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>()
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>()

    useEffect(() => {
        if(!routesLibrary || !map) return

        setDirectionsService(new routesLibrary.DirectionsService())
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
    }, [routesLibrary, map])

    useEffect(() => {
        if(!directionsService || !directionsRenderer) return
        
        directionsService.route({
            origin: pickup,
            destination: dropoff,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        }).then( response => {
            directionsRenderer.setDirections(response)
        })
    }, [directionsService, directionsRenderer])
    
    return (
        <></>
    )
}

export default CardMap