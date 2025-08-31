import { WiCelsius, WiSunrise, WiShowers, WiSandstorm } from "react-icons/wi";
import type { DailyWeather } from "../types/types";
import { formatDaylight } from "../utils/utils";

interface WeatherCardProps {
  weather: DailyWeather;
}

const weekday = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-[#22A5D6] text-center mt-4">
        {weekday[new Date(weather.time).getDay()]}
      </h3>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center justify-center gap-2">
          <WiCelsius size={40} />
          <p>{weather.apparent_max.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <WiSunrise size={35} />
          <p>{formatDaylight(weather.daylight)}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <WiShowers size={35} />
          <p>{weather.showers.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <WiSandstorm size={35} />
          <p>{weather.wind_speed.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
