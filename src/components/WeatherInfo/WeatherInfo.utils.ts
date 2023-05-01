import { useEffect, useState } from "react";
import { Coordinates } from "../../App.type";

const API_URL = "https://api.open-meteo.com/v1/forecast"

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
    fetchWeatherData(location).then((data) => setWeatherData(data));
  }, [location]);

  return weatherData;
}
