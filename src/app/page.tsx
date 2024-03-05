import { FC, JSX } from "react"
import Link from "next/link"

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Button } from "@mui/material"

const Home:FC = (): JSX.Element => {
  return (
    <Grid 
      container
      justifyContent="center"
    >
      <Grid xs={12} md={4}>
        <Grid 
          container
          direction="column"
          spacing={4}
          sx={{
            m: 2
          }}
        >
          <Grid xs={12}>
              <Button
                component={Link}
                href="/rider"
                variant="outlined"
                fullWidth
              >
                Are you riding?
              </Button>
          </Grid>
          <Grid xs={12}>
              <Button
                component={Link}
                href="/driver"
                variant="outlined"
                fullWidth
              >
                Are you driving?
              </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home