import { WeatherInfo } from "./components"
import { getUserLocation, useLocationName } from "./utils"
import "./App.scss"

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
  "Get compass direction from wind direction",
  "Add units to weather info values (e.g. km/h, m/s, etc.)",
]

function App() {
  const location = getUserLocation()
  const locationName = useLocationName(location)

  return (
    <div className="app">
      <div className="wrapper">
        <main className="main">
          <h1>Simple Weather</h1>

          <div className="section-wrapper">
            <h2>Location</h2>
            {location && (
              <section className="items location__section">
                <div className="item">
                  <div className="label">Latitude:</div>
                  <div className="value">{location.lat}</div>
                </div>
                <div className="item">
                  <div className="label">Longitude:</div>
                  <div className="value">{location.lon}</div>
                </div>

                <div className="item">
                  <div className="label">Location name:</div>
                  <div className="value">
                    {locationName ? locationName : "Unknown"}
                  </div>
                </div>
              </section>
            )}
          </div>

          <WeatherInfo location={location} />

          <div className="section-wrapper">
            <h2>Roadmap</h2>
            <section className="items">
              {ROADMAP.map((item, index) => (
                <div className="item" key={index}>
                  {item}
                </div>
              ))}
            </section>
          </div>
        </main>

        <footer className="footer">
          <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </footer>
      </div>
    </div>
  )
}

export default App
