
import { getActiveRide, currentLocation } from "@/app/lib/actions"
import RideCard from "@/app/ui/rider/ride-card"

const CurrentRide = async () => {
    const activeRides = await getActiveRide()

    return (
        <RideCard
            activeRides={activeRides?.[0]}
        />
    )
}

export default CurrentRide