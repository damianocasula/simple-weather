import { useEffect, useMemo, useState } from "react"
import "./App.css"

type Coordinates = {
  lat: number
  lon: number
}

type Weather = {
  current_weather: {
    temperature: number
  }
} | null

const DEFAULT_COORDS = {
  lat: 48.13743,
  lon: 11.57549,
}

function getUserLocation(): Coordinates {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => position.coords,
      (error) => {
        console.error(error)
        return DEFAULT_COORDS
      }
    )
  }

  return DEFAULT_COORDS
}

async function getWeather({ lat, lon }: Coordinates) {
  const url = new URL("https://api.open-meteo.com/v1/forecast")

  url.searchParams.append("latitude", lat.toString())
  url.searchParams.append("longitude", lon.toString())
  url.searchParams.append("current_weather", "true")
  url.searchParams.append("forecast_days", "1")

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

async function getLocationName({ lat, lon }: Coordinates) {
  const url = new URL("https://geocode.maps.co/reverse")

  url.searchParams.append("lat", lat.toString())
  url.searchParams.append("lon", lon.toString())

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  if (!data.address) {
    throw new Error("No address found")
  }

  const city = data.address.city
  const country = data.address.state

  return `${city}, ${country}`
}

const ROADMAP = [
  "Weather conditions (sunny, cloudy, rainy, etc.)",
  "Show humidity",
  "Show wind speed",
  "Show wind direction",
  "Show name of place",
  "Show precipitation",
  "Display weather icon depending on weather condition",
  "Search for location with debounce",
  "Display loading indicator/spinner",
  "Display error messages",
  "Search autocomplete",
  "Display weather forecast for the next 24 hours",
  "Display weather forecast for the next 7 days (using timezones api to automatically resolve coordinates to timezones)",
  "Fahrenheit/Celsius switch",
]

function App() {
  const [weather, setWeather] = useState<Weather>(null)
  const [loading, setLoading] = useState(false)
  const [locationName, setLocationName] = useState("")

  const location = useMemo(() => getUserLocation(), [])

  useEffect(() => {
    getLocationName(location)
      .then((data) => {
        setLocationName(data)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [location])

  useEffect(() => {
    setLoading(true)

    getWeather(location)
      .then((data) => {
        setWeather(data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [location])

  return (
    <div className="app">
      <div className="wrapper">
        <main className="main">
          <h1>Simple Weather</h1>

          <div className="section-wrapper">
            <h2>Location</h2>
            {location && (
              <section className="items location__section">
                <div className="item location__item">
                  <div className="location__label">Latitude:</div>
                  <div className="location__value">{location.lat}</div>
                </div>
                <div className="item location__item">
                  <div className="location__label">Longitude:</div>
                  <div className="location__value">{location.lon}</div>
                </div>

                <div className="item location__item">
                  <div className="location__label">Location name:</div>
                  <div className="location__value">
                    {locationName ? locationName : "Unknown"}
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="section-wrapper">
            <h2>Weather</h2>
            {loading && <div>Loading...</div>}
            {weather && (
              <section className="items weather__section">
                <div className="item weather__item">
                  <div className="weather__label">Temperature:</div>
                  <div className="weather__value">
                    {weather.current_weather.temperature}°C
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="section-wrapper">
            <h2>Roadmap</h2>
            <section className="items roadmap__section">
              {ROADMAP.map((item, index) => (
                <div className="item roadmap__item" key={index}>
                  {item}
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
