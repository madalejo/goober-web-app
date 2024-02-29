import type { Metadata } from "next"
import '@fontsource/roboto'
//import "./globals.css"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

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
        <Grid container>
          <Grid xs={12}>
            {children}
          </Grid>
        </Grid>
        </body>
    </html>
  );
}
