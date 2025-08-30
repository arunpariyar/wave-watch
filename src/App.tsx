import "./App.css";
import { fetchWeather, getLocation } from "./api/api";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [weather, setWeather] = useState({});

  const queryWeatherForcase = async () => {
    try {
      const locationResult = await getLocation(location);
      const weatherResult = await fetchWeather(locationResult);
      setWeather(weatherResult.daily);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  // Handler function to update the state when input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  console.log(weather);

  return (
    <div>
      <div>
        <input
          type="text"
          value={location} // Connects the input to the state variable
          onChange={handleChange} // Updates state when the user types
          placeholder="Type something..."
        />
        <button onClick={queryWeatherForcase}>Check Surf Forecase</button>
      </div>

      <div>
        <p>Here</p>
        <div>
          {Object.keys(weather).length > 0
            ? Object.keys(weather).map((key) => <p>{key}</p>)
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
