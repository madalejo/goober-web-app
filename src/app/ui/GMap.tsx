import { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const GMap = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_TOKEN!,
    })

    const center = useMemo(() => ({ lat: 44, lng: -88 }), [])

    if (!isLoaded) return <>Loading...</>

    return (
        <GoogleMap 
            zoom={10}
            center={center}
            mapContainerStyle={{
                width: '100%',
                height: '100vh'
            }}
            onLoad={(map) => console.log('Map Loaded')}
        >
            <Marker 
                position={center}
            />
        </GoogleMap>
    )
}

export default GMap