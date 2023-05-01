import { useEffect, useState } from "react";
import { Coordinates } from "../../types";

const API_URL = "https://api.open-meteo.com/v1/forecast"

const WMO_CODES_TO_CONDITIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Moderate rain showers",
  82: "Heavy rain showers",
  85: "Light snow showers",
  86: "Heavy snow showers",
  95: "Slight or moderate thunderstorm",
  96: "Light hail thunderstorm",
  99: "Heavy hail thunderstorm",
}


async function fetchWeatherData(location: Coordinates) {
 
  const url = new URL(API_URL);

  url.searchParams.append("latitude", location.lat.toString());
  url.searchParams.append("longitude", location.lon.toString());
  url.searchParams.append("current_weather", "true");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data;
}

export const useWeatherData = (location: Coordinates) => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    fetchWeatherData(location).then((data) => setWeatherData({
      current_weather: {
        ...data.current_weather,
        condition: WMO_CODES_TO_CONDITIONS[data.current_weather.weathercode],
      },
    }));
  }, [location]);

  return weatherData;
}

