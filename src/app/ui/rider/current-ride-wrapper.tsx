'use client'
import { ReactNode, JSX } from "react"

interface CurrentRideWrapProps {
    children: ReactNode
}

const CurrentRideWrapper = ({ children }: CurrentRideWrapProps): JSX.Element => {
    return (
        <>
            { children }
        </>
    )
}

export default CurrentRideWrapper