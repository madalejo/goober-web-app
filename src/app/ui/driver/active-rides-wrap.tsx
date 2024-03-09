'use client'

import { ReactNode, JSX } from "react"

interface ActiveRidesWrapProps {
    children: ReactNode
}

const ActiveRidesWrap = ({
    children
}: ActiveRidesWrapProps ): JSX.Element => {
    return (
        <>
            { children }
        </>
    )
}

export default ActiveRidesWrap