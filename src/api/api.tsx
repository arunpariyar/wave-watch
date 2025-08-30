// const baseUrl = import.meta.env.VITE_BASE_URL;

const url = "https://api.open-meteo.com/v1/forecast";
const locationBaseUrl = "https://geocoding-api.open-meteo.com/v1/search";

import { fetchWeatherApi } from "openmeteo";
import type { Coordinates } from "../types/types";

export async function getLocation(location: string): Promise<Coordinates> {
  const searchQuery = `${locationBaseUrl}?name=${location}&count=1&language=en&format=json`;

  const response = await fetch(searchQuery);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const info = await response.json();

  const { latitude, longitude } = info.results[0];

  return { latitude, longitude };
}

//TODO - need to type this at the end
export async function fetchWeather(coordinates: Coordinates) {
  const params = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "daylight_duration",
      "sunshine_duration",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "precipitation_sum",
      "precipitation_hours",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "wind_direction_10m_dominant",
    ],
  };
  try {
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    // const latitude = response.latitude();
    // const longitude = response.longitude();
    // const elevation = response.elevation();
    // const utcOffsetSeconds = response.utcOffsetSeconds();

    // console.log(
    //   `\nCoordinates: ${latitude}°N ${longitude}°E`,
    //   `\nElevation: ${elevation}m asl`,
    //   `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
    // );

    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      daily: {
        // time: [
        //   ...Array(
        //     (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
        //   ),
        // ].map(
        //   (_, i) =>
        //     new Date(
        //       (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
        //         1000
        //     )
        // ),
        weather_code: daily.variables(0)?.valuesArray()
          ? Array.from(daily.variables(0)!.valuesArray()!)
          : null,
        temperature_2m_max: daily.variables(1)?.valuesArray()
          ? Array.from(daily.variables(1)!.valuesArray()!)
          : null,
        temperature_2m_min: daily.variables(2)?.valuesArray()
          ? Array.from(daily.variables(2)!.valuesArray()!)
          : null,
        apparent_temperature_max: daily.variables(3)?.valuesArray()
          ? Array.from(daily.variables(3)!.valuesArray()!)
          : null,
        apparent_temperature_min: daily.variables(4)?.valuesArray()
          ? Array.from(daily.variables(4)!.valuesArray()!)
          : null,
        daylight_duration: daily.variables(5)?.valuesArray()
          ? Array.from(daily.variables(5)!.valuesArray()!)
          : null,
        sunshine_duration: daily.variables(6)?.valuesArray()
          ? Array.from(daily.variables(6)!.valuesArray()!)
          : null,
        rain_sum: daily.variables(7)?.valuesArray()
          ? Array.from(daily.variables(7)!.valuesArray()!)
          : null,
        showers_sum: daily.variables(8)?.valuesArray()
          ? Array.from(daily.variables(8)!.valuesArray()!)
          : null,
        snowfall_sum: daily.variables(9)?.valuesArray()
          ? Array.from(daily.variables(9)!.valuesArray()!)
          : null,
        precipitation_sum: daily.variables(10)?.valuesArray()
          ? Array.from(daily.variables(10)!.valuesArray()!)
          : null,
        precipitation_hours: daily.variables(11)?.valuesArray()
          ? Array.from(daily.variables(11)!.valuesArray()!)
          : null,
        precipitation_probability_max: daily.variables(12)?.valuesArray()
          ? Array.from(daily.variables(12)!.valuesArray()!)
          : null,
        wind_speed_10m_max: daily.variables(13)?.valuesArray()
          ? Array.from(daily.variables(13)!.valuesArray()!)
          : null,
        wind_gusts_10m_max: daily.variables(14)?.valuesArray()
          ? Array.from(daily.variables(14)!.valuesArray()!)
          : null,
        wind_direction_10m_dominant: daily.variables(15)?.valuesArray()
          ? Array.from(daily.variables(15)!.valuesArray()!)
          : null,
      },
    };

    // 'weatherData' now contains a simple structure with arrays with datetime and weather data
    return weatherData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
