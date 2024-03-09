# Goober App

This project is intended to be a take-home project application for TrashLabs
Demo: [Goober App](https://goober-web-app.vercel.app/)

## Project Specs

Project was created using the following stack

```bash
Nextjs 14
Supabase (Serverless Framework)
MUI (UI Component Library)
VSGL Google Maps
```
## Run it dow
First, run it locally using the following steps:

```bash
Clone this repo
gh repo clone madalejo/goober-web-app

Install all dependencies
npm i

Run it locally
npm run dev
```

Next, create a local `.env.local` file and use the following secrets:

```bash
# Google Maps token
NEXT_PUBLIC_GMAPS_TOKEN=AIzaSyAW7KlWJLXSxp7HZJ-0MiINIsw55npWtMg
NEXT_PUBLIC_GMAPS_BASEURL=https://maps.googleapis.com/maps/api
NEXT_PUBLIC_GMAP_ID=11c28e91d8d28ff8

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ewwoqqrpskxeqslvxcoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d29xcXJwc2t4ZXFzbHZ4Y29vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMzE5NzQsImV4cCI6MjAyNDcwNzk3NH0.Tap1Sv9MLufKpzeRn0K3Xv_eudWeSI0GkxcyGIG2E3c
```

## About this project

### The Product
Project works as proof of concept with the bare minimum requirement:

* Allows the role of passenger to request a ride from their current location as pickup point and a selected dropoff point of their choice.

* Allows the role of driver to accept or cancel rides.


A dummy database was created using PostgreSQL and Supabase was used as a serverless bridge to close the remaining gap on the backend aspect of the project.

UX is fairly basic, most of the allocated time was invested on overcoming development challenges.

### The Risks
* Google Maps API implementation is exposed, yes! It can be restricted, but for this excercise it will be kepto unrestricted.

* Not having authentication method goes without saying all the major risks.

### The questions
* What features do you think are most impactful?

> Showing the amount of money drivers will make before accepting the ride, currently
> this is not advised since drivers tend to deny rides that are under amounts they 
> deem low, without having complete understanding how pricing works on base fare, 
> time-based charge and distance-based charge and what arguments are included for everyone 
> on involved to make a profit.

* What scope would you cut?
> For the concept I would've scrapped the feature of syncing ride request with ride 
> accepted by drivers.

* What unspoken requirement need to be implemented to provide our core service?
> 3 way messaging between dispatch, driver and rider, communication is key in the 
> transportation industry.

* What feature, or section of the app would you work on to make really good? Really good here can mean, really good UI, powerful differentiating functionality, delightful UX.
> The map! Having a branded stylized map that can even show interesting places and landmark
> curated to the app users' persona.

* What I'm most proud of?
> Implementing the event subscription with a mix between server component and client component.

## Authors

- [@madalejo](https://github.com/madalejo)