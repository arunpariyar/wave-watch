import type { Weather } from "../types/types";
import type { DailyWeather } from "../types/types";

export function transformWeatherData(data: Weather) {
  return data.time?.map((time, index) => ({
    time,
    weather_code: data.weather_code[index],
    temperature_max: data.temperature_2m_max[index],
    temperature_min: data.temperature_2m_min[index],
    apparent_max: data.apparent_temperature_max[index],
    apparent_min: data.apparent_temperature_min[index],
    daylight: data.daylight_duration[index],
    sunshine: data.sunshine_duration[index],
    rain: data.rain_sum[index],
    showers: data.showers_sum[index],
    snowfall: data.snowfall_sum[index],
    precipitation: data.precipitation_sum[index],
    precipitation_hours: data.precipitation_hours[index],
    precipitation_probability: data.precipitation_probability_max[index],
    wind_speed: data.wind_speed_10m_max[index],
    wind_gusts: data.wind_gusts_10m_max[index],
    wind_direction: data.wind_direction_10m_dominant[index],
  }));
}

export const createEmptyDailyWeather = (): DailyWeather => ({
  time: new Date(0),
  weather_code: 0,
  temperature_max: 0,
  temperature_min: 0,
  apparent_max: 0,
  apparent_min: 0,
  daylight: 0,
  sunshine: 0,
  rain: 0,
  showers: 0,
  snowfall: 0,
  precipitation: 0,
  precipitation_hours: 0,
  precipitation_probability: 0,
  wind_speed: 0,
  wind_gusts: 0,
  wind_direction: 0,
});

export function formatDaylight(seconds: number): string {
  if (seconds <= 0) return "0h 0m";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}
