import type { Metadata } from "next"
import '@fontsource/roboto'
import "./globals.css"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { CssBaseline } from "@mui/material"

export const metadata: Metadata = {
  title: "Goober",
  description: "Redefining rides",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Grid 
          container
          sx={{
            height: '100vh'
          }}
        >
          <Grid xs={12}>
            {children}
          </Grid>
        </Grid>
        </body>
    </html>
  );
}
