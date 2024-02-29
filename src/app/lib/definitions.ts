/* 
* Contains defintions of all sorts of data for MVP
*/

import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

export type AppNavigation = {
    label: string
    icon: OverridableComponent<SvgIconTypeMap>
}