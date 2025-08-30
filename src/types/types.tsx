export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface DailyWeather {
  daily: {
    time: (Date | null)[];
    weather_code: (number | null)[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    apparent_temperature_max: (number | null)[];
    apparent_temperature_min: (number | null)[];
    daylight_duration: (number | null)[];
    sunshine_duration: (number | null)[];
    rain_sum: (number | null)[];
    showers_sum: (number | null)[];
    snowfall_sum: (number | null)[];
    precipitation_sum: (number | null)[];
    precipitation_hours: (number | null)[];
    precipitation_probability_max: (number | null)[];
    wind_speed_10m_max: (number | null)[];
    wind_gusts_10m_max: (number | null)[];
    wind_direction_10m_dominant: (number | null)[];
    shortwave_radiation_sum: (number | null)[];
    et0_fao_evapotranspiration: (number | null)[];
  };
}
