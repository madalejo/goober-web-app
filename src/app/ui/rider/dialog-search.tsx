'use client'
import { CSSProperties, JSX, ReactElement, ReactNode, Ref, forwardRef, useState } from "react"
import { useSearchParams } from "next/navigation"

import { 
    AppBar, 
    Box, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    IconButton, 
    Slide, 
    Toolbar, 
    Typography, 
    CircularProgress, 
    Snackbar, 
    Alert 
} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from "@mui/material/transitions"

import Search from "@/app/ui/rider/search"
import GMap from "@/app/ui/GMap"
import UserLocation from "@/app/ui/rider/user-location"
import { createRide, getActiveRide } from "@/app/lib/actions"

interface DialogSearchProps {
    children: ReactNode
}

const btnStyleOvd: CSSProperties = { // Button Style Override
    borderRadius: 8,
    justifyContent: "flex-start",
    borderColor: 'thistle',
    textTransform: "capitalize",
    fontWeight: 600,
    fontSize: 16,
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const DialogSearch = ({ children }: DialogSearchProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)

    const handleClickOpen = async (): Promise<void> => {
        setIsLoading(true)
        const response: any = await getActiveRide()
        if (response?.[0]) {
            setOpenAlert(true)
        } else {
            setOpen(true)
        }
        setIsLoading(false)
    }

    const handleClickClose = (): void => {
        setOpen(false)
    }

    const handleCloseAlert = (): void => {
        setOpenAlert(false)
    }

    const handleConfirm = async (): Promise<void> => {
        const response = await createRide({
            pickup: params.get("pickup"),
            dropoff: params.get("dropoff"),
            rider_id: params.get("id"),
            total_fare: parseInt(params.get("total_fare")!)
        })
        setOpen(false)
    }

    return (
        <>
            <Button
                variant="outlined"
                fullWidth
                startIcon={
                    <SearchIcon />
                }
                sx={btnStyleOvd}
                onClick={handleClickOpen}
                disabled={isLoading}
            >
                { isLoading ? <CircularProgress size={24} /> : "Where to?" }
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClickClose}
                TransitionComponent={Transition}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="static"
                        sx={{
                            backgroundColor: "white"
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleClickClose}
                                sx={{
                                    mr: 2
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="GrayText">
                                Where to?
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Grid container justifyContent="center">
                            <Grid xs={12} md={4}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 2,
                                    }}
                                >
                                    <UserLocation />
                                    <Search />
                                    { !params.has("dropoff")  ? 
                                        children 
                                        : 
                                        <GMap />
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Grid 
                        container 
                        justifyContent="center" 
                        position="fixed" 
                        sx={{ 
                            bottom: 0, 
                            right: 0, 
                            left: 0 
                        }}
                    >
                        <Grid xs={12} md={4}>
                            <DialogActions>
                                <Button
                                    disabled={!params.has("dropoff")}
                                    variant="contained"
                                    fullWidth
                                    disableElevation
                                    onClick={() => handleConfirm()}
                                >
                                    Confirm Ride
                                </Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert
                onClose={handleCloseAlert}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
                >
                    It seems that you have an active trip
                </Alert>
            </Snackbar>
        </>
    )
}

export default DialogSearch