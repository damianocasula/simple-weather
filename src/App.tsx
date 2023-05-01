import { WeatherInfo } from "./components"
import { useGeolocation, useLocationName, useSearchLocation } from "./utils"
import "./App.scss"

const DEFAULT_LOCATION = {
  lat: 47.2344,
  lon: 16.3667,
}

const ROADMAP = [
  "Show humidity",
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
]

function App() {
  const location = useGeolocation() ?? DEFAULT_LOCATION
  const locationName = useLocationName(location)
  const {
    handleSearch,
    // coordinates, // TODO: use coordinates to get weather for searched location
    loading: searchLocationLoading,
  } = useSearchLocation()

  const loading = searchLocationLoading

  return (
    <div className="app">
      <div className="wrapper">
        <main className="main">
          <h1>Simple Weather</h1>

          <div className="section-wrapper">
            <h2>Location</h2>
            {location && (
              <section className="items location-section">
                <input
                  type="text"
                  id="search"
                  placeholder="Search location..."
                  className="item location-search"
                  onChange={handleSearch}
                />
                {loading ? (
                  <div className="item">Loading...</div>
                ) : (
                  <>
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
                  </>
                )}
              </section>
            )}
          </div>

          <WeatherInfo location={location} loading={loading} />

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
