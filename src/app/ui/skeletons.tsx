import { JSX } from "react"
import { Avatar, Box, Skeleton, Typography, Card, CardContent } from "@mui/material"

export const LocationListSkeleton = (): JSX.Element => {
    return (
        <>
            { [...Array(3)].map((_, idx: number) => (
                <Box 
                    key={idx}
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center"
                    }}
                >
                    <Box>
                    <Skeleton 
                        variant="circular" 
                        sx={{ m: 1 }}
                        width={24}
                        height={24}
                    >
                        <Avatar />
                    </Skeleton>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Skeleton width="100%">
                            <Typography variant="body1">
                                .
                            </Typography>
                        </Skeleton>
                    </Box>
                </Box>
            ))}
        </>
    )
}

export const CurrentRideSkeletong = (): JSX.Element => {
    return (
        <Card>
            <CardContent>
                <Box sx={{ width: "100%" }}>
                    <Skeleton width="100%">
                        <Typography variant="h6">
                            .
                        </Typography>
                    </Skeleton>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Skeleton width="20%">
                        <Typography variant="body1">
                            .
                        </Typography>
                    </Skeleton>
                </Box>
                <Box 
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        mt: 2
                    }}
                >
                    <Box>
                    <Skeleton 
                        variant="circular" 
                        sx={{ mr: 1 }}
                        width={24}
                        height={24}
                    >
                        <Avatar />
                    </Skeleton>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Skeleton width="100%">
                            <Typography variant="body1">
                                .
                            </Typography>
                        </Skeleton>
                    </Box>
                </Box>
                <Box 
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        mt: 2
                    }}
                >
                    <Box>
                    <Skeleton 
                        variant="circular" 
                        sx={{ mr: 1 }}
                        width={24}
                        height={24}
                    >
                        <Avatar />
                    </Skeleton>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                        <Skeleton width="100%">
                            <Typography variant="body1">
                                .
                            </Typography>
                        </Skeleton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}