
import { getActiveRide, getOngoingRide } from "@/app/lib/actions"
import RideCard from "@/app/ui/rider/ride-card"

const CurrentRide = async () => {
    const activeRides = await getActiveRide()
    const ongoingRide = await getOngoingRide()

    return (
        <>
            {
                ongoingRide?.length !== 0 ? (
                    <RideCard
                        activeRides={ongoingRide || []}
                    />
                ) : (
                    <RideCard
                        activeRides={activeRides || []}
                    />
                )
            }
        </>
    )
}

export default CurrentRide