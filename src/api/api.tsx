// const baseUrl = import.meta.env.VITE_BASE_URL;

const url = "https://api.open-meteo.com/v1/forecast";
const locationBaseUrl = "https://geocoding-api.open-meteo.com/v1/search";

import { fetchWeatherApi } from "openmeteo";
import type { Coordinates } from "../types/types";
import { transformWeatherData } from "../utils/utils";

import { WiThermometer } from "react-icons/wi";

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
    const utcOffsetSeconds = response.utcOffsetSeconds();

    // console.log(
    //   `\nCoordinates: ${latitude}°N ${longitude}°E`,
    //   `\nElevation: ${elevation}m asl`,
    //   `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
    // );

    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      time: [
        ...Array(
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      weather_code: Array.from(daily.variables(0)!.valuesArray()!),
      temperature_2m_max: Array.from(daily.variables(1)!.valuesArray()!),
      temperature_2m_min: Array.from(daily.variables(2)!.valuesArray()!),
      apparent_temperature_max: Array.from(daily.variables(3)!.valuesArray()!),
      apparent_temperature_min: Array.from(daily.variables(4)!.valuesArray()!),
      daylight_duration: Array.from(daily.variables(5)!.valuesArray()!),
      sunshine_duration: Array.from(daily.variables(6)!.valuesArray()!),
      rain_sum: Array.from(daily.variables(7)!.valuesArray()!),
      showers_sum: Array.from(daily.variables(8)!.valuesArray()!),
      snowfall_sum: Array.from(daily.variables(9)!.valuesArray()!),
      precipitation_sum: Array.from(daily.variables(10)!.valuesArray()!),
      precipitation_hours: Array.from(daily.variables(11)!.valuesArray()!),
      precipitation_probability_max: Array.from(
        daily.variables(12)!.valuesArray()!
      ),
      wind_speed_10m_max: Array.from(daily.variables(13)!.valuesArray()!),
      wind_gusts_10m_max: Array.from(daily.variables(14)!.valuesArray()!),
      wind_direction_10m_dominant: Array.from(
        daily.variables(15)!.valuesArray()!
      ),
    };

    return transformWeatherData(weatherData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
