export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Weather {
  time: Date[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  daylight_duration: number[];
  sunshine_duration: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  precipitation_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
}

export interface DailyWeather {
  time: Date;
  weather_code: number;
  temperature_max: number;
  temperature_min: number;
  apparent_max: number;
  apparent_min: number;
  daylight: number;
  sunshine: number;
  rain: number;
  showers: number;
  snowfall: number;
  precipitation: number;
  precipitation_hours: number;
  precipitation_probability: number;
  wind_speed: number;
  wind_gusts: number;
  wind_direction: number;
}
