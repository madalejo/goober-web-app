
import { getActiveRide, currentLocation } from "@/app/lib/actions"
import RideCard from "@/app/ui/rider/ride-card"

const CurrentRide = async () => {
    const activeRides = await getActiveRide()
    const pickup_location = await currentLocation(activeRides?.[0]?.pickup_location)
    const dropoff_location = await currentLocation(activeRides?.[0]?.dropoff_location)

    return (
        <RideCard
            activeRides={activeRides?.[0]}
            pickup_location={pickup_location}
            dropoff_location={dropoff_location}
        />
    )
}

export default CurrentRide