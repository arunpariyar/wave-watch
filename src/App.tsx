import "./App.css";
import { fetchWeather, getLocation } from "./api/api";
import { useState } from "react";
import { GiSurferVan } from "react-icons/gi";
import type { DailyWeather } from "./types/types";
import { createEmptyDailyWeather } from "./utils/utils";
import { WeatherCard } from "./components/WeatherCard";

import {
  WiCelsius,
  WiSandstorm,
  WiShowers,
  WiSunset,
  WiThermometer,
  WiTime2,
} from "react-icons/wi";
import { WiSunrise } from "react-icons/wi";

import { formatDaylight } from "./utils/utils";

function App() {
  const [location, setLocation] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  let [weatherToday, setWeatherToday] = useState<DailyWeather>(
    createEmptyDailyWeather()
  );
  let [weatherForcast, setWeatherForcast] = useState<DailyWeather[]>([]);

  const queryWeatherForcase = async () => {
    try {
      const locationResult = await getLocation(location);
      const weatherResult = await fetchWeather(locationResult);
      setWeatherToday(weatherResult[0]);
      setWeatherForcast(weatherResult.slice(1));
      setIsLoaded(!isLoaded);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  // Handler function to update the state when input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  console.log(weatherToday);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-5 rounded-2xl min-w-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center">
            <GiSurferVan className="text-[#22A5D6]" size={50}></GiSurferVan>
            <div className="text-4xl font-bold text-[#22A5D6] tracking-wide drop-shadow-xs font-sans">
              WaveWatch
            </div>
          </div>

          <input
            type="text"
            value={location}
            onChange={handleChange}
            placeholder="Type something..."
            className="border p-2 rounded"
          />
          <button
            onClick={queryWeatherForcase}
            className="rounded-xl bg-[#22A5D6] text-white text-lg p-2 "
          >
            Check Surf Forecast
          </button>
        </div>

        <div>
          {isLoaded && <WeatherCard weather={weatherToday}></WeatherCard>}
          {isLoaded &&
            weatherForcast.map((weather) => (
              <WeatherCard weather={weather}></WeatherCard>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
