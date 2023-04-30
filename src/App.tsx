import { useEffect, useMemo, useState } from "react"
import logo from "./assets/undraw_weather_app_re_kcb1-2.svg"
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
          <img src={logo} className="logo" alt="logo" />
          <p>Just Another Simple Weather App</p>

          {loading && <p>Loading...</p>}

          {location && (
            <section className="section location__section">
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
            <section className="section weather__section">
              <div className="item weather__item">
                <div className="weather__label">Temperature:</div>
                <div className="weather__value">
                  {weather.current_weather.temperature}°C
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
