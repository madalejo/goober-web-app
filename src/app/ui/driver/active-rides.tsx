'use server'

import { getAcceptedRide, getActiveRide } from "@/app/lib/actions"
import ActiveRideCard from "@/app/ui/driver/active-ride-card"


const ActiveRides =  async () => {
    const availableRides = await getActiveRide()
    const activeRide = await getAcceptedRide()

    return (
        <>
            {
                activeRide?.length !== 0 ? (
                    <ActiveRideCard 
                        availableRides={activeRide || []}
                    />
                ) : (
                    <ActiveRideCard 
                        availableRides={availableRides || []}
                    />
                )
            }
        </>
    )
}

export default ActiveRides