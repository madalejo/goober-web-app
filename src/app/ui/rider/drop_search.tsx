import { CSSProperties, FC, JSX, ReactElement, Ref, forwardRef, useState } from "react"

import { AppBar, Button, Dialog, IconButton, Slide, Toolbar, Box } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from "@mui/material/transitions"

import AutoComplete from "@/app/ui/rider/auto-complete"


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

const DropSearch: FC = (): JSX.Element => {
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
                        <Box
                            component="div"
                            sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
                        >
                            <AutoComplete />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </>
    )
}

export default DropSearch