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
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      lat +
      "&longitude=" +
      lon +
      "&current_weather=true"
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

const ROADMAP = [
  "Show location name",
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
  "Display weather forecast for the next 7 days",
]

function App() {
  const [weather, setWeather] = useState<Weather>(null)
  const [loading, setLoading] = useState(false)

  const location = useMemo(() => getUserLocation(), [])

  useEffect(() => {
    setLoading(true)

    getWeather(location)
      .then((data) => {
        setWeather(data)
        console.log(data)
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

          {loading && <p>Loading...</p>}

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
            </section>
          )}

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

          <h2>Roadmap</h2>
          <section className="items roadmap__section">
            {ROADMAP.map((item, index) => (
              <div className="item roadmap__item" key={index}>
                {item}
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
