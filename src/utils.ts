import { ChangeEventHandler, useEffect, useState } from "react"
import { Coordinates } from "./types"

// create a function that returns the location of the user using the browser's geolocation API
export function useGeolocation() {
  const [location, setLocation] = useState<Coordinates | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        setLocation({
          lat: latitude,
          lon: longitude,
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }, [])

  return location
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

function geocode(locationName: string) {
  const url = new URL("https://geocode.maps.co/geocode")

  url.searchParams.append("q", locationName)

  return fetch(url.toString())
}

export const useSearchLocation= () => {
  const [coordinates, setCoordinates] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
      event.preventDefault()
      setLoading(true)
  
      geocode((event.target as HTMLInputElement).value)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
  
          return response.json()
        })
        .then((data) => {
          setCoordinates(data.results)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

  // return the search query, search results, loading state, error state, and the search handler
  return {
    coordinates,
    loading,
    handleSearch,
  }
}