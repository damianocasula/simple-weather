import { WeatherInfoProps } from "./WeatherInfo.type"
import { useWeatherData } from "./WeatherInfo.utils"
import "./WeatherInfo.scss"

const ITEM_NAMES: Record<string, string> = {
  temperature: "Temperature",
  windspeed: "Wind speed",
  winddirection: "Wind direction",
  weathercode: "Weather code",
  is_day: "Is day",
  time: "Time",
}

export function WeatherInfo({ location }: WeatherInfoProps) {
  const weather = useWeatherData(location)

  const loading = !weather

  // TODO: get compass direction from wind direction

  return (
    <div className="section-wrapper">
      <h2>Weather info</h2>
      <section className="items weather__section">
        {loading ? (
          <div className="item weather__item">Loading...</div>
        ) : (
          Object.entries(weather.current_weather).map(([key, value]) => (
            <div className="item weather__item" key={key}>
              <div>{ITEM_NAMES[key]}</div>
              <div>{String(value)}</div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default WeatherInfo
