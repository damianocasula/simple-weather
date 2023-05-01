import { WeatherInfoProps } from "./WeatherInfo.type"

export function WeatherInfo({ location }: WeatherInfoProps) {
  return (
    <div>
      WeatherInfo {location.lat} {location.lon}
    </div>
  )
}

export default WeatherInfo
