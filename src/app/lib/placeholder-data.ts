import { AppNavigation } from "@/app/lib/definitions"

import HomeIcon from '@mui/icons-material/Home'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import PersonIcon from '@mui/icons-material/Person'

export const navObj:AppNavigation[] = [
    {
        label: "Home",
        icon: HomeIcon,
    },
    {
        label: "Activity",
        icon: ReceiptLongIcon,
    },
    {
        label: "Account",
        icon: PersonIcon
    }
]