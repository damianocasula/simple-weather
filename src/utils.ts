import { useEffect, useState } from "react"
import { Coordinates } from "./types"


const DEFAULT_USER_LOCATION = {
  lat: 47.2344,
  lon: 16.3667,
}

export function getUserLocation() {
  const userLocation = { ...DEFAULT_USER_LOCATION }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation.lat = position.coords.latitude
      userLocation.lon = position.coords.longitude
    }, console.error)
  }

  return userLocation
}

async function reverseGeocode({ lat, lon }: Coordinates) {
  const url = new URL("https://geocode.maps.co/reverse")

  url.searchParams.append("lat", lat.toString())
  url.searchParams.append("lon", lon.toString())

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  return data
}

export const useLocationName = ({ lat, lon }: Coordinates) => {
  const [locationName, setLocationName] = useState("")

  useEffect(() => {
    reverseGeocode({ lat, lon })
      .then((data) => {
        if (!data.address) {
          throw new Error("No address found")
        }

        const city = data.address.city
        const country = data.address.state

        setLocationName(`${city}, ${country}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [lat, lon])

  return locationName
}
