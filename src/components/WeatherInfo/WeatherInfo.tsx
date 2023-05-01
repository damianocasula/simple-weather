import { WeatherInfoProps } from "./types"
import { useWeatherData } from "./utils"
import "./WeatherInfo.scss"

const ITEM_NAMES: Record<string, string> = {
  temperature: "Temperature",
  windspeed: "Wind speed",
  winddirection: "Wind direction",
  condition: "Condition",
}

const ITEM_UNITS: Record<string, string> = {
  temperature: "°C",
  windspeed: "km/h",
  winddirection: "°",
}

export function WeatherInfo({ location, loading }: WeatherInfoProps) {
  const weather = useWeatherData(location)

  const loadingWeather = !weather || loading

  // TODO: get compass direction from wind direction

  return (
    <div className="section-wrapper">
      <h2>Weather info</h2>
      <section className="items weather-section">
        {!loadingWeather ? (
          <div className="item">Loading...</div>
        ) : (
          Object.entries(weather.current_weather).map(([key, value]) =>
            ITEM_NAMES[key] ? (
              <div className="item weather-item" key={key}>
                <div>{ITEM_NAMES[key]}</div>
                <div>
                  {String(value)}
                  {ITEM_UNITS[key] ? ITEM_UNITS[key] : null}
                </div>
              </div>
            ) : null
          )
        )}
      </section>
    </div>
  )
}

export default WeatherInfo
