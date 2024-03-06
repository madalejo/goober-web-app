'use client'
import { CSSProperties, JSX, ReactElement, ReactNode, Ref, forwardRef, useState } from "react"

import { AppBar, Box, Button, Dialog, DialogContent, IconButton, Slide, TextField, Toolbar, Typography, styled } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from "@mui/material/transitions"

import Search from "@/app/ui/rider/search"
import GMap from "@/app/ui/GMap"

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

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 220
    },
}))

const DialogSearch = ({ children }: DialogSearchProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)

    const handleClickOpen = (): void => {
        setOpen(true)
    }

    const handleClickClose = (): void => {
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
            >
                Where to?
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
                        <StyledToolBar>
                            <IconButton
                                edge="start"
                                onClick={handleClickClose}
                                sx={{
                                    mr: 2
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Box
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    alignSelf: "flex-end",
                                    display: "flex",
                                    rowGap: 2,
                                    flexDirection: "column"
                                }}
                            >
                                <Typography variant="h6" color="GrayText">
                                    Where to?
                                </Typography>
                                <TextField 
                                    disabled
                                    label="Pickup"
                                    value="Home"
                                />
                                <Search />
                            </Box>
                        </StyledToolBar>
                    </AppBar>
                    <DialogContent>
                        <>
                            { children }
                            <GMap />
                        </>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    )
}

export default DialogSearch