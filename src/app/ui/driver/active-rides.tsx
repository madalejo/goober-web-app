'use server'

import { getActiveRide } from "@/app/lib/actions"
import ActiveRideCard from "@/app/ui/driver/active-ride-card"


const ActiveRides =  async () => {
    const activeRide = await getActiveRide()

    return (
        <ActiveRideCard 
            activeRide={activeRide}
        />
    )
}

export default ActiveRides