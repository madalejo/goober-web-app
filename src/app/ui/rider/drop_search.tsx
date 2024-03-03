'use client'
import { CSSProperties, JSX, ReactElement, ReactNode, Ref, forwardRef, useState } from "react"

import { AppBar, Button, Dialog, IconButton, Slide, Toolbar } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from "@mui/material/transitions"

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

const DropSearch = ({ children } : { children: ReactNode }): JSX.Element => {
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
                <AppBar
                    sx={{
                        backgroundColor: "white"
                    }}
                >
                    <Toolbar
                        sx={{
                            alignItems: "flex-start",
                            paddingTop: 2,
                            paddingBottom: 2,
                            "@media all": {
                                minHeight: 128
                            }
                        }}
                    >
                        <IconButton
                            edge="start"
                            onClick={handleClickClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        
                        { children }
                    </Toolbar>
                </AppBar>
            </Dialog>
        </>
    )
}

export default DropSearch